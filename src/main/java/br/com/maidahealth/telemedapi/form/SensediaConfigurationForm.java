package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;

public class SensediaConfigurationForm {

	@NotEmpty(message = "sensediaUrl é obrigatória")
	private String sensediaUrl;

	@NotEmpty(message = "sensediaEnv é obrigatória")
	private String sensediaEnv;

	@NotEmpty(message = "sensediaClientId é obrigatória")
	private String sensediaClientId;

	@NotEmpty(message = "sensediaClientToken é obrigatória")
	private String sensediaClientToken;

	@NotEmpty(message = "sensediaEmPlano é obrigatória")
	private String sensediaEmPlano;

	public String getSensediaUrl() {
		return sensediaUrl;
	}

	public void setSensediaUrl(String sensediaUrl) {
		this.sensediaUrl = sensediaUrl;
	}

	public String getSensediaEnv() {
		return sensediaEnv;
	}

	public void setSensediaEnv(String sensediaEnv) {
		this.sensediaEnv = sensediaEnv;
	}

	public String getSensediaClientId() {
		return sensediaClientId;
	}

	public void setSensediaClientId(String sensediaClientId) {
		this.sensediaClientId = sensediaClientId;
	}

	public String getSensediaClientToken() {
		return sensediaClientToken;
	}

	public void setSensediaClientToken(String sensediaClientToken) {
		this.sensediaClientToken = sensediaClientToken;
	}

	public String getSensediaEmPlano() {
		return sensediaEmPlano;
	}

	public void setSensediaEmPlano(String sensediaEmPlano) {
		this.sensediaEmPlano = sensediaEmPlano;
	}

}
