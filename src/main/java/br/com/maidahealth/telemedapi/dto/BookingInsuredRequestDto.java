package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.enums.GenderEnum;

public class BookingInsuredRequestDto {
    private String name;
    private String cpf;
    private String healthInsuranceNumber;
    private String email;
    private String birthdate;
    private String phoneNumber;
    private GenderEnum gender;
    private String registrationNumber;
    private String registrationNumberIssuer;
    private String healthInsuranceIdentificator;
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
	public String getRegistrationNumber() {
		return registrationNumber;
	}
	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}
	public String getRegistrationNumberIssuer() {
		return registrationNumberIssuer;
	}
	public void setRegistrationNumberIssuer(String registrationNumberIssuer) {
		this.registrationNumberIssuer = registrationNumberIssuer;
	}
	public String getHealthInsuranceIdentificator() {
		return healthInsuranceIdentificator;
	}
	public void setHealthInsuranceIdentificator(String healthInsuranceIdentificator) {
		this.healthInsuranceIdentificator = healthInsuranceIdentificator;
	}
	public AddressDto getAddress() {
		return address;
	}
	public void setAddress(AddressDto address) {
		this.address = address;
	}
    
    

    
}
