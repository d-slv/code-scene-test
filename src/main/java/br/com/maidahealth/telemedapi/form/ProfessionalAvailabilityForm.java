package br.com.maidahealth.telemedapi.form;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.ProfessionalAvailability;
import br.com.maidahealth.telemedapi.models.SchedulingType;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.utils.Utils;

public class ProfessionalAvailabilityForm {

	private Long professionalId;

	@NotNull(message = "A Especialidade deve ser informada")
	private Long specialtyId;

	@NotBlank(message = "O horário do início deve ser informado")
	private String beginHour;

	@NotBlank(message = "O horário do fim deve ser informado")
	private String endHour;

	@NotBlank(message = "O tipo de consulta deve ser informado")
	private String appointmentType;

	@NotNull(message = "Os dias da semana devem ser informados")
	private List<Integer> daysOfWeek = new ArrayList<>();
	
	public ProfessionalAvailabilityForm() {
	}

	public ProfessionalAvailabilityForm(Long professionalId, Long specialtyId, String beginHour, String endHour,
			String appointmentType, List<Integer> daysOfWeek) {
		this.professionalId = professionalId;
		this.specialtyId = specialtyId;
		this.beginHour = beginHour;
		this.endHour = endHour;
		this.appointmentType = appointmentType;
		this.daysOfWeek = daysOfWeek;
	}

	public Long getProfessionalId() {
		return professionalId;
	}

	public void setProfessionalId(Long professionalId) {
		this.professionalId = professionalId;
	}

	public Long getSpecialtyId() {
		return specialtyId;
	}

	public void setSpecialtyId(Long specialtyId) {
		this.specialtyId = specialtyId;
	}

	public String getBeginHour() {
		return beginHour;
	}

	public void setBeginHour(String beginHour) {
		this.beginHour = beginHour;
	}

	public String getEndHour() {
		return endHour;
	}

	public void setEndHour(String endHour) {
		this.endHour = endHour;
	}

	public String getAppointmentType() {
		return appointmentType;
	}

	public void setAppointmentType(String appointmentType) {
		this.appointmentType = appointmentType;
	}

	public List<Integer> getDaysOfWeek() {
		return daysOfWeek;
	}

	public void setDaysOfWeek(List<Integer> daysOfWeek) {
		this.daysOfWeek = daysOfWeek;
	}
	
	public Date getBeginHourDate() {
		return Utils.parse(beginHour, "HH:mm");
	}
	
	public Date getEndHourDate() {
		return Utils.parse(endHour, "HH:mm");
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((appointmentType == null) ? 0 : appointmentType.hashCode());
		result = prime * result + ((beginHour == null) ? 0 : beginHour.hashCode());
		result = prime * result + ((daysOfWeek == null) ? 0 : daysOfWeek.hashCode());
		result = prime * result + ((endHour == null) ? 0 : endHour.hashCode());
		result = prime * result + ((professionalId == null) ? 0 : professionalId.hashCode());
		result = prime * result + ((specialtyId == null) ? 0 : specialtyId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProfessionalAvailabilityForm other = (ProfessionalAvailabilityForm) obj;
		if (appointmentType == null) {
			if (other.appointmentType != null)
				return false;
		} else if (!appointmentType.equals(other.appointmentType))
			return false;
		if (beginHour == null) {
			if (other.beginHour != null)
				return false;
		} else if (!beginHour.equals(other.beginHour))
			return false;
		if (daysOfWeek == null) {
			if (other.daysOfWeek != null)
				return false;
		} else if (!daysOfWeek.equals(other.daysOfWeek))
			return false;
		if (endHour == null) {
			if (other.endHour != null)
				return false;
		} else if (!endHour.equals(other.endHour))
			return false;
		if (professionalId == null) {
			if (other.professionalId != null)
				return false;
		} else if (!professionalId.equals(other.professionalId))
			return false;
		if (specialtyId == null) {
			if (other.specialtyId != null)
				return false;
		} else if (!specialtyId.equals(other.specialtyId))
			return false;
		return true;
	}

	public SchedulingType getSchedulingTypeEnum() {
		SchedulingType[] values = SchedulingType.values();
		for (SchedulingType schedulingType : values) {
			if(this.appointmentType.toUpperCase().equals(schedulingType.getDescription().toUpperCase())) {
				return schedulingType;
			}
		}
		return null;
	}

	public ProfessionalAvailability convert(Professional professional, Specialty specialty) {
		ProfessionalAvailability professionalAvailability = new ProfessionalAvailability(professional, specialty, this.getBeginHourDate(), this.getEndHourDate(), this.getSchedulingTypeEnum(), Utils.convertIntListToString(daysOfWeek));
		return professionalAvailability;
	}

	public static ProfessionalAvailabilityForm toForm(ProfessionalAvailability professionalAvailability) {
		return new ProfessionalAvailabilityForm(professionalAvailability.getProfessional().getId(), professionalAvailability.getSpecialty().getId(), 
				new SimpleDateFormat("HH:mm").format(professionalAvailability.getBeginHour()), new SimpleDateFormat("HH:mm").format(professionalAvailability.getEndHour()), 
				professionalAvailability.getAppointmentType().getDescription(), Utils.convertStringToIntList(professionalAvailability.getDaysOfWeek()));
	}

}
