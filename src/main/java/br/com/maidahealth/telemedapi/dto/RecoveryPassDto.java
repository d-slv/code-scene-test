package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.User;

public class RecoveryPassDto {
	
	private String email;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public static RecoveryPassDto convert(User user) {
		RecoveryPassDto recoveryPassDto = new RecoveryPassDto();
		recoveryPassDto.setEmail(user.getEmail());
		
		return recoveryPassDto;
	}

}
