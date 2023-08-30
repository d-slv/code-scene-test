package br.com.maidahealth.telemedapi.form;

import java.util.Date;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import br.com.maidahealth.telemedapi.enums.ParticipantType;
import br.com.maidahealth.telemedapi.models.AttachmentViewer;

public class AttachmentViewerForm {

    @NotNull(message= "Chave não pode ser nula")
    @NotEmpty(message = "Chave não pode ser vazia")
    private String key;

    @NotNull(message= "publicId não pode ser nulo")
    @NotEmpty(message = "publicId não pode ser vazio")
    private String publicId;

    @NotNull(message= "Tipo não pode ser nulo")
    private ParticipantType type;

    @NotNull(message= "Data de visualização não pode ser nula")
    private Date viewDate;

    public AttachmentViewerForm() {

    }

    public AttachmentViewerForm(AttachmentViewer viewer) {
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

    public static AttachmentViewer convert(AttachmentViewerForm form) {
        AttachmentViewer viewer = new AttachmentViewer();
        viewer.setKey(form.getKey());
        viewer.setPublicId(form.getPublicId());
        viewer.setType(form.getType());
        viewer.setCreatedAt(form.getViewDate());

        return viewer;
    }

}
