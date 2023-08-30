package br.com.maidahealth.telemedapi.form;

import java.util.Objects;

import javax.validation.constraints.NotEmpty;

public class AirmedWebhookForm {
	@NotEmpty(message = "objectId não pode ser vazio")
	private String objectId;

	@NotEmpty(message = "eventType não pode ser vazio")
	private String eventType;
	
	@NotEmpty(message = "cpf não pode ser vazio")
	private String cpf;
	
	//@NotNull(message = "hasExam não pode ser vazio")
	private boolean examRequested;
	
	//@NotNull(message = "hasMedical não pode ser vazio")
	private boolean medicinePrescribed;
	
	//@NotNull(message = "hasReport não pode ser vazio")
	private boolean reportGenerated;

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public boolean hasExamRequested() {
		return examRequested;
	}

	public void setExamRequested(boolean examRequested) {
		this.examRequested = examRequested;
	}

	public boolean hasMedicinePrescribed() {
		return medicinePrescribed;
	}

	public void setMedicinePrescribed(boolean medicinePrescribed) {
		this.medicinePrescribed = medicinePrescribed;
	}

	public boolean hasReportGenerated() {
		return reportGenerated;
	}

	public void setReportGenerated(boolean reportGenerated) {
		this.reportGenerated = reportGenerated;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof AirmedWebhookForm))
			return false;

		AirmedWebhookForm that = (AirmedWebhookForm) o;

		return Objects.equals(objectId, that.objectId);
	}

	@Override
	public int hashCode() {
		return objectId != null ? objectId.hashCode() : 0;
	}
	
}
