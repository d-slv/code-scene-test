package br.com.maidahealth.telemedapi.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import br.com.maidahealth.telemedapi.dto.AttendanceChatListDto;
import br.com.maidahealth.telemedapi.dto.AttendanceGuestsDto;
import br.com.maidahealth.telemedapi.dto.ChatDescriptionDto;
import br.com.maidahealth.telemedapi.dto.ChatHistoryDto;
import br.com.maidahealth.telemedapi.dto.ChatMessageDto;
import br.com.maidahealth.telemedapi.dto.ChatParticipantDto;
import br.com.maidahealth.telemedapi.dto.ChatReadMsgDto;
import br.com.maidahealth.telemedapi.dto.CustomChatPage;
import br.com.maidahealth.telemedapi.dto.GuestDto;
import br.com.maidahealth.telemedapi.dto.MsParticipantDtoList;
import br.com.maidahealth.telemedapi.dto.MsParticipantDtoPage;
import br.com.maidahealth.telemedapi.dto.ParticipantDto;
import br.com.maidahealth.telemedapi.dto.SearchChatDto;
import br.com.maidahealth.telemedapi.dto.WebSocket.WSMessageReadDto;
import br.com.maidahealth.telemedapi.dto.WebSocket.WSNewChatDto;
import br.com.maidahealth.telemedapi.dto.WebSocket.WSNewMessageDto;
import br.com.maidahealth.telemedapi.enums.ChatType;
import br.com.maidahealth.telemedapi.enums.WSChatEventType;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.AttachmentListForm;
import br.com.maidahealth.telemedapi.form.ChatForm;
import br.com.maidahealth.telemedapi.form.ChatMessageForm;
import br.com.maidahealth.telemedapi.form.LocalChatCreationForm;
import br.com.maidahealth.telemedapi.form.MsChatCreationForm;
import br.com.maidahealth.telemedapi.kafka.MsChatKafkaProducer;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.Chat;
import br.com.maidahealth.telemedapi.models.Guest;
import br.com.maidahealth.telemedapi.models.Participant;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.ChatRepository;
import br.com.maidahealth.telemedapi.repositories.ParticipantRepository;
import br.com.maidahealth.telemedapi.utils.ParticipantUtils;

@Service
@EnableAsync
public class ChatService {
    private static final Logger log = LoggerFactory.getLogger(ChatService.class);
    
    @Autowired
    private ChatRepository repository;

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;
    
	@Autowired
	private TelemedServerService telemedServerService;

    @Autowired
    private MsChatService msChatService;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private MsChatKafkaProducer producer;

    @Autowired
    private WSService wsService;

    public ResponseEntity<ChatHistoryDto> createChat(ChatForm chatForm) throws NumberFormatException{

        if(chatForm.getChatId() == null) {

            return chatCreation(chatForm);

        } else {
            
            return getChatHistory(chatForm);
        }
    }

    @Transactional(rollbackOn = InvalidException.class)
    private ResponseEntity<ChatHistoryDto> chatCreation(ChatForm chatForm) {

        Set<Participant> participants = getParticipantsList(chatForm.getAttendanceId(), chatForm.getParticipantId());
        List<String> participantsPublicIds = participants.stream().map(Participant::getPublicId).collect(Collectors.toList());

        MsChatCreationForm msChatCreationForm = msChatService.createNewChatRequest(chatForm.getAttendanceId(), participantsPublicIds);
        checkExistingChats(msChatCreationForm.getChatId());
        
        Chat newChat = createNewChatLocally(msChatCreationForm.getChatId(), new Date(), participants);

        log.info(">> Criando chat de ID " + newChat.getMsChatId());

        telemedServerService.syncCreatedChatWithServer(new LocalChatCreationForm(newChat));
        return ResponseEntity.ok(new ChatHistoryDto(newChat.getMsChatId(), currentUser().getPublicIdOfInsuredOrGuest(), 0L, 0L, 0L, null));

    }

