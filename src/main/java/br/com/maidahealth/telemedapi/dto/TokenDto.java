package br.com.maidahealth.telemedapi.dto;

import org.springframework.util.StringUtils;

import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.utils.Utils;

public class TokenDto {

	private String urlProfile;
	private String name;
	private String cpf;
	private String email;
	private String token;
	private String tokenType;
	private Boolean needsRegistrationUpdate;
	private String profile;

	public TokenDto(String token, User user) {
		super();
		this.urlProfile = null;
		this.name = Utils.convertStringLikePersonName(user.getName());
		this.cpf = user.getCpf();
		this.email = user.getEmail();
		this.token = token;
		this.needsRegistrationUpdate = user.isInsured() && StringUtils.isEmpty(user.getInsured().getDocwayId());
		this.profile = user.getProfiles().iterator().next().getName();
	}

	public TokenDto() {
		
	}

	public TokenDto(String token, String tokenType, User user) {
		this(token, user);
		this.tokenType = tokenType;
	}

	public String getUrlProfile() {
		return urlProfile;
	}
	public void setUrlProfile(String urlProfile) {
		this.urlProfile = urlProfile;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}

	public Boolean getNeedsRegistrationUpdate() {
		return needsRegistrationUpdate;
	}

	public void setNeedsRegistrationUpdate(Boolean needsRegistrationUpdate) {
		this.needsRegistrationUpdate = needsRegistrationUpdate;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}


	public String getTokenType() {
		return tokenType;
	}

	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}
}
