package br.com.maidahealth.telemedapi.enums;

import org.springframework.util.StringUtils;

import br.com.maidahealth.telemedapi.exceptions.InvalidException;

public enum GenderEnum {
	MALE("Masculino"),FEMALE("Feminino"),OTHER("Outro");
	
	private String description;

	private GenderEnum(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public static GenderEnum getSexByDescription(String description) {
		if(StringUtils.isEmpty(description)) {
			return null;
		}
		GenderEnum[] types = GenderEnum.values();
		for (int i = 0; i < types.length; i++) {
			if(types[i].getDescription().equalsIgnoreCase(description)) {
				return types[i];
			}
		}
		return null;
	}
	
	public static GenderEnum getGenderByName(String name) {
		if(StringUtils.isEmpty(name)) {
			return null;
		}
		GenderEnum[] types = GenderEnum.values();
		for (int i = 0; i < types.length; i++) {
			if(types[i].name().equalsIgnoreCase(name)) {
				return types[i];
			}
		}
		throw new InvalidException("Gênero informado é inválido");
	}
	
}
