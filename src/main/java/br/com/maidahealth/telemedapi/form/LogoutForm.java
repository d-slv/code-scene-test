package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;

public class LogoutForm {
	
	@NotEmpty(message = "O ID do dispositivo é obrigatório")
	private String deviceId;

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

}
