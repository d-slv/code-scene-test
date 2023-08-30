package br.com.maidahealth.telemedapi.form;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.maidahealth.telemedapi.models.AttendanceType;

public class ClientAttendanceForm {

	@NotNull(message = "O id do paciente deve ser informado")
	private Long patientId;

	@NotBlank(message = "O telefone de contato deve ser informado")
	private String phoneNumber;

	private Long specialtyId;

	@NotNull(message = "O tipo de atendimento deve ser informado")
	private AttendanceType type;

	private Long professionalId;

	private Date schedulingDate;

	private String hour;

	private String chatbotId;

	private String urlReturn;
	
	private String healthInsuranceIdentificator;

	private Long healthAttendenceId;

	
	public Long getHealthAttendanceId() {
		return healthAttendenceId;
	}

	public void setHealthAttendanceId(Long healthAttendenceId) {
		this.healthAttendenceId = healthAttendenceId;
	}


	public String getHealthInsuranceIdentificator() {
		return healthInsuranceIdentificator;
	}

	public void setHealthInsuranceIdentificator(String healthInsuranceIdentificator) {
		this.healthInsuranceIdentificator = healthInsuranceIdentificator;
	}

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Long getSpecialtyId() {
		return specialtyId;
	}

	public void setSpecialtyId(Long specialtyId) {
		this.specialtyId = specialtyId;
	}

	public AttendanceType getType() {
		return type;
	}

	public void setType(AttendanceType type) {
		this.type = type;
	}

	public Long getProfessionalId() {
		return professionalId;
	}

	public void setProfessionalId(Long professionalId) {
		this.professionalId = professionalId;
	}

	public Date getSchedulingDate() {
		return schedulingDate;
	}

	public void setSchedulingDate(Date schedulingDate) {
		this.schedulingDate = schedulingDate;
	}

	public String getHour() {
		return hour;
	}

	public void setHour(String hour) {
		this.hour = hour;
	}

	public String getUrlReturn() {
		return urlReturn;
	}

	public void setUrlReturn(String urlReturn) {
		this.urlReturn = urlReturn;
	}

	public String getChatbotId() {
		return chatbotId;
	}

	public void setChatbotId(String chatbotId) {
		this.chatbotId = chatbotId;
	}
}
