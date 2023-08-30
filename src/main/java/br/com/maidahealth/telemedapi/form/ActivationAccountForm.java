package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;

public class ActivationAccountForm {
	
	@NotEmpty(message = "O email é obrigatório")
	private String email;
	
	@NotEmpty(message = "O código de verificação é obrigatório")
	private String code;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
}
