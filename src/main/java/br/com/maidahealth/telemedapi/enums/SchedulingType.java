package br.com.maidahealth.telemedapi.enums;

import br.com.maidahealth.telemedapi.exceptions.InvalidException;

public enum SchedulingType {
	
	FIRST_APPOINTMENT("Primeira Consulta"),
	RETURN_APPOINTMENT("Consulta de Retorno");
	
	
	private SchedulingType(String description) {
		this.description = description;
	}

	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static SchedulingType getTypeByDescription(String name) {
		SchedulingType[] values = SchedulingType.values();
		for (SchedulingType schedulingType : values) {
			if(schedulingType.getDescription().equalsIgnoreCase(name)) {
				return schedulingType;
			}
		}
		
		throw new InvalidException("Motivo informado é inválido");
	}
	
}
