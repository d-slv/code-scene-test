package br.com.maidahealth.telemedapi.dto;

import java.text.SimpleDateFormat;

import br.com.maidahealth.telemedapi.models.ProfessionalAvailability;

public class ProfessionalScheduleDto {

	private Long scheduleId;

	private String description;

	public ProfessionalScheduleDto() {
	}

	public ProfessionalScheduleDto(Long scheduleId, ProfessionalAvailability professionalAvailability) {
		this.scheduleId = scheduleId;
		this.description = "" + new SimpleDateFormat("HH:mm").format(professionalAvailability.getBeginHour())
								+ " às " + new SimpleDateFormat("HH:mm").format(professionalAvailability.getEndHour());; 
	}

	public Long getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(Long scheduleId) {
		this.scheduleId = scheduleId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
