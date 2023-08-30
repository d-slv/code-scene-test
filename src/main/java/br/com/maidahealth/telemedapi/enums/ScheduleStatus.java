package br.com.maidahealth.telemedapi.enums;

public enum ScheduleStatus {
	CREATED("Criada"), // No momento que é criada
	GENERATED("Usada"), // No momento que as vagas são geradas
	BLOCKED("Bloqueda"), // Quando é feito um bloqueio via administração do sistema
	REMOVED("Removida"); // Quando é removida via remoção de escala médica
	
	private ScheduleStatus(String description) {
		this.description = description;
	}

	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static ScheduleStatus getStatusByName(String status) {
		ScheduleStatus[] values = ScheduleStatus.values();
		for (ScheduleStatus scheduleStatus : values) {
			if(scheduleStatus.name().equals(status)) {
				return scheduleStatus;
			}
		}
		
		return null;
	}
}
