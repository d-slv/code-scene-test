package br.com.maidahealth.telemedapi.dto;

import java.text.SimpleDateFormat;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

import br.com.maidahealth.telemedapi.models.ProfessionalAvailability;
import br.com.maidahealth.telemedapi.utils.Utils;

public class ProfessionalAvailabilityDto {
	
	private Long ProfessionalAvailabilityId;

	private Long professionalId;

	private Long specialtyId;

	private String specialtyName;

	private String beginHour;

	private String endHour;

	private String appointmentType;
	
	private String description;

	private List<Integer> daysOfWeek = new ArrayList<>();

	public ProfessionalAvailabilityDto(ProfessionalAvailability professionalAvailability) {
		this.ProfessionalAvailabilityId = professionalAvailability.getId();
		this.professionalId = professionalAvailability.getProfessional().getId();
		this.specialtyId = professionalAvailability.getSpecialty().getId();
		this.specialtyName = professionalAvailability.getSpecialty().getName();
		this.beginHour = new SimpleDateFormat("HH:mm").format(professionalAvailability.getBeginHour());
		this.endHour = new SimpleDateFormat("HH:mm").format(professionalAvailability.getEndHour());
		this.appointmentType = professionalAvailability.getAppointmentType().getDescription();
		this.daysOfWeek = Utils.convertStringToIntList(professionalAvailability.getDaysOfWeek());
		this.description = generateDescription();
	}
	
	private String generateDescription() {
		String desc = this.daysOfWeek.stream().map(day -> Utils.getDayOfWeekPortuguese(day, TextStyle.SHORT))
				.collect(Collectors.joining("/"));
		
		desc += ", " + this.beginHour + "-" + this.endHour;
		return desc;
	}

	public Long getProfessionalAvailabilityId() {
		return ProfessionalAvailabilityId;
	}

	public Long getProfessionalId() {
		return professionalId;
	}

	public Long getSpecialtyId() {
		return specialtyId;
	}

	public String getSpecialtyName() {
		return specialtyName;
	}

	public String getBeginHour() {
		return beginHour;
	}

	public String getEndHour() {
		return endHour;
	}

	public String getAppointmentType() {
		return appointmentType;
	}

	public String getDescription() {
		return description;
	}

	public List<Integer> getDaysOfWeek() {
		return daysOfWeek;
	}
	
	public static Page<ProfessionalAvailabilityDto> convert(Page<ProfessionalAvailability> professionalAvailability) {
		return professionalAvailability.map(ProfessionalAvailabilityDto::new);
	}

}
