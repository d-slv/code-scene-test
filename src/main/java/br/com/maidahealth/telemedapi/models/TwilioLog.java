package br.com.maidahealth.telemedapi.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.maidahealth.telemedapi.enums.TwilioOriginEnum;

@Entity
public class TwilioLog implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;
	
	@Enumerated(EnumType.STRING)
	private TwilioOriginEnum origin;

	private String userAgentBrowser;

	@ManyToOne
	@JoinColumn(name = "attendance_id")
	private Attendance attendance;

	private String twilioEvent;
	
	private String twilioCode;

	@Column(columnDefinition="TEXT")
	private String stackTrace;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;


	public TwilioLog() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public TwilioOriginEnum getOrigin() {
		return origin;
	}

	public void setOrigin(TwilioOriginEnum origin) {
		this.origin = origin;
	}

	public String getUserAgentBrowser() {
		return userAgentBrowser;
	}

	public void setUserAgentBrowser(String userAgentBrowser) {
		this.userAgentBrowser = userAgentBrowser;
	}

	public Attendance getAttendance() {
		return attendance;
	}

	public void setAttendance(Attendance attendance) {
		this.attendance = attendance;
	}

	public String getTwilioEvent() {
		return twilioEvent;
	}

	public void setTwilioEvent(String twilioEvent) {
		this.twilioEvent = twilioEvent;
	}

	public String getStackTrace() {
		return stackTrace;
	}

	public void setStackTrace(String stackTrace) {
		this.stackTrace = stackTrace;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getTwilioCode() {
		return twilioCode;
	}

	public void setTwilioCode(String twilioCode) {
		this.twilioCode = twilioCode;
	}

	@PrePersist
	void setDataOnCreate() {
		this.createdAt = new Date();
	}

}
