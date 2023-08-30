package br.com.maidahealth.telemedapi.models;

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
	
}
