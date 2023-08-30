package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import br.com.maidahealth.telemedapi.utils.Utils;
import org.springframework.util.CollectionUtils;

import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Specialty;

public class SpecialtyDto {
	
	private Long id;
	
	private String name;
	
	private String code;
	
	private Double urgencyValue;
	
	private Double electiveValue;

	private Boolean availableForUrgency;
	
	private Boolean availableForElective;

	public SpecialtyDto() {
		super();
	}

	public SpecialtyDto(Specialty specialty, List<String> professionals) {
		this(specialty);
	}

	public SpecialtyDto(Specialty specialty) {
		this.name = Utils.convertStringLikePersonName(specialty.getName());
		this.code = specialty.getCode();
		this.id = specialty.getId();
		this.urgencyValue = Optional.ofNullable(specialty.getCurrentUrgencyValue()).orElseGet(() -> 0.00);
		this.electiveValue = Optional.ofNullable(specialty.getCurrentElectiveValue()).orElseGet(() -> 0.00);
		this.availableForElective = Optional.ofNullable(specialty.isAvailableForElective()).orElseGet(() -> Boolean.FALSE);
		this.availableForUrgency = Optional.ofNullable(specialty.isAvailableForUrgency()).orElseGet(() -> Boolean.FALSE);		
	}

	public String getName() {
		return name;
	}

	public String getCode() {
		return code;
	}

	public static List<SpecialtyDto> convert(List<Specialty> specialties) {
		List<SpecialtyDto> specialtiesDtos = new ArrayList<SpecialtyDto>();
		if(!CollectionUtils.isEmpty(specialties)) {
			specialties.stream().forEach(p-> specialtiesDtos.add(convert(p)));
		}
		return specialtiesDtos;
	}
	
	public static SpecialtyDto convert(Specialty specialty) {
		Set<Professional> professionals = specialty.getProfessionals();
		List<String> professionalsDto = new ArrayList<String>();
		if(!CollectionUtils.isEmpty(professionals)) {
			professionalsDto = professionals.stream().map(Professional::getName).collect(Collectors.toList());
		}
		
		return new SpecialtyDto(specialty, professionalsDto);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Double getUrgencyValue() {
		return urgencyValue;
	}

	public void setUrgencyValue(Double urgencyValue) {
		this.urgencyValue = urgencyValue;
	}

	public Boolean getAvailableForUrgency() {
		return availableForUrgency;
	}

	public void setAvailableForUrgency(Boolean availableForUrgency) {
		this.availableForUrgency = availableForUrgency;
	}

	public Boolean getAvailableForElective() {
		return availableForElective;
	}

	public void setAvailableForElective(Boolean availableForElective) {
		this.availableForElective = availableForElective;
	}

	public Double getElectiveValue() {
		return electiveValue;
	}

	public void setElectiveValue(Double electiveValue) {
		this.electiveValue = electiveValue;
	}

}
