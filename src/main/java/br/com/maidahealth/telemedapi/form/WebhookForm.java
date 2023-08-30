package br.com.maidahealth.telemedapi.form;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.maidahealth.telemedapi.enums.EventType;

public class WebhookForm {

	private EventType eventType;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone="GMT")
	private Date date;
	
	private String appointment;

	private Object content;

	public WebhookForm() {
		super();
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getAppointment() {
		return appointment;
	}

	public void setAppointment(String appointment) {
		this.appointment = appointment;
	}

	public EventType getEventType() {
		return eventType;
	}

	public void setEventType(EventType eventType) {
		this.eventType = eventType;
	}

	public Object getContent() {
		return content;
	}

	public void setContent(Object content) {
		this.content = content;
	}
}
