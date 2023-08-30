package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotBlank;

import br.com.maidahealth.telemedapi.customvalidations.PasswordsMatch;

@PasswordsMatch
public class NewPassForm {
	
	@NotBlank(message = "O e-mail é obrigatório")
	private String email;
	
	@NotBlank(message = "A nova senha é obrigatória")
	private String newPassword;
	
	@NotBlank(message = "A confirmação de senha é obrigatória")
	private String newPasswordConfirmation;
	
	@NotBlank(message = "O código de verificação é obrigatório")
	private String recoveryCode;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getRecoveryCode() {
		return recoveryCode;
	}

	public void setRecoveryCode(String recoveryCode) {
		this.recoveryCode = recoveryCode;
	}

}
