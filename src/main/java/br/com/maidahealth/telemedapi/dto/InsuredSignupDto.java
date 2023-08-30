package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.utils.Utils;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class InsuredSignupDto {

	private String name;

	private Date birthDate;

	private GenderEnum gender;

	private String cpf;

	private ClientAddressDto address;

	private Object holderId;

	private String healthInsuranceNumber;

	private String phoneNumber;

	private String email;

	public InsuredSignupDto() {
	}

	public InsuredSignupDto(Insured insured) {
		this.name = Utils.convertStringLikePersonName(insured.getName());
		this.birthDate = insured.getBirthDate();
		this.cpf = insured.getCpf();
		this.healthInsuranceNumber = insured.getHealthInsuranceNumber();
		this.phoneNumber = insured.getLastPhoneNumber();
	}

	public InsuredSignupDto(ClientInsuredDto insuredDto) {
		this.name = Utils.convertStringLikePersonName(insuredDto.getName());
		this.birthDate = insuredDto.getBirthdate();
		this.gender = insuredDto.getGender();
		this.cpf = insuredDto.getCpf();
		this.address = insuredDto.getAddress();
		this.healthInsuranceNumber = insuredDto.getHealthInsuranceNumber();
		this.phoneNumber = insuredDto.getDdd().concat(insuredDto.getPhoneNumber());
		this.email = insuredDto.getEmail();
	}

	public String getCpf() {
		return cpf;
	}

	public String getName() {
		return name;
	}

	public String getHealthInsuranceNumber() {
		return healthInsuranceNumber;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setHealthInsuranceNumber(String healthInsuranceNumber) {
		this.healthInsuranceNumber = healthInsuranceNumber;
	}

	public synchronized String getPhoneNumber() {
		return phoneNumber;
	}

	public synchronized void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public GenderEnum getGender() {
		return gender;
	}

	public void setGender(GenderEnum gender) {
		this.gender = gender;
	}

	public ClientAddressDto getAddress() {
		return address;
	}

	public void setAddress(ClientAddressDto address) {
		this.address = address;
	}

	public Object getHolderId() {
		return holderId;
	}

	public void setHolderId(Object holderId) {
		this.holderId = holderId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public static List<InsuredSignupDto> convert(List<Insured> insureds) {
		List<InsuredSignupDto> insuredsDtos = new ArrayList<>();
		insureds.forEach(i-> insuredsDtos.add(convert(i)));
		return insuredsDtos;
	}
	
	public static InsuredSignupDto convert(Insured insured) {
		return new InsuredSignupDto(insured);
	}

	public static InsuredSignupDto convert(ClientInsuredDto insuredDto) {
		return new InsuredSignupDto(insuredDto);
	}

	public static Page<InsuredSignupDto> convert(Page<Insured> insureds) {
		return insureds.map(InsuredSignupDto::new);
	}

}
