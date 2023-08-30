package br.com.maidahealth.telemedapi.form;

import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotEmpty;

public class UpdateUrlReturnAttendanceForm {

    @URL(message = "O formato da url é inválido")
    @NotEmpty(message = "O campo url é obrigatório")
    private String url;

    public UpdateUrlReturnAttendanceForm() {
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
