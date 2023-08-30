package br.com.maidahealth.telemedapi.form;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class AttachmentListForm {

    @NotNull(message= "lista não pode ser nula")
    @NotEmpty(message = "lista não pode ser vazia")
    private List<AttachmentForm> attachmentList = new ArrayList<>();

    public AttachmentListForm() {
    }

    public AttachmentListForm(List<AttachmentForm> list){
        this.attachmentList = list;
    }

    public List<AttachmentForm> getAttachmentList() {
        return attachmentList;
    }

    public void setAttachmentList(List<AttachmentForm> attachmentList) {
        this.attachmentList = attachmentList;
    }
}
