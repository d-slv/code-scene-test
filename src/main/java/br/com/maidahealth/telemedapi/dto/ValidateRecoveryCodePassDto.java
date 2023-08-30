package br.com.maidahealth.telemedapi.dto;

public class ValidateRecoveryCodePassDto {
	
	private String email;
	
	private String recoveryCode;
	
	public ValidateRecoveryCodePassDto(String email, String recoveryCode) {
		this.email = email;
		this.recoveryCode = recoveryCode;
	}

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
