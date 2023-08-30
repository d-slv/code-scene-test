package br.com.maidahealth.telemedapi.form;

import java.util.Date;
import javax.validation.constraints.NotBlank;
import br.com.maidahealth.telemedapi.models.SchedulingType;

public class AttendanceForm {

	@NotBlank(message = "Deve ser informado o segurado da consulta")
	private String insuredId;
	
	@NotBlank(message = "O telefone do segurado deve sr informado")
	private String phoneNumber;
	
	@NotBlank(message = "O prestador da consulta deve ser informado")
	private String providerId;
	
	@NotBlank(message = "O médico da consulta deve ser informado")
	private String professionalId;
	
	@NotBlank(message = "A especialidade deve ser informada")
	private String specialtyId;
	
	@NotBlank(message = "O tipo de consulta deve ser informado")
	private String schedulingType;

	private String returnReason;
	
	private Date date;
	
	@NotBlank(message = "O horário da consulta deve ser informado")
	private String hour;

	private String chatbotId;

	public String getPhoneNumber() {
		return phoneNumber.replaceAll("[\\s()-]", "");
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getHour() {
		return hour;
	}

	public void setHour(String hour) {
		this.hour = hour;
	}

	public String getSchedulingType() {
		return schedulingType;
	}

	public void setSchedulingType(String schedulingType) {
		this.schedulingType = schedulingType;
	}
	
	public String getInsuredId() {
		return insuredId;
	}

	public void setInsuredId(String insuredId) {
		this.insuredId = insuredId;
	}

	public String getProviderId() {
		return providerId;
	}

	public void setProviderId(String providerId) {
		this.providerId = providerId;
	}

	public String getProfessionalId() {
		return professionalId;
	}

	public void setProfessionalId(String professionalId) {
		this.professionalId = professionalId;
	}

	public String getSpecialtyId() {
		return specialtyId;
	}

	public void setSpecialtyId(String specialtyId) {
		this.specialtyId = specialtyId;
	}

	public String getReturnReason() {
		return returnReason;
	}

	public void setReturnReason(String returnReason) {
		this.returnReason = returnReason;
	}

	public SchedulingType getSchedulingTypeEnum() {
		SchedulingType[] values = SchedulingType.values();
		for (SchedulingType schedulingType : values) {
			if(this.schedulingType.toUpperCase().equals(schedulingType.getDescription().toUpperCase())) {
				return schedulingType;
			}
		}
		return null;
	}

	public String getChatbotId() {
		return chatbotId;
	}

	public void setChatbotId(String chatbotId) {
		this.chatbotId = chatbotId;
	}
}
