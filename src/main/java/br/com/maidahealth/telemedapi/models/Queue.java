package br.com.maidahealth.telemedapi.models;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Queue implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;
	
	@OneToMany(fetch = FetchType.LAZY)
	@JoinTable(
			  name = "attendance_queue", 
			  joinColumns = @JoinColumn(name = "attendance_id"), 
			  inverseJoinColumns = @JoinColumn(name = "queue_id"))
	private Set<Attendance> attendances;

	public Long getId() {
		return id;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public Set<Attendance> getAttendances() {
		return attendances;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public void setAttendances(Set<Attendance> attendances) {
		this.attendances = attendances;
	}
	
	
}
