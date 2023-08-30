package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;

public class InsuredResendForm {

	@NotEmpty(message = "O email é obrigatório")
	private String email;
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
