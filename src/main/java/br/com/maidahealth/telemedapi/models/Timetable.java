package br.com.maidahealth.telemedapi.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Timetable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Temporal(TemporalType.TIME)
	private Date beginHour;

	@Temporal(TemporalType.TIME)
	private Date endHour;
	
	@ManyToOne
	@JoinColumn(name = "schedule_id")
	private Schedule schedule;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getBegin() {
		return beginHour;
	}

	public void setBegin(Date beginHour) {
		this.beginHour = beginHour;
	}

	public Date getEnd() {
		return endHour;
	}

	public void setEnd(Date endHour) {
		this.endHour = endHour;
	}

	public Schedule getSchedule() {
		return schedule;
	}

	public void setSchedule(Schedule schedule) {
		this.schedule = schedule;
	}

}
