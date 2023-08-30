package br.com.maidahealth.telemedapi.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import br.com.maidahealth.telemedapi.enums.ParticipantType;

@Entity
public class AttachmentViewer extends BaseEntity {
    
    private String key;

    private String publicId;

	@Enumerated(EnumType.STRING)
    private ParticipantType type;

    public AttachmentViewer() {

    }

    public AttachmentViewer(String key, Insured insured) {
        this.key = key;
        this.publicId = insured.getDocwayId();
        this.type = ParticipantType.PATIENT;
    }

    public AttachmentViewer(String key, Guest guest) {
        this.key = key;
        this.publicId = guest.getPublicId();
        this.type = ParticipantType.PATIENT;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public ParticipantType getType() {
        return type;
    }

    public void setType(ParticipantType type) {
        this.type = type;
    }

}
