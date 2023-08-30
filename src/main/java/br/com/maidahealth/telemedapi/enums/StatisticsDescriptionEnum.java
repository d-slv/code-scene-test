package br.com.maidahealth.telemedapi.enums;

public enum StatisticsDescriptionEnum {

	TEMPO_MEDIA_ATENDIMENTO("TMA"), QUANTIDADE_PROFISSIONAIS_ATENDENDO("QPO");

	private final String description;

	StatisticsDescriptionEnum(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}
}
