package br.com.maidahealth.telemedapi.enums;

public enum VacancyStatus {
	AVAILABLE("Disponível"), // No momento que é criada
	USED("Usada"), // No momento que um atendimento é associado à vaga
	BLOCKED("Bloqueda"), // Quando é feito um bloqueio via administração do sistema
	CANCELED("Cancelada"), // Quando o atendimento usado na vaga é cancelado
	REMOVED("Removida"); // Quando à escala que gerou as vagas é removida
	
	private VacancyStatus(String description) {
		this.description = description;
	}

	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static VacancyStatus getStatusByName(String status) {
		VacancyStatus[] values = VacancyStatus.values();
		for (VacancyStatus vacancyStatus : values) {
			if(vacancyStatus.name().equals(status)) {
				return vacancyStatus;
			}
		}
		
		return null;
	}
}
