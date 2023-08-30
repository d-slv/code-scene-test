package br.com.maidahealth.telemedapi.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.maidahealth.telemedapi.enums.VacancyStatus;

@Entity
public class Vacancy {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateVacancy;
	
	@Enumerated(EnumType.STRING)
	private VacancyStatus status;

	@ManyToOne
	@JoinColumn(name = "attendance_id")
	private Attendance attendance;

	@ManyToOne
	@JoinColumn(name = "schedule_id")
	private Schedule schedule;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	private Date cancellationDate;

	@ManyToOne
	@JoinColumn(name = "professional_id")
	private Professional professional;
	
	@OneToOne
	@JoinColumn(name = "specialty_id")
	private Specialty specialty;

	@Enumerated(EnumType.STRING)
	private SchedulingType schedulingType;
	
	private String cancellingReason;

	public Vacancy() {
		super();
		this.status = VacancyStatus.AVAILABLE;
	}
	public Vacancy(Date data, Schedule schedule) {
		this();
		this.dateVacancy = data;
		this.schedule = schedule;
		this.specialty = schedule.getSpecialty();
		this.professional = schedule.getProfessional();
		this.schedulingType = schedule.getSchedulingType();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Schedule getSchedule() {
		return schedule;
	}

	public void setSchedule(Schedule schedule) {
		this.schedule = schedule;
	}

	public Date getDateVacancy() {
		return dateVacancy;
	}

	public void setDateVacancy(Date date) {
		this.dateVacancy = date;
	}

	@PrePersist
	void setDataOnCreate() {
		this.createdAt = new Date();
	}

	public VacancyStatus getStatus() {
		return status;
	}

	public void setStatus(VacancyStatus status) {
		this.status = status;
	}

	public Attendance getAttendance() {
		return attendance;
	}

	public void setAttendance(Attendance attendance) {
		this.attendance = attendance;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getCancellationDate() {
		return cancellationDate;
	}

	public void setCancellationDate(Date cancellationDate) {
		this.cancellationDate = cancellationDate;
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
	public String getCancellingReason() {
		return cancellingReason;
	}
	public void setCancellingReason(String cancellingReason) {
		this.cancellingReason = cancellingReason;
	}
	
}
