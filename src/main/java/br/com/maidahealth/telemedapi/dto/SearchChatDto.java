package br.com.maidahealth.telemedapi.dto;

import java.util.Set;
import java.util.stream.Collectors;

import br.com.maidahealth.telemedapi.enums.ChatType;
import br.com.maidahealth.telemedapi.models.Chat;
import br.com.maidahealth.telemedapi.models.Participant;

public class SearchChatDto {
    
    private Long msChatId;

    private Set<String> participantNames;

    private String participantType = null;

    public SearchChatDto() {

    }

    public SearchChatDto(Chat chat, Participant userParticipant) {
        this.msChatId = chat.getMsChatId();
        this.participantNames = chat.getParticipantNames();
        participantNames.remove(userParticipant.getName());
        if(chat.getType() == ChatType.PRIVATE) {
            Set<Participant> otherParticipants = chat.getParticipants();
            otherParticipants.remove(userParticipant);
            this.participantType = otherParticipants.stream().collect(Collectors.toList()).get(0).getType().getDescription();
        }
    }

    public Long getMsChatId() {
        return msChatId;
    }

    public void setMsChatId(Long msChatId) {
        this.msChatId = msChatId;
    }

    public Set<String> getParticipantNames() {
        return participantNames;
    }

    public void setParticipantNames(Set<String> participantNames) {
        this.participantNames = participantNames;
    }

    public String getParticipantType() {
        return participantType;
    }

    public void setParticipantType(String participantType) {
        this.participantType = participantType;
    }
    
}
