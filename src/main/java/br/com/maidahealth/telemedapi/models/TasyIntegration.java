package br.com.maidahealth.telemedapi.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.databind.JsonNode;

import br.com.maidahealth.telemedapi.dto.BookingDto;

@Entity
public class TasyIntegration {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String clientId;

	private String type;

	private Long specialtyId;

	private Long healthAttendanceId;

	private String professionalId;

	private String schedulingDate;

	private String hour;
	
	@Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

	private boolean resolved;

	@Column(length = 10485760)
	private String error;

	@Column(length = 10485760)
	private String bookingRequest;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getSpecialtyId() {
		return specialtyId;
	}

	public void setSpecialtyId(Long specialtyId) {
		this.specialtyId = specialtyId;
	}

	public Long getHealthAttendanceId() {
		return healthAttendanceId;
	}

	public void setHealthAttendanceId(Long healthAttendanceId) {
		this.healthAttendanceId = healthAttendanceId;
	}

	public String getProfessionalId() {
		return professionalId;
	}

	public void setProfessionalId(String professionalId) {
		this.professionalId = professionalId;
	}

	public String getSchedulingDate() {
		return schedulingDate;
	}

	public void setSchedulingDate(String schedulingDate) {
		this.schedulingDate = schedulingDate;
	}

	public String getHour() {
		return hour;
	}

	public void setHour(String hour) {
		this.hour = hour;
	}

	public boolean isResolved() {
		return resolved;
	}

	public void setResolved(boolean resolved) {
		this.resolved = resolved;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getBookingRequest() {
		return bookingRequest;
	}

	public void setBookingRequest(String bookingRequest) {
		this.bookingRequest = bookingRequest;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	

}
