package br.com.maidahealth.telemedapi.models;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class SpecialtyHistoryPrice implements Serializable {
	
	private static final long serialVersionUID = 5649695435189136395L;

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(precision = 10, scale = 2)
	private BigDecimal currentValue;

	@Column(precision = 10, scale = 2)
	private BigDecimal previousValue;
	
	@ManyToOne(optional = false)
	private User user;
	
	@ManyToOne(optional = false)
    private Specialty specialty;

	@Enumerated(EnumType.STRING)
	private AttendanceType type;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	private Date createdAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getCurrentValue() {
		return currentValue;
	}

	public void setCurrentValue(BigDecimal currentValue) {
		this.currentValue = currentValue;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Specialty getSpecialty() {
		return specialty;
	}

	public void setSpecialty(Specialty specialty) {
		this.specialty = specialty;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public AttendanceType getType() {
		return type;
	}

	public void setType(AttendanceType type) {
		this.type = type;
	}

	public BigDecimal getPreviousValue() {
		return previousValue;
	}

	public void setPreviousValue(BigDecimal previousValue) {
		this.previousValue = previousValue;
	}

	@PrePersist
	protected void prePersist() {
		this.createdAt = new Date();
	}
}
