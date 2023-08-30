package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;

public class ValidateRecoveryCodePassForm {
	
	@NotEmpty(message = "O email é obrigatório")
	private String email;
	
	@NotEmpty(message = "O código de verificação é obrigatório")
	private String recoveryCode;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRecoveryCode() {
		return recoveryCode;
	}

	public void setRecoveryCode(String recoveryCode) {
		this.recoveryCode = recoveryCode;
	}
	
}
