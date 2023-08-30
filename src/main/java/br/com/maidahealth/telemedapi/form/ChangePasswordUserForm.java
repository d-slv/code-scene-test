package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;

import br.com.maidahealth.telemedapi.customvalidations.PasswordsMatch;

@PasswordsMatch
public class ChangePasswordUserForm {
	
	@NotEmpty(message = "A senha atual é obrigatória")
	private String oldPassword;
	
	@NotEmpty(message = "A nova senha é obrigatória")
	private String newPassword;
	
	@NotEmpty(message = "A confirmação para nova senha é obrigatória")
	private String newPasswordConfirmation;

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getNewPasswordConfirmation() {
		return newPasswordConfirmation;
	}

	public void setNewPasswordConfirmation(String newPasswordConfirmation) {
		this.newPasswordConfirmation = newPasswordConfirmation;
	}
	
}