    private ResponseEntity<ChatHistoryDto> getChatHistory(ChatForm chatForm) {

        Chat chat = repository.findByMsChatIdAndParticipantsPublicId(Long.parseLong(chatForm.getChatId()), currentUser().getPublicIdOfInsuredOrGuest())
                                        .orElseThrow(() -> new InvalidException("Chat com id " + chatForm.getChatId() + " não encontrado para o usuário atual"));

        ChatHistoryDto chatMessages = msChatService.listChatMessages(chat.getMsChatId(),chatForm.getOffset(),chatForm.getSize(), currentUser());
        addSenderNameToChatHistoryDto(chatMessages);

        return ResponseEntity.ok(chatMessages);
    }

    public ResponseEntity<?> synchronizeChatCreation(LocalChatCreationForm form) {
        Set<Participant> localParticipantList = new HashSet<>();

        for(Participant p : form.getParticipantsList()) {
            localParticipantList.add(ParticipantUtils.getParticipant(p));
        }
        
        createNewChatLocally(form.getMsChatId(), form.getCreatedAt(), localParticipantList);
        return ResponseEntity.ok().build();

    }

    public List<SearchChatDto> searchChats(String chatType, String name) {

        Participant userParticipant = participantRepository.findByPublicId(currentUser().getPublicIdOfInsuredOrGuest())
                                        .orElseThrow(() -> new InvalidException("Participante não encontrado para usuário atual"));
        
        List<Chat> foundChats = repository.searchChatsByParticipant(userParticipant.getId(), ChatType.valueOf(chatType.toUpperCase()), name.toUpperCase());

        return foundChats.stream().map(c -> new SearchChatDto(c,userParticipant)).collect(Collectors.toList());
    }

    public ResponseEntity<ParticipantDto> getTotalUnreadMessages(boolean chatInfo,
            boolean listAll, Set<Long> chatIds, String publicId, Pageable pagination) {

        String participantPublicId = currentUser().getPublicIdOfInsuredOrGuest();

        if(participantRepository.findByPublicId(participantPublicId).isEmpty()) {
            throw new EntityNotFoundException("Participante não encontrado para o usuário atual.");
        }
        
        List<ChatParticipantDto> chats = null;
        String participantUuid = null;
        Long unreadMessagesTotal = null;

        if(publicId != null && chatIds == null) {
            chatIds = repository.findByParticipantsPublicId(publicId).stream().map(Chat::getMsChatId).collect(Collectors.toSet());
        }

        if(chatInfo) {

            if(listAll || chatIds != null) {
                
                MsParticipantDtoList unreadMessages =  msChatService.getTotalUnreadMessagesList(participantPublicId, chatIds, chatInfo, listAll, pagination);
                chats = unreadMessages.getChats();
                participantUuid = unreadMessages.getParticipantUuid();
                unreadMessagesTotal = unreadMessages.getUnreadMessagesTotal();
                addParticipantsToChatDto(chats);
                return ResponseEntity.ok(new ParticipantDto(participantUuid, unreadMessagesTotal, chats));

            } else {
                MsParticipantDtoPage unreadMessages = msChatService.getTotalUnreadMessagesPage(participantPublicId, chatIds, chatInfo, listAll, pagination);
                chats = unreadMessages.getChats().getContent();
                participantUuid = unreadMessages.getParticipantUuid();
                unreadMessagesTotal = unreadMessages.getUnreadMessagesTotal();
                addParticipantsToChatDto(chats);
                CustomChatPage<ChatParticipantDto> chatsPage = new CustomChatPage<>(chats,pagination, unreadMessages.getChats().getTotalElements());

                return ResponseEntity.ok(new ParticipantDto(participantUuid, unreadMessagesTotal, chatsPage));
            }

        }

        MsParticipantDtoList unreadMessages =  msChatService.getTotalUnreadMessagesList(participantPublicId, chatIds, chatInfo, listAll, pagination);
        participantUuid = unreadMessages.getParticipantUuid();
        unreadMessagesTotal = unreadMessages.getUnreadMessagesTotal();
        return ResponseEntity.ok(new ParticipantDto(participantUuid, unreadMessagesTotal, chats));
    }

