package br.com.maidahealth.telemedapi.dto.WebSocket;

import java.util.Set;

import br.com.maidahealth.telemedapi.enums.WSChatEventType;
import br.com.maidahealth.telemedapi.models.Chat;

public class WSNewChatDto {

    private WSChatEventType eventType = WSChatEventType.NEW_CHAT;
    
    private Long chatId;

    private Set<ParticipantSimpleDto> participants;

    public WSNewChatDto(Chat chat) {
       this.chatId = chat.getMsChatId();
       this.participants = ParticipantSimpleDto.toDto(chat.getParticipants()); 
    }

    public WSChatEventType getEventType() {
        return eventType;
    }

    public void setEventType(WSChatEventType eventType) {
        this.eventType = eventType;
    }

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public Set<ParticipantSimpleDto> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<ParticipantSimpleDto> participants) {
        this.participants = participants;
    }

}
