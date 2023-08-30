package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotBlank;

import br.com.maidahealth.telemedapi.models.Attachment;

public class AttachmentForm {

    @NotBlank
    private String name;

    @NotBlank
    private String key;

    public AttachmentForm() {
        // constructor is empty
    }

    public AttachmentForm(Attachment attachment) {
        this.name = attachment.getName();
        this.key = attachment.getKey();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Attachment toAttachment() {
        Attachment attachment = new Attachment();

        attachment.setKey(key);
        attachment.setName(name);

        return attachment;
    }
}