    private Chat createNewChatLocally(Long msChatId, Date createdAt, Set<Participant> participants) {

        Chat chat = new Chat();
        ChatType chatType = participants.size() > 2 ? ChatType.GROUP : ChatType.PRIVATE;

        chat.setMsChatId(msChatId);
        chat.setCreatedAt(createdAt);
        chat.setType(chatType);
        chat.setParticipants(participants);

        for(Participant participant : participants) {
            participant.getChats().add(chat);
            participantRepository.save(participant);
        }

        return repository.save(chat);
    }

    private Set<Participant> getParticipantsList(String attendanceId, String participantId) {
        Set<Participant> participantsList = new HashSet<>();
        Attendance attendance = attendanceRepository.findByDocwayId(attendanceId)
                                                    .orElseThrow(() -> new InvalidException("Atendimento com id " + attendanceId + " não encontrado"));
        
        Participant participantProfessional = ParticipantUtils.getProfessionalParticipant(attendance);
        Participant participantInsured = ParticipantUtils.getInsuredParticipant(attendance.getInsured());
        Set<Participant> participantGuests = getGuestsParticipants(attendance);
        
                            
        if(participantId != null) {

            participantsList.add(participantInsured);

            if(participantProfessional.getPublicId().equals(participantId)) {
                participantsList.add(participantProfessional);
                return participantsList;
            }

            for(Participant p : participantGuests) {
                if(p.getPublicId().equals(participantId)) {
                    participantsList.add(p);
                    return participantsList;
                }
            }

            throw new InvalidException("Participante fornecido não encontrado ou não pertencente ao atendimento");
        }

        participantsList.add(participantInsured);
        participantsList.add(participantProfessional);
        for (Participant p : participantGuests) {
            participantsList.add(p);
        }

        return participantsList;
    }

    private Set<Participant> getGuestsParticipants(Attendance attendance) {

        Set<Participant> guests = new HashSet<>();

        Set<Participant> clientParticipantGuests = ParticipantUtils.getClientGuestParticipants(attendance);
        Set<Participant> serverParticipantGuests = ParticipantUtils.getServerGuestParticipants(attendance);

        guests.addAll(clientParticipantGuests);
        guests.addAll(serverParticipantGuests);

        return guests;
    }

    public User currentUser() {
		return authenticationService.currentUser();
	}
    
    private void checkExistingChats(Long msChatId) {

        Optional<Chat> optionalChat = repository.findByMsChatId(msChatId);

        if(optionalChat.isPresent()) {
            throw new InvalidException("Chat de id " + msChatId + " já existente com os participantes"); 
        }
    }

	public ResponseEntity<?> message(ChatMessageForm form, Long chatId) {	
		
		msChatService.chatNewMessage(form.getType(), form.getBody(), chatId, currentUser().getPublicIdOfInsuredOrGuest(), "");		
		return ResponseEntity.status(HttpStatus.CREATED).body(null);
	}
	
