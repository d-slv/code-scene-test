package br.com.maidahealth.telemedapi.enums;

import java.util.Arrays;
import java.util.List;

public enum CancellingAttendanceReasonEnum {
	
	CANCELED_BY_INSURED("Cancelado pelo paciente."), 
	CANCELED_BY_PROFESSIONAL("Cancelado pelo profissional"), 
	NO_SHOW("Paciente não compareceu"),
	CANCELLATION_REQUESTED_BY_INSURED("Cancelamento solicitado pelo paciente"),
	CANCELLATION_REQUESTED_BY_PROFESSIONAL("Cancelamento solicitado pelo profissional"),
	CANCELED_BY_CLIENT("Cancelado pelo cliente"),
	CANCELED_BY_MEDIA_ERROR("Cancelado por problema de mídia"),
	CANCELED_BY_FINISH_ERROR("Cancelado por falta de encerramento pelo profissional"),
	CANCELED_BY_PROFESSIONAL_AVAILABILITY("Cancelamento da vaga pelo profissional");
	
	private CancellingAttendanceReasonEnum(String description) {
		this.description = description;
	}

	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public static List<CancellingAttendanceReasonEnum> getReasons() {
		return Arrays.asList(CANCELLATION_REQUESTED_BY_INSURED, CANCELLATION_REQUESTED_BY_PROFESSIONAL);
	}
}
