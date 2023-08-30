package br.com.maidahealth.telemedapi.form;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import br.com.maidahealth.telemedapi.enums.GenderEnum;

public class ClientInsuredForm {
	
	private Object id;
	
	private String name;
	
	private String cns;
	
	private String cpf;
	
	private String healthInsuranceNumber;
	
	private String email;
	
	private String birthdate;
	
	private String phoneNumber;
	
	@Enumerated(EnumType.STRING)
	private GenderEnum gender;
	
	private String rg;
	
	private String rgIssuer;
	
	private ClientAddressForm address;
	
	private String password;
	
	private String healthInsuranceIdentificator;

	public String getHealthInsuranceIdentificator() {
		return healthInsuranceIdentificator;
	}

	public void setHealthInsuranceIdentificator(String healthInsuranceIdentificator) {
		this.healthInsuranceIdentificator = healthInsuranceIdentificator;
	}

	public Object getId() {
		return id;
	}

	public void setId(Object id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCns() {
		return cns;
	}

	public void setCns(String cns) {
		this.cns = cns;
	}

	public String getCpf() {
		return cpf.replaceAll("[\\s()-.]", "");
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getHealthInsuranceNumber() {
		return healthInsuranceNumber;
	}

	public void setHealthInsuranceNumber(String healthInsuranceNumber) {
		this.healthInsuranceNumber = healthInsuranceNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public GenderEnum getGender() {
		return gender;
	}

	public void setGender(GenderEnum gender) {
		this.gender = gender;
	}
	
	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getRgIssuer() {
		return rgIssuer;
	}

	public void setRgIssuer(String rgIssuer) {
		this.rgIssuer = rgIssuer;
	}

	public ClientAddressForm getAddress() {
		return address;
	}

	public void setAddress(ClientAddressForm address) {
		this.address = address;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
