package br.com.maidahealth.telemedapi.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class SensediaConfiguration {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String sensediaUrl;

	private String sensediaEnv;

	private String sensediaClientId;

	private String sensediaClientToken;

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
