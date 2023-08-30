package br.com.maidahealth.telemedapi.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.dto.ChatHistoryDto;
import br.com.maidahealth.telemedapi.dto.ChatMessageDto;
import br.com.maidahealth.telemedapi.dto.ChatReadMsgDto;
import br.com.maidahealth.telemedapi.dto.MsParticipantDtoList;
import br.com.maidahealth.telemedapi.dto.MsParticipantDtoPage;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.exceptions.InvalidUserException;
import br.com.maidahealth.telemedapi.form.AttachmentListForm;
import br.com.maidahealth.telemedapi.form.MsChatCreationForm;
import br.com.maidahealth.telemedapi.models.User;

@Service
public class MsChatService {

	@Autowired
	private TelemedClientApiContext context;
    
    
	public MsChatCreationForm createNewChatRequest(String genericId, List<String> participants) {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getMsChatApiUrl());
		String apiKey = getMsChatApiToken();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("api_key", apiKey);
		map.put("generic_id", genericId);
		map.put("participant_uuids", participants);

		return webClient.post()

				.uri("/chat/new-chat")
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
                .header("ApiKey", apiKey)

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.body(BodyInserters.fromValue(map))
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})

				.bodyToMono(MsChatCreationForm.class)
				.block()
				;
            
	}
	
	public void chatNewMessage(String type, String textOrAttachmentName, Long msChatId, String uuid, String attachmentBase64) {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getMsChatApiUrl());
		String apiKey = getMsChatApiToken();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("api_key", apiKey);
		map.put("chat_id", msChatId);
		map.put("text_or_attachment_name", textOrAttachmentName);
		map.put("sender_uuid", uuid);
		map.put("type", type);
		map.put("attachment_base64", attachmentBase64);

		webClient.post()

				.uri("/chat/new-message")
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
                .header("ApiKey", apiKey)                
                
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.body(BodyInserters.fromValue(map))
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})

				.bodyToMono(ChatMessageDto.class)
				.block()
				;
	}
	
	public void chatReadMessage(String participantPublicId, Long offset, Long chatId) {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getMsChatApiUrl());
		String apiKey = getMsChatApiToken();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("api_key", apiKey);
		map.put("chat_id", chatId);
		map.put("participant_uuid", participantPublicId);
		map.put("offset", offset);

		webClient.post()

				.uri("/chat/read-message")
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
                .header("ApiKey", apiKey)                
                
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.body(BodyInserters.fromValue(map))
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})

				.bodyToMono(ChatReadMsgDto.class)
				.block()
				;
	}	

    public ChatHistoryDto listChatMessages(Long msChatId, Integer offset, Integer size, User currentUser) {

		WebClient webClient = WebClient.create(context.getApiConfiguration().getMsChatApiUrl());
		String apiKey = getMsChatApiToken();

		String offsetString = offset == null ? "" : offset.toString();
		String sizeString = size == null ? "" : size.toString();
        
		ChatHistoryDto chatHistoryDto = webClient.get()

				.uri("/chat/" + msChatId + "/history" + "?participant_id=" + currentUser.getInsured().getDocwayId() +"&page=" + offsetString + "&size=" + sizeString)
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
                .header("ApiKey", apiKey)

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})

				.bodyToMono(ChatHistoryDto.class)
				.block()
				;
		if (chatHistoryDto.getMessages()!=null) {
			chatHistoryDto.getMessages().stream()
				.filter(message -> StringUtils.hasText(message.getUrl()))
				.forEach(message -> message.setUrl(recoverS3Link(message.getUrl())));
		}
		
		return chatHistoryDto;
    }

    public MsParticipantDtoList getTotalUnreadMessagesList(String participantPublicId, Set<Long> chatIds, boolean chatInfo, boolean listAll, Pageable pagination) {

		WebClient webClient = WebClient.create(context.getApiConfiguration().getMsChatApiUrl());
		String apiKey = getMsChatApiToken();

		String chatIdString = chatIds != null ? chatIds.toString().replaceAll("\\[|\\]","") : "";

		return webClient.get()

				.uri("/chat/participant/" + participantPublicId + "?chatInfo=" + chatInfo +"&listAll=" + listAll + "&chatId=" + chatIdString +
											"&page=" + pagination.getPageNumber() + "&size=" + pagination.getPageSize())
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
				.header("ApiKey", apiKey)

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})

				.bodyToMono(MsParticipantDtoList.class)
				.block()
				;

    }

    public MsParticipantDtoPage getTotalUnreadMessagesPage(String participantPublicId, Set<Long> chatIds, boolean chatInfo, boolean listAll, Pageable pagination) {

		WebClient webClient = WebClient.create(context.getApiConfiguration().getMsChatApiUrl());
		String apiKey = getMsChatApiToken();

		String chatIdString = chatIds != null ? chatIds.toString().replaceAll("\\[|\\]","") : "";

		return webClient.get()

				.uri("/chat/participant/" + participantPublicId + "?chatInfo=" + chatInfo +"&listAll=" + listAll + "&chatId=" + chatIdString +
											"&page=" + pagination.getPageNumber() + "&size=" + pagination.getPageSize() + "&sort=" + pagination.getSort())
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
				.header("ApiKey", apiKey)

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})

				.bodyToMono(MsParticipantDtoPage.class)
				.block()
				;

    }
    
    public String recoverS3Link(String uri) {

        WebClient webClient = WebClient.create(context.getApiConfiguration().getMsChatApiUrl());

        ClientResponse response = webClient.get()
                .uri(uri)
                .header("ApiKey", getMsChatApiToken())

                .exchange()
                .block();

        HttpStatus status = response.statusCode();
        JsonNode obj = response.bodyToMono(JsonNode.class).block();

        if (status.isError())
            throw new InvalidException("erro ao recuperar link do arquivo");

        return obj.get("url").asText();
    }

	public void shareAttachments(Long chatId, String currentUser, AttachmentListForm form) {

		WebClient webClient = WebClient.create(context.getApiConfiguration().getMsChatApiUrl());
		String apiKey = getMsChatApiToken();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("sender_uuid", currentUser);
		map.put("attachment_list", form.getAttachmentList());

		webClient.post()

				.uri("/chat/" + chatId + "/share-attachments")
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
                .header("ApiKey", apiKey)                
                
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.body(BodyInserters.fromValue(map))
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					return response.bodyToMono(String.class).map(InvalidUserException::new);
				})

				.bodyToMono(JsonNode.class)
				.block()
				;
	}

	public String getMsChatApiToken() {
		return context.getApiConfiguration().getMsChatApiKey();
	}

}
