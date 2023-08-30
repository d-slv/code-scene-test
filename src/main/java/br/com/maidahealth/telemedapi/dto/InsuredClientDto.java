package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.User;

public class InsuredClientDto {
	
	private Long id;
	
	private String cpf;
	
	private String name;
	
	private String email;

	private String phoneNumber;

	private String url;
	
	private String token;

	public InsuredClientDto(Insured insured, User user, String url) {
		super();
		this.id = insured.getId();
		this.cpf = insured.getCpf();
		this.name = insured.getName();
		this.phoneNumber = insured.getLastPhoneNumber();
		this.email = user.getEmail();
		this.url = url + "/auth/" + insured.getPublicToken();
		this.token = insured.getPublicToken();
	}

	public synchronized Long getId() {
		return id;
	}

	public synchronized void setId(Long id) {
		this.id = id;
	}

	public synchronized String getCpf() {
		return cpf;
	}

	public synchronized void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public synchronized String getName() {
		return name;
	}

	public synchronized void setName(String name) {
		this.name = name;
	}

	public synchronized String getEmail() {
		return email;
	}

	public synchronized void setEmail(String email) {
		this.email = email;
	}

	public synchronized String getPhoneNumber() {
		return phoneNumber;
	}

	public synchronized void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public synchronized String getUrl() {
		return url;
	}

	public synchronized void setUrl(String url) {
		this.url = url;
	}

	public synchronized String getToken() {
		return token;
	}

	public synchronized void setToken(String token) {
		this.token = token;
	}
}
