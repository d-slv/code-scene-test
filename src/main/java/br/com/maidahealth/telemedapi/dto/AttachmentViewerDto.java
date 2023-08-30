package br.com.maidahealth.telemedapi.dto;

import java.util.Date;

import br.com.maidahealth.telemedapi.enums.ParticipantType;
import br.com.maidahealth.telemedapi.models.AttachmentViewer;

public class AttachmentViewerDto {
    
    private String key;

    private String publicId;

    private ParticipantType type;

    private Date viewDate;

    public AttachmentViewerDto(AttachmentViewer viewer) {
        this.key = viewer.getKey();
        this.publicId = viewer.getPublicId();
        this.type = viewer.getType();
        this.viewDate = viewer.getCreatedAt();
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

    public Date getViewDate() {
        return viewDate;
    }

    public void setViewDate(Date viewDate) {
        this.viewDate = viewDate;
    }

}
