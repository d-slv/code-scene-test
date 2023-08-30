package br.com.maidahealth.telemedapi.form;

import br.com.maidahealth.telemedapi.enums.ParticipantType;
import br.com.maidahealth.telemedapi.models.Participant;

public class LocalChatParticipantForm {

    private String publicId;

    private String name;

    private ParticipantType type;

    public LocalChatParticipantForm() {
        
    }

    public LocalChatParticipantForm(Participant participant) {
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

    public Participant convertToParticipant() {
        Participant participant = new Participant();
        participant.setPublicId(this.publicId);
        participant.setName(this.name);
        participant.setType(this.type);

        return participant;
    }
}
