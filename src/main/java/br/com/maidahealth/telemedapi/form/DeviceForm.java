package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;

public class DeviceForm {
	
	@NotEmpty(message = "O id do dispositivo é obrigatório")
	private String deviceId;

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

}
