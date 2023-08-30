package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;

public class RecoveryPassForm {
	
	@NotEmpty(message = "O login é obrigatório para recuperação de senha")
	private String login;

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

}
