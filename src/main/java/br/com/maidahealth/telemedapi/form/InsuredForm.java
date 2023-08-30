package br.com.maidahealth.telemedapi.form;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.InsuredType;

public class InsuredForm {

	@NotBlank(message = "cpf não pode ser vazio")
	private String cpf;

	@NotBlank(message = "nome não pode ser vazio")
	private String name;
	
	@NotBlank(message = "cartão não pode ser vazio")
	private String healthInsuranceNumber;

	private Long holderId;
	
	@NotBlank(message = "email não pode ser vazio")
	private String email;
	
	@NotNull(message = "Data de nascimento é obrigatória")
	private Date birthdate;
	
	private InsuredType type;

	public InsuredForm() {
		super();
	}

	public InsuredForm(String cpf, String name, String healthInsuranceNumber, InsuredType type, Long holderId) {
		super();
		this.cpf = cpf;
		this.name = name;
		this.healthInsuranceNumber = healthInsuranceNumber;
		this.holderId = holderId;
	}

	public String getCpf() {
		return cpf.replaceAll("[\\s()-.]", "");
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getHealthInsuranceNumber() {
		return healthInsuranceNumber;
	}

	public void setHealthInsuranceNumber(String healthInsuranceNumber) {
		this.healthInsuranceNumber = healthInsuranceNumber;
	}

	public Long getHolderId() {
		return holderId;
	}

	public void setHolderId(Long holderId) {
		this.holderId = holderId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public InsuredType getType() {
		return type;
	}

	public void setType(InsuredType type) {
		this.type = type;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public Insured toInsured() {
		return new Insured(getCpf(), name, healthInsuranceNumber, type, null, birthdate);
	}

}
