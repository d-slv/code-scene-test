package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;

import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.InsuredType;
import br.com.maidahealth.telemedapi.utils.Utils;

public class InsuredDto {
	
	private Long id;
	
	private String cpf;
	
	private String name;
	
	private String healthInsuranceNumber;

	private InsuredType type;
	
	private String lastPhoneNumber;
	
	private GenderEnum gender;

	private String currentSituation;
	
	private String birthDate;

	public InsuredDto(Insured insured) {
		super();
		this.id = insured.getId();
		this.cpf = insured.getCpf();
		this.name = Utils.convertStringLikePersonName(insured.getName());
		this.healthInsuranceNumber = insured.getHealthInsuranceNumber();
		this.type = insured.getType();
		this.lastPhoneNumber = insured.getLastPhoneNumber();
		this.gender = insured.getGender();
		this.currentSituation = insured.getCurrentSituation().getDescription();
		if(insured.getBirthDate()!=null)
			this.birthDate = Utils.format(insured.getBirthDate(), "yyyy-MM-dd");
	}

	public InsuredDto() {
		super();
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

	public InsuredType getType() {
		return type;
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

	public void setType(InsuredType type) {
		this.type = type;
	}
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLastPhoneNumber() {
		return lastPhoneNumber;
	}

	public void setLastPhoneNumber(String lastPhoneNumber) {
		this.lastPhoneNumber = lastPhoneNumber;
	}

	public String getCurrentSituation() {
		return currentSituation;
	}

	public void setCurrentSituation(String currentSituation) {
		this.currentSituation = currentSituation;
	}

	public static List<InsuredDto> convert(List<Insured> insureds) {
		List<InsuredDto> insuredsDtos = new ArrayList<InsuredDto>();
		insureds.stream().forEach(i-> insuredsDtos.add(convert(i)));
		return insuredsDtos;
	}
	
	public static InsuredDto convert(Insured insured) {
		return new InsuredDto(insured);
	}

	public static Page<InsuredDto> convert(Page<Insured> insureds) {
		return insureds.map(InsuredDto::new);
	}

	public GenderEnum getGender() {
		return gender;
	}

	public void setGender(GenderEnum gender) {
		this.gender = gender;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

}
