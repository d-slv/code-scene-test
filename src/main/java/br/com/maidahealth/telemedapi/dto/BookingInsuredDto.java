package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.enums.GenderEnum;

public class BookingInsuredDto {

	private String name;

	private String cpf;

	private String healthInsuranceNumber;

	private String lastPhoneNumber;

	private GenderEnum gender;

	private String birthdate;

	private String email;

	private Long registrationNumber;

	private String registrationNumberIssuer;

	private String motherName;

	private AddressDto address;

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

	public String getHealthInsuranceNumber() {
		return healthInsuranceNumber;
	}

	public void setHealthInsuranceNumber(String healthInsuranceNumber) {
		this.healthInsuranceNumber = healthInsuranceNumber;
	}

	public String getLastPhoneNumber() {
		return lastPhoneNumber;
	}

	public void setLastPhoneNumber(String lastPhoneNumber) {
		this.lastPhoneNumber = lastPhoneNumber;
	}

	public GenderEnum getGender() {
		return gender;
	}

	public void setGender(GenderEnum gender) {
		this.gender = gender;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getRegistrationNumber() {
		return registrationNumber;
	}

	public void setRegistrationNumber(Long registrationNumber) {
		this.registrationNumber = registrationNumber;
	}

	public String getRegistrationNumberIssuer() {
		return registrationNumberIssuer;
	}

	public void setRegistrationNumberIssuer(String registrationNumberIssuer) {
		this.registrationNumberIssuer = registrationNumberIssuer;
	}

	public String getMotherName() {
		return motherName;
	}

	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}

	public AddressDto getAddress() {
		return address;
	}

	public void setAddress(AddressDto address) {
		this.address = address;
	}

}