package br.com.maidahealth.telemedapi.form;

import java.util.Date;

import javax.validation.constraints.NotBlank;

import br.com.maidahealth.telemedapi.models.SchedulingType;

public class SelfAttendanceForm {

	@NotBlank(message = "A especialidade deve ser informada")
	private String specialtyId;
	
	@NotBlank(message = "O tipo de consulta deve ser informado")
	private String schedulingType;
	
	private Date date;
	
	@NotBlank(message = "O horário da consulta deve ser informado")
	private String hour;

	private String returnReason;

	private String professionalId;

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

	public String getProfessionalId() {
		return professionalId;
	}

	public void setProfessionalId(String professionalId) {
		this.professionalId = professionalId;
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

}
