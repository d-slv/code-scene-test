package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class ApiConfigurationForm {
	
	@NotEmpty(message = "clientAccessKey é obrigatória")
	private String clientAccessKey;
	
	@NotEmpty(message = "timezone é obrigatória")
	private String timezone;	
	
	@NotNull(message = "jwtExpirationInMinutes é obrigatória")
	private Integer jwtExpirationInMinutes;

	private String jwtSecret;	
	
	private String serverApiWebhookToken;	
	
	@NotEmpty(message = "frontWebUrl é obrigatória")
	private String frontWebUrl;
	
	@NotEmpty(message = "serverApiUrl é obrigatória")
	private String serverApiUrl;
	
	@NotEmpty(message = "clientApiUrl é obrigatória")
	private String clientApiUrl;
	
	private String airmedApiUrl;
	
	private String clientValidateInsuredUrl;
	
	private String airmedWebhookAccessToken;
	
	private String airmedKey;

	private String ilyDocumentAppKey;

	private String ilyAuthJwtKey;

	private String ilyDocumentUrl;		
	
	
	public String getClientAccessKey() {
		return clientAccessKey;
	}

	public void setClientAccessKey(String clientAccessKey) {
		this.clientAccessKey = clientAccessKey;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	public Integer getJwtExpirationInMinutes() {
		return jwtExpirationInMinutes;
	}

	public void setJwtExpirationInMinutes(Integer jwtExpirationInMinutes) {
		this.jwtExpirationInMinutes = jwtExpirationInMinutes;
	}
	
	public String getJwtSecret() {
		return jwtSecret;
	}	
	
	public void setJwtSecret(String jwtSecret) {
		this.jwtSecret = jwtSecret;
	}
	
	public String getServerApiWebhookToken() {
		return serverApiWebhookToken;
	}
	
	public void setServerApiWebhookToken(String serverApiWebhookToken) {
		this.serverApiWebhookToken = serverApiWebhookToken;
	}

	public String getFrontWebUrl() {
		return frontWebUrl;
	}

	public void setFrontWebUrl(String frontWebUrl) {
		this.frontWebUrl = frontWebUrl;
	}

	public String getServerApiUrl() {
		return serverApiUrl;
	}

	public void setServerApiUrl(String serverApiUrl) {
		this.serverApiUrl = serverApiUrl;
	}

	public String getClientApiUrl() {
		return clientApiUrl;
	}

	public void setClientApiUrl(String clientApiUrl) {
		this.clientApiUrl = clientApiUrl;
	}

	public String getAirmedApiUrl() {
		return airmedApiUrl;
	}
	
	public void setAirmedApiUrl(String airmedApiUrl) {
		this.airmedApiUrl = airmedApiUrl;
	}
	
	public String getClientValidateInsuredUrl() {
		return clientValidateInsuredUrl;
	}
	
	public void setClientValidateInsuredUrl(String clientValidateInsuredUrl) {
		this.clientValidateInsuredUrl = clientValidateInsuredUrl;
	}
	
	public String getAirmedWebhookAccessToken() {
		return airmedWebhookAccessToken;
	}
	
	public void setAirmedWebhookAccessToken(String airmedWebhookAccessToken) {
		this.airmedWebhookAccessToken = airmedWebhookAccessToken;
	}
	
	public String getAirmedKey() {
		return airmedKey;
	}
	
	public void setAirmedKey(String airmedKey) {
		this.airmedKey = airmedKey;
	}
	
	public String getIlyDocumentAppKey() {
		return ilyDocumentAppKey;
	}

	public void setIlyDocumentAppKey(String ilyDocumentAppKey) {
		this.ilyDocumentAppKey = ilyDocumentAppKey;
	}

	public String getIlyAuthJwtKey() {
		return ilyAuthJwtKey;
	}

	public void setIlyAuthJwtKey(String ilyAuthJwtKey) {
		this.ilyAuthJwtKey = ilyAuthJwtKey;
	}

	public String getIlyDocumentUrl() {
		return ilyDocumentUrl;
	}

	public void setIlyDocumentUrl(String ilyDocumentUrl) {
		this.ilyDocumentUrl = ilyDocumentUrl;
	}
}
