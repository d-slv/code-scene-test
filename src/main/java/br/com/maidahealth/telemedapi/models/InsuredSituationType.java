package br.com.maidahealth.telemedapi.models;

public enum InsuredSituationType {

	ACTIVE("Ativo"),
	CANCELED("Cancelado"),
    WAITING_ACTIVATION("Aguardando ativação");

	private InsuredSituationType(String description) {
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
