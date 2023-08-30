package br.com.maidahealth.telemedapi.enums;

public enum ProfessionalAvailabilityStatus {
	
	ACTIVE("Ativa"),
	REMOVED("Removida");

	private String description;

	ProfessionalAvailabilityStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
}
