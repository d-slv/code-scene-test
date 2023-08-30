package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.AttendanceType;

public class BookingDto {

	private String clientId;

	private AttendanceType type;

	private Long specialtyId;

	private String professionalId;

	private String schedulingDate;

	private String hour;

	private BookingInsuredDto patient;

	private Long healthAttendanceId;

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public AttendanceType getType() {
		return type;
	}

	public void setType(AttendanceType type) {
		this.type = type;
	}

	public Long getSpecialtyId() {
		return specialtyId;
	}

	public void setSpecialtyId(Long specialtyId) {
		this.specialtyId = specialtyId;
	}

	public String getProfessionalId() {
		return professionalId;
	}

	public void setProfessionalId(String professionalId) {
		this.professionalId = professionalId;
	}

	public String getSchedulingDate() {
		return schedulingDate;
	}

	public void setSchedulingDate(String schedulingDate) {
		this.schedulingDate = schedulingDate;
	}

	public String getHour() {
		return hour;
	}

	public void setHour(String hour) {
		this.hour = hour;
	}

	public BookingInsuredDto getPatient() {
		return patient;
	}

	public void setPatient(BookingInsuredDto patient) {
		this.patient = patient;
	}

	public Long getHealthAttendanceId() {
		return healthAttendanceId;
	}

	public void setHealthAttendanceId(Long healthAttendanceId) {
		this.healthAttendanceId = healthAttendanceId;
	}

	@Override
	public String toString() {
		return "BookingDto [clientId=" + clientId + ", type=" + type + ", specialtyId=" + specialtyId
				+ ", professionalId=" + professionalId + ", schedulingDate=" + schedulingDate + ", hour=" + hour
				+ ", patient=" + patient + ", healthAttendanceId=" + healthAttendanceId + "]";
	}

}
