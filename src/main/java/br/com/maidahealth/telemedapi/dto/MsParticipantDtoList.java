package br.com.maidahealth.telemedapi.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MsParticipantDtoList {
    
    @JsonProperty("participant_uuid")
    private String participantUuid;

    @JsonProperty("unread_messages_total")
    private Long unreadMessagesTotal;

    @JsonProperty("chats")
    private List<ChatParticipantDto> chats;

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

    public List<ChatParticipantDto> getChats() {
        return chats;
    }

    public void setChats(List<ChatParticipantDto> chats) {
        this.chats = chats;
    }

}
