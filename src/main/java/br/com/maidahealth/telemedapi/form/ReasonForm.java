package br.com.maidahealth.telemedapi.form;


import javax.validation.constraints.NotBlank;

public class ReasonForm {

    @NotBlank(message = "O motivo não pode ser vazio.")
    private String supportReason;

    public  String getSupportReason() {
        return supportReason;
    }

    public void setSupportReason(String supportReason) {
        this.supportReason = supportReason;
    }

}
