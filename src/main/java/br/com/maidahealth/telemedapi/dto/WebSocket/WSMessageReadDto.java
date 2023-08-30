package br.com.maidahealth.telemedapi.dto.WebSocket;

import br.com.maidahealth.telemedapi.enums.WSChatEventType;
import br.com.maidahealth.telemedapi.models.Participant;

public class WSMessageReadDto {

    private WSChatEventType eventType = WSChatEventType.MESSAGE_READ;
    
    private Long chatId;

    private ParticipantSimpleDto participant;

    private Long offSet;
    
    public WSMessageReadDto(Long chatId, Participant participant, Long offSet) {
        this.chatId = chatId;
        this.participant = new ParticipantSimpleDto(participant);
        this.offSet = offSet;
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

    public ParticipantSimpleDto getParticipant() {
        return participant;
    }

    public void setParticipant(ParticipantSimpleDto participant) {
        this.participant = participant;
    }

    public Long getOffSet() {
        return offSet;
    }

    public void setOffSet(Long offSet) {
        this.offSet = offSet;
    }

}
