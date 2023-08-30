package br.com.maidahealth.telemedapi.form;


import javax.validation.constraints.NotNull;

public class ContactUpdateForm {

    @NotNull(message = "Obrigatório informar o número")
    private String phoneNumber;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
