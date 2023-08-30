package br.com.maidahealth.telemedapi.form;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.maidahealth.telemedapi.enums.GenderEnum;

public class InsuredUpdateForm {

	private String name;

	private String birthdate;

	@NotNull(message = "Obrigatorio informar o sexo")
	@Enumerated(EnumType.STRING)
	private GenderEnum gender;

	@NotNull(message = "Obrigatório informar o CPF")
	private String cpf;

	private String rg;

	private String rgIssuer;

	@Valid
	@NotNull(message = "Endereço não pode ser vazio")
	private ClientAddressForm address;

	private String healthInsuranceNumber;

	private String email;
	
	@NotBlank(message = "Telefone é obrigatório")
	private String phoneNumber;

	public InsuredUpdateForm() {
		super();
	}

	public InsuredUpdateForm(String name, String birthdate, GenderEnum gender,  String cpf,String rg, String rgIssuer, ClientAddressForm address, String email) {
		this.name = name;
		this.birthdate = birthdate;
		this.gender = gender;
		this.cpf = cpf;
		this.rg = rg;
		this.rgIssuer = rgIssuer;
		this.address = address;
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	public GenderEnum getGender() {
		return gender;
	}

	public void setGender(GenderEnum gender) {
		this.gender = gender;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
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

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
}
