package br.com.maidahealth.telemedapi.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.maidahealth.telemedapi.enums.ProfessionalAvailabilityStatus;
import br.com.maidahealth.telemedapi.utils.Utils;

@Entity
public class ProfessionalAvailability {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "professional_id")
	private Professional professional;

	@ManyToOne
	@JoinColumn(name = "specialty_id")
	private Specialty specialty;

	@Temporal(TemporalType.TIME)
	private Date beginHour;

	@Temporal(TemporalType.TIME)
	private Date endHour;

	@Enumerated(EnumType.STRING)
	private SchedulingType appointmentType;

	@Enumerated(EnumType.STRING)
	private ProfessionalAvailabilityStatus status = ProfessionalAvailabilityStatus.ACTIVE;

	private String daysOfWeek;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "professionalAvailability")
	private List<Schedule> schedules = new ArrayList<>();
	
	public ProfessionalAvailability() {
	}

	public ProfessionalAvailability(Professional professional, Specialty specialty, Date beginHourDate, Date endHourDate, 
			SchedulingType schedulingType, String daysOfWeek) {
		super();
		this.professional = professional;
		this.specialty = specialty;
		this.beginHour = beginHourDate;
		this.endHour = endHourDate;
		this.appointmentType = schedulingType;
		this.daysOfWeek = daysOfWeek;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Professional getProfessional() {
		return professional;
	}

	public void setProfessional(Professional professional) {
		this.professional = professional;
	}

	public Specialty getSpecialty() {
		return specialty;
	}

	public void setSpecialty(Specialty specialty) {
		this.specialty = specialty;
	}

	public Date getBeginHourFakeDate() {
		return Utils.parse(beginHour.toString(), "HH:mm:ss");
	}

	public Date getBeginHour() {
		return beginHour;
	}

	public void setBeginHour(Date beginHour) {
		this.beginHour = beginHour;
	}

	public Date getEndHourFakeDate() {
		return Utils.parse(endHour.toString(), "HH:mm:ss");
	}
	
	public Date getEndHour() {
		return endHour;
	}

	public void setEndHour(Date endHour) {
		this.endHour = endHour;
	}

	public SchedulingType getAppointmentType() {
		return appointmentType;
	}

	public void setAppointmentType(SchedulingType appointmentType) {
		this.appointmentType = appointmentType;
	}

	public ProfessionalAvailabilityStatus getStatus() {
		return status;
	}

	public void setStatus(ProfessionalAvailabilityStatus status) {
		this.status = status;
	}

	public String getDaysOfWeek() {
		return daysOfWeek;
	}

	public void setDaysOfWeek(String daysOfWeek) {
		this.daysOfWeek = daysOfWeek;
	}

	public List<Schedule> getSchedules() {
		return schedules;
	}
	
}
