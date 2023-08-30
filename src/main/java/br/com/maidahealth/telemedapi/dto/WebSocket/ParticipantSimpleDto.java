package br.com.maidahealth.telemedapi.dto.WebSocket;

import java.util.Set;
import java.util.stream.Collectors;

import br.com.maidahealth.telemedapi.enums.ParticipantType;
import br.com.maidahealth.telemedapi.models.Participant;

public class ParticipantSimpleDto {
    
    private String publicId;

    private String name;

    private ParticipantType type;

    public ParticipantSimpleDto(Participant participant) {
        this.publicId = participant.getPublicId();
        this.name = participant.getName();
        this.type = participant.getType();
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ParticipantType getType() {
        return type;
    }

    public void setType(ParticipantType type) {
        this.type = type;
    }

    public static Set<ParticipantSimpleDto> toDto(Set<Participant> participants) {
        return participants.stream().map(ParticipantSimpleDto::new).collect(Collectors.toSet());
    }

}