	public ResponseEntity<?> message(Long chatId, MultipartFile file) throws IOException {
		
		String encodedString = "data:" + file.getContentType() + ";base64,";
		
		encodedString += Base64.getEncoder().encodeToString(file.getBytes());
		
		msChatService.chatNewMessage("attachment", file.getOriginalFilename(), chatId, currentUser().getPublicIdOfInsuredOrGuest(), encodedString);		
		return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    public ResponseEntity<Void> shareAttachments(Long chatId, AttachmentListForm form) {

		msChatService.shareAttachments(chatId, currentUser().getInsured().getDocwayId(), form);
		return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

	public ResponseEntity<?> read(Long offset, Long chatId) {

        String participantPublicId = currentUser().getPublicIdOfInsuredOrGuest();

        if(participantRepository.findByPublicId(participantPublicId).isEmpty()) {
            throw new EntityNotFoundException("Participante não encontrado para usuário atual.");
        }
		
		msChatService.chatReadMessage(participantPublicId, offset, chatId);		
		return ResponseEntity.status(HttpStatus.CREATED).body(null);
	}

    private void addParticipantsToChatDto(List<ChatParticipantDto> chats) {

        for(ChatParticipantDto chat : chats) {
            
            Optional<Chat> optionalChat = repository.findByMsChatId(chat.getChat_id());
            if(optionalChat.isPresent()) {
                Set<String> otherParticipants = optionalChat.get().getParticipantNames();
                otherParticipants.remove(currentUser().getInsured().getName());
                chat.setParticipants(otherParticipants);
            }
        }
    }

    private void addSenderNameToChatHistoryDto(ChatHistoryDto dto) {

        if(dto.getMessages() != null) {

            for(ChatMessageDto message : dto.getMessages()) {
    
                Participant sender = participantRepository.findByPublicId(message.getSenderUuid()).orElseThrow(() -> new EntityNotFoundException("Participante de UUID " + message.getSenderUuid() + " não encontrado."));
    
                message.setSenderName(sender.getName());
            }
        }

    }

    public ResponseEntity<AttendanceChatListDto> getParticipants(String attendanceId) {
    	Attendance attendance = attendanceRepository.findByDocwayId(attendanceId)
    			.orElseThrow(() -> new InvalidException("Atendimento com id " + attendanceId + " não encontrado"));

    	Optional<Participant> optional = participantRepository.findByPublicId(currentUser().getPublicIdOfInsuredOrGuest());
		Participant currentParticipant = optional.isPresent() ? optional.get() : new Participant(currentUser().getInsured());
    	
    	List<ChatDescriptionDto> chatDescriptionDtoList = new ArrayList<>();
    	
    	Set<Participant> participantSet = getParticipantSet(attendance);
    	
    	Pageable pagination = PageRequest.of(0, 20);

    	if (participantSet.size()>2){
    		Optional<Chat> chat = currentParticipant.getChats().stream()
    				.filter(c -> c.getParticipants().containsAll(participantSet)).findFirst();
    		
    		Long chatId = chat.isPresent() ? chat.get().getMsChatId() : null;
    		Long unreadMessages = getUnreadMessages(currentParticipant.getPublicId(), chatId, pagination);
    		
    		ChatDescriptionDto chatDto = new ChatDescriptionDto(chatId, null, "todos", unreadMessages);
    		chatDescriptionDtoList.add(chatDto);
    	}
    	
    	participantSet.removeIf(participant -> participant.getPublicId().equals(currentParticipant.getPublicId()));
    	
    	for (Participant participant : participantSet) {
    		Optional<Chat> chat = currentParticipant.getChats().stream()
    				.filter(participantChat -> participantChat.getParticipants().size()==2 
    					&& participantChat.getParticipants().contains(participant)).findFirst();
    		
    		Long chatId = chat.isPresent() ? chat.get().getMsChatId() : null;
    		Long unreadMessages = getUnreadMessages(currentParticipant.getPublicId(), chatId, pagination);
    		
    		ChatDescriptionDto chatDto = new ChatDescriptionDto(chatId, participant.getPublicId(), participant.getName(), unreadMessages);
    		chatDescriptionDtoList.add(chatDto);
		}
    	
    	Long unreadMessagesTotal = 0l;

    	for (ChatDescriptionDto chat : chatDescriptionDtoList) {
    		unreadMessagesTotal = Long.sum(unreadMessagesTotal, chat.getUnread_messages());
		}
    	
    	return ResponseEntity.ok(new AttendanceChatListDto(attendance.getDocwayId(), unreadMessagesTotal, chatDescriptionDtoList));
    }
    
    private Set<Participant> getParticipantSet(Attendance attendance)  {
    	Set<Participant> participantSet = new HashSet<>();
    	
    	AttendanceGuestsDto appointmentGuestsDto = telemedServerService.getAppointmentGuests(attendance.getDocwayId());
    	
		Optional<Participant> optional = participantRepository.findByPublicId(attendance.getInsured().getDocwayId());
		Participant participante = optional.isPresent() ? optional.get() : new Participant(attendance.getInsured());
		participantSet.add(participante);
		
		optional = participantRepository.findByPublicId(attendance.getProfessional().getDocwayId());
		participante = optional.isPresent() ? optional.get() : new Participant(attendance.getProfessional());
		participantSet.add(participante);
    	
    	for(GuestDto guest : appointmentGuestsDto.getGuests()) {
			optional = participantRepository.findByPublicId(guest.getPublicId());
			
			participante = optional.isPresent() ? optional.get() : new Participant(guest);
			
			participantSet.add(participante);
    	}
    	
    	for(Guest guest : attendance.getGuests()) {
			optional = participantRepository.findByPublicId(guest.getPublicId());
			
			participante = optional.isPresent() ? optional.get() : new Participant(guest);
			
			participantSet.add(participante);
    	}
    	
    	return participantSet;
    }

    private long getUnreadMessages(String userPublicId, Long chatId, Pageable pagination) {
    	if(chatId == null) {
    		return 0l;
    	}
    	
    	Set<Long> chatIds = new HashSet<Long>();
    	chatIds.add(chatId);
    	
    	MsParticipantDtoList unreadMessages =  msChatService.getTotalUnreadMessagesList(userPublicId, chatIds, true, true, pagination);
    	
    	return unreadMessages.getChats().stream().filter(chat -> chat.getChat_id().equals(chatId)).findFirst().get().getUnread_messages();
    }

    public ResponseEntity<List<Map<String,String>>> listChatParticipants(Long chatId){
        Chat chat = repository.findByMsChatId(chatId).orElseThrow(()->new InvalidException("chat_id invalido"));
        Set<Participant> participants = chat.getParticipants();
        
        return ResponseEntity.ok(participants.stream().map(p->{
            Map<String,String> map = new HashMap<>();
            map.put("nome", p.getName());
            map.put("participante_id", p.getPublicId());
            map.put("participante_type", p.getType().getDescription());
            map.put("status","ATIVO");
            return map;
        }).collect(Collectors.toList()));
    }

    @Async
    @Transactional
    public void produceNewChat(ChatForm chatForm) {

        if (chatForm.getChatId() == null) {

            Set<Participant> participants = getParticipantsList(chatForm.getAttendanceId(), chatForm.getParticipantId());

            List<String> participantsPublicIds = participants.stream().map(Participant::getPublicId)
                    .collect(Collectors.toList());

            producer.newChat(participantsPublicIds, chatForm.getAttendanceId());
        } else {
            
            // TODO:Retornar no socket o chat ja exitente
            Chat chat = repository.findByMsChatIdAndParticipantsPublicId(Long.parseLong(chatForm.getChatId()), currentUser().getPublicIdOfInsuredOrGuest())
            .orElseThrow(() -> new InvalidException("Chat com id " + chatForm.getChatId() + " não encontrado para o usuário atual"));

            msChatService.listChatMessages(chat.getMsChatId(),chatForm.getOffset(),chatForm.getSize(), currentUser());
        }
    }

    public void consumeNewChat(MsChatCreationForm response) {
        Optional<Chat> optChat = repository.findByMsChatId(response.getChatId());

        Chat chat = null;

        if (optChat.isPresent()) {
            chat = optChat.get();

            log.info("Chat ja existente, retornando chat da base");
        } else {

            Set<Participant> chatParticipants = getParticipantsList(response.getGenericId(), null)
                    .stream()
                    .filter(p -> response.getParticipants().contains(p.getPublicId())).collect(Collectors.toSet());

            chat = createNewChatLocally(response.getChatId(), new Date(), chatParticipants);
            log.info("Gerando novo chat");
        }
        socketNewChat(chat);

        log.info("\nchat_id: {} \nms_chat_id:{}\nparticipants:{}", chat.getId(), chat.getMsChatId(),
                chat.getParticipantNames());
    }

    private void socketNewChat(Chat chat){
        // TODO:Implementar lógica do socket
        wsService.sendToParticipants(chat.getParticipants(), "/ws/chat", new WSNewChatDto(chat));
    }

    public void produceNewMessage(ChatMessageForm form, Long chatId){

        producer.newMessage(chatId, currentUser().getPublicIdOfInsuredOrGuest(), form.getType(), form.getBody(), "");
    }
    
    public void produceNewMessage(Long chatId, MultipartFile file) throws IOException{
    	
    	String encodedString = "data:" + file.getContentType() + ";base64,";
		
		encodedString += Base64.getEncoder().encodeToString(file.getBytes());

        producer.newMessage(chatId, currentUser().getPublicIdOfInsuredOrGuest(), "attachment", file.getOriginalFilename(), encodedString);
    }

    public void consumeNewMessage(ChatMessageDto response){
    	
        Chat chat = repository.findByMsChatId(response.getChatId())
        .orElseThrow(()-> new InvalidException("Chat com msChatId:"+response.getChatId()+" Não encontrado")) ;

        Set<Participant> participants = chat.getParticipants();

        socketNewMessageToParticipants(response, participants);

        log.info("\nNova Mensagem no chat_id:{} para os participantes:\n{}\nConteudo:{}"
        ,response.getChatId(), chat.getParticipantNames(),response.getText());
    }

    private void socketNewMessageToParticipants(ChatMessageDto response, Set<Participant> participants){
        // TODO:Implementar lógica do socket
        Participant sender = participants.stream().filter(p -> p.getPublicId().equals(response.getSenderUuid())).findAny().orElseThrow();
        if (StringUtils.hasText(response.getUrl())) {
        	response.setUrl(msChatService.recoverS3Link(response.getUrl()));
        }
        for (Participant p : participants) {

            WSNewMessageDto dto = new WSNewMessageDto(response, sender.getName());
            if(p.getPublicId().equals(response.getSenderUuid())) {
                dto.setEventType(WSChatEventType.NEW_MESSAGE_SENT_BY_YOU);
            }
            wsService.sendToParticipant(p, "/ws/chat", dto);
        }
    }

    public void produceReadMessage(Long chatId, Long offset){
        producer.readMessage(chatId, currentUser().getPublicIdOfInsuredOrGuest(), offset);
    }

    public void consumeReadMessage(ChatReadMsgDto response){

        Chat chat = repository.findByMsChatId(response.getChatId())
        .orElseThrow(()-> new InvalidException("Chat com msChatId:"+response.getChatId()+" Não encontrado")) ;

        Set<Participant> participants = chat.getParticipants();

        Participant reader = participants.stream()
        .filter(p->p.getPublicId().equals(response.getReaderUuid()))
        .findFirst().orElseThrow(()-> new InvalidException("Participante não encotrado no chat"));

        socketMessageReadtoParticipants(response, reader, participants);

        log.info("\nMensagem de offset:{} Lida no chat_id:{} Pelo participante:{} para os participantes:\n{}",response.getOffSet(), response.getChatId(),reader.getName(),chat.getParticipantNames());
    }

    private void socketMessageReadtoParticipants(ChatReadMsgDto response, Participant reader, Set<Participant> participants) {
        // TODO:Implementar lógica do socket
        for (Participant p : participants) {
            WSMessageReadDto dto = new WSMessageReadDto(response.getChatId(), reader, response.getOffSet());
            if(p.getPublicId().equals(reader.getPublicId())) {
                dto.setEventType(WSChatEventType.MESSAGE_READ_BY_YOU);
            }
            wsService.sendToParticipant(p, "/ws/chat", dto);
        }
    }
}
