package br.com.maidahealth.telemedapi.enums;

public enum EventType {

	APPOINTMENT_CREATED("Consulta criada."),
	APPOINTMENT_CANCELED("Consulta cancelada."),
	PROFESSIONAL_WAITING("Profissional aguardando na sala virtual."),
	APPOINTMENT_FINISHED("Consulta finalizada."),
	NO_SHOW("Paciente não compareceu à consulta"),
	APPOINTMENT_CANCELED_BY_MEDIA_ERROR("Consulta cancelada devido a erro na mídia"),
	APPOINTMENT_CANCELED_BY_OTHER_REASON("Consulta cancelada por outros motivos"),
	DOCUMENT_CREATED("Documento criado"),
	APPOINTMENT_CANCELED_BY_AUDIO_OR_VIDEO_ERROR("Consulta cancelada por erro de áudio ou vídeo"),
	CANCELED_BY_OFFLINE_STATUS("Consulta cancelada por status do paciente offline") ;
    private String description;

	private EventType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
