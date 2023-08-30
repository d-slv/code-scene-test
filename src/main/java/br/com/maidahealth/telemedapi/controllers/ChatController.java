package br.com.maidahealth.telemedapi.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.maidahealth.telemedapi.dto.AttendanceChatListDto;
import br.com.maidahealth.telemedapi.dto.ChatHistoryDto;
import br.com.maidahealth.telemedapi.dto.ParticipantDto;
import br.com.maidahealth.telemedapi.dto.SearchChatDto;
import br.com.maidahealth.telemedapi.form.AttachmentListForm;
import br.com.maidahealth.telemedapi.form.ChatForm;
import br.com.maidahealth.telemedapi.form.ChatMessageForm;
import br.com.maidahealth.telemedapi.services.ChatService;
import javassist.NotFoundException;


@RestController
@RequestMapping("chat")
@EnableAsync
public class ChatController {
    
    @Autowired
    private ChatService service;
    
    @PostMapping
    public ResponseEntity<ChatHistoryDto> createChat(@RequestBody ChatForm form) throws NumberFormatException, NotFoundException {
        return service.createChat(form);
    }
    
    @GetMapping("/participants")
    public List<SearchChatDto> searchChats(@RequestParam String chatType, @RequestParam String name) {
        return service.searchChats(chatType, name);
    } 
    
    @GetMapping("/unread-messages")
    public ResponseEntity<ParticipantDto> getTotalUnreadMessages(
            @RequestParam(name = "chatInfo", defaultValue = "false") boolean chatInfo,
            @RequestParam(name = "listAll", defaultValue = "false") boolean listAll,
            @RequestParam(name = "chatId", required = false) Set<Long> chatIds,
            @RequestParam(name = "participantPublicId", required = false) String participantPublicId,
            @PageableDefault Pageable pagination) {
        return service.getTotalUnreadMessages(chatInfo, listAll, chatIds, participantPublicId, pagination);        
    }
    
    @GetMapping("/{attendanceId}/participants")
    public ResponseEntity<AttendanceChatListDto> getParticipants(@PathVariable String attendanceId) {
    	return service.getParticipants(attendanceId);
    }

    @PostMapping("/{chat_id}/message")
    public ResponseEntity<?> message(@RequestBody ChatMessageForm form, @PathVariable("chat_id") Long chatId){
    	return service.message(form, chatId);
    }
    
    @PostMapping("/{chat_id}/message/attachment")
    public ResponseEntity<?> messageAttachment(@PathVariable("chat_id") Long chatId,
    		@RequestParam("file") MultipartFile file) throws IOException{
    	return service.message(chatId, file);
    }

    @PostMapping("/{chat_id}/message/share-attachments")
    public ResponseEntity<?> messageAttachment(@PathVariable("chat_id") Long chatId,
    		@RequestBody @Valid AttachmentListForm form) {
    	return service.shareAttachments(chatId, form);
    }
    
    @PutMapping("/{chat_id}/message/read")
    public ResponseEntity<?> message(@RequestParam @NotNull @Positive Long offset, @PathVariable("chat_id") Long chatId){
    	return service.read(offset, chatId);
    }

    @GetMapping("/{chatId}/chat-participants")
    public ResponseEntity<List<Map<String,String>>> listChatParticipants(@PathVariable Long chatId){
        return service.listChatParticipants(chatId);

    }

    @PostMapping("/kafka-new-chat")
    public void newChatKafka(@RequestBody ChatForm chatForm) {
        service.produceNewChat(chatForm);
    }

    @PostMapping("/{chat_id}/kafka-message")
    public void kafkaMessage(@RequestBody ChatMessageForm form, @PathVariable("chat_id") Long chatId){
    	service.produceNewMessage(form, chatId);
    }
    
    @PostMapping("/{chat_id}/kafka-message/attachment")
    public void kafkaMessageAttachment(@PathVariable("chat_id") Long chatId,
    		@RequestParam("file") MultipartFile file) throws IOException{
    	service.produceNewMessage(chatId, file);
    }

    @GetMapping("/{chat_id}/kafka-read-message")
    public void kafkaReadMessage(@PathVariable("chat_id") Long chatId, 
    @RequestParam(name = "offset",required = true) Long offset){
        service.produceReadMessage(chatId, offset);
    }
}
