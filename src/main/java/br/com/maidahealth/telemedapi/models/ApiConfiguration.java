package br.com.maidahealth.telemedapi.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ApiConfiguration {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String clientAccessKey;
	
	private String timezone;
	
	private Integer jwtExpirationInMinutes;
	
	private String jwtSecret;
	
	private String serverApiWebhookToken;
	
	private String frontWebUrl;
	
	private String serverApiUrl;
	
	private String clientApiUrl;
	
	private String airmedApiUrl;
	
	private String clientValidateInsuredUrl;
	
	private String airmedWebhookAccessToken;
	
	private String airmedKey;

	private String ilyDocumentAppKey;

	private String ilyAuthJwtKey;

	private String ilyDocumentUrl;

	private String msChatApiUrl;

	private String msChatApiKey;
	
	private String kafkaInsuredUpdateTopic;

	private Long apiIntegrationTimeoutInSeconds;

	private Long apiIntegrationRetryMax;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public String getJwtSecret() {
		return jwtSecret;
	}

	public void setJwtSecret(String jwtSecret) {
		this.jwtSecret = jwtSecret;
	}

	public String getClientApiUrl() {
		return clientApiUrl;
	}

	public void setClientApiUrl(String clientApiUrl) {
		this.clientApiUrl = clientApiUrl;
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

	public String getAirmedApiUrl() {
		return airmedApiUrl;
	}

	public void setAirmedApiUrl(String airmedApiUrl) {
		this.airmedApiUrl = airmedApiUrl;
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
	
	public String getMsChatApiUrl() {
		return msChatApiUrl;
	}

	public void setMsChatApiUrl(String msChatApiUrl) {
		this.msChatApiUrl = msChatApiUrl;
	}

	public String getMsChatApiKey() {
		return msChatApiKey;
	}

	public void setMsChatApiKey(String msChatApiKey) {
		this.msChatApiKey = msChatApiKey;
	}

	public String getKafkaInsuredUpdateTopic() {
		return kafkaInsuredUpdateTopic;
	}

	public void setKafkaInsuredUpdateTopic(String kafkaInsuredUpdateTopic) {
		this.kafkaInsuredUpdateTopic = kafkaInsuredUpdateTopic;
	}

	public Long getApiIntegrationTimeoutInSeconds() {
		return apiIntegrationTimeoutInSeconds;
	}

	public void setApiIntegrationTimeoutInSeconds(Long apiIntegrationTimeoutInSeconds) {
		this.apiIntegrationTimeoutInSeconds = apiIntegrationTimeoutInSeconds;
	}

	public Long getApiIntegrationRetryMax() {
		return apiIntegrationRetryMax;
	}
	
	public void setApiIntegrationRetryMax(Long apiIntegrationRetryMax) {
		this.apiIntegrationRetryMax = apiIntegrationRetryMax;
	}	
}
