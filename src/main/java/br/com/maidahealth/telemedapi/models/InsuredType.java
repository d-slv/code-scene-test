package br.com.maidahealth.telemedapi.models;

public enum InsuredType {

	HOLDER("Titular"),
	DEPENDENT("Dependente"),
	PUBLIC_EMPLOYEE("Servidor");
	
	private InsuredType(String description) {
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
