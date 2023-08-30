package br.com.maidahealth.telemedapi.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;


public class ParticipantDto {
    
    @JsonProperty("participant_uuid")
    private String participantUuid;

    @JsonProperty("unread_messages_total")
    private Long unreadMessagesTotal;

    @JsonProperty("chats")
    private Object chats;

    public ParticipantDto(String participantUuid, Long totalUnreadMessages, List<ChatParticipantDto> chats) {
        this.participantUuid = participantUuid;
        this.unreadMessagesTotal = totalUnreadMessages;
        this.chats = chats;
    }

    public ParticipantDto(String participantUuid, Long totalUnreadMessages, CustomChatPage<ChatParticipantDto> chats) {
        this.participantUuid = participantUuid;
        this.unreadMessagesTotal = totalUnreadMessages;
        this.chats = chats;
    }

    public String getParticipantUuid() {
        return participantUuid;
    }

    public void setParticipantUuid(String participantUuid) {
        this.participantUuid = participantUuid;
    }

    public Long getUnreadMessagesTotal() {
        return unreadMessagesTotal;
    }

    public void setUnreadMessagesTotal(Long unreadMessagesTotal) {
        this.unreadMessagesTotal = unreadMessagesTotal;
    }

    public Object getChats() {
        return chats;
    }

    public void setChats(Object chats) {
        this.chats = chats;
    }

}
