package br.com.maidahealth.telemedapi.models;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.maidahealth.telemedapi.enums.ScheduleStatus;

@Entity
public class Schedule {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Temporal(TemporalType.DATE)
	private Date date;

	@ManyToOne
	@JoinColumn(name = "professional_id")
	private Professional professional;
	
	@OneToOne
	@JoinColumn(name = "specialty_id")
	private Specialty specialty;

	@OneToMany(mappedBy = "schedule", cascade = CascadeType.PERSIST)
	private Set<Timetable> timetables;
	
	@Enumerated(EnumType.STRING)
	private SchedulingType schedulingType;

	@Enumerated(EnumType.STRING)
	private ScheduleStatus status;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;
	
	@OneToMany(mappedBy = "schedule", cascade = CascadeType.PERSIST)
	private Set<Vacancy> vacancies;
	
	@ManyToOne
	@JoinColumn(name = "professional_availability_id")
	private ProfessionalAvailability professionalAvailability;
	
	private String description;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
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

	public SchedulingType getSchedulingType() {
		return schedulingType;
	}

	public void setSchedulingType(SchedulingType schedulingType) {
		this.schedulingType = schedulingType;
	}

	public ScheduleStatus getScheduleStatus() {
		return status;
	}

	public void setScheduleStatus(ScheduleStatus scheduleStatus) {
		this.status = scheduleStatus;
	}

	public Set<Timetable> getTimetables() {
		return timetables;
	}

	public void setTimetables(Set<Timetable> timetables) {
		this.timetables = timetables;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Set<Vacancy> getVacancies() {
		return vacancies;
	}

	public void setVacancies(Set<Vacancy> vacancies) {
		this.vacancies = vacancies;
	}

	@PrePersist
	void setDataOnCreate() {
		this.createdAt = new Date();
	}

	public ProfessionalAvailability getProfessionalAvailability() {
		return professionalAvailability;
	}

	public void setProfessionalAvailability(ProfessionalAvailability professionalAvailability) {
		this.professionalAvailability = professionalAvailability;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
