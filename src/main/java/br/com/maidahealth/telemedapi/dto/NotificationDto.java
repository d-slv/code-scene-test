package br.com.maidahealth.telemedapi.dto;

import java.util.Date;

import org.springframework.data.domain.Page;

import br.com.maidahealth.telemedapi.enums.TypeActionEnum;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.TelemedNotification;

public class NotificationDto {
	
	private Long id;
	
	private Date sentAt;

	private Date readedAt;

	private Date createdAt;

	private String message;
	
	private Long metadataId;

	private String typeAction;
	
	private Boolean expired;

	public NotificationDto(TelemedNotification notification) {
		super();
		this.id = notification.getId();
		this.sentAt = notification.getSentAt();
		this.readedAt = notification.getReadedAt();
		this.createdAt = notification.getCreatedAt();
		this.message = notification.getMessage();
		this.typeAction = notification.getTypeAction().name();
		this.metadataId = notification.getMetadataId();
	}

	public synchronized Date getSentAt() {
		return sentAt;
	}

	public synchronized void setSentAt(Date sentAt) {
		this.sentAt = sentAt;
	}

	public synchronized Date getReadedAt() {
		return readedAt;
	}

	public synchronized void setReadedAt(Date readedAt) {
		this.readedAt = readedAt;
	}

	public synchronized Date getCreatedAt() {
		return createdAt;
	}

	public synchronized void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public synchronized String getMessage() {
		return message;
	}

	public synchronized void setMessage(String message) {
		this.message = message;
	}

	public synchronized String getTypeAction() {
		return typeAction;
	}

	public synchronized void setTypeAction(String typeAction) {
		this.typeAction = typeAction;
	}
	
	public Long getMetadataId() {
		return metadataId;
	}

	public void setMetadataId(Long metadataId) {
		this.metadataId = metadataId;
	}

	public Boolean getExpired() {
		return expired;
	}

	public void setExpired(Boolean expired) {
		this.expired = expired;
	}

	public static Page<NotificationDto> convert(Page<TelemedNotification> notifications) {
		return notifications.map(NotificationDto::new);
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setExpirationFlag(Object metadata) {
		expired = true;
		try {
			AttendanceDto att = (AttendanceDto) metadata;
			if(typeAction.equals(TypeActionEnum.ATTENDANCE_IN_PROGRESS.name()) && att.getStatus() == AttendanceStatus.VIDEOCALL_IN_PROGRESS)
				expired = false;
			else if(typeAction.equals(TypeActionEnum.INSURED_IN_QUEUE.name()) && att.getStatus() == AttendanceStatus.WAITING_IN_QUEUE)
				expired = false;
			else if(typeAction.equals(TypeActionEnum.WAITING_INSURED.name()) && att.getStatus() == AttendanceStatus.WAITING_INSURED)
				expired = false;
			else if(typeAction.equals(TypeActionEnum.CLOSED_TIME.name()))
				expired = true;
			else if(typeAction.equals(TypeActionEnum.NEXT_ONE.name()) && att.getStatus() == AttendanceStatus.WAITING_IN_QUEUE)
				expired = false;
			else if(typeAction.equals(TypeActionEnum.TOMORROW_ATTENDANCE.name()) && att.getStatus() == AttendanceStatus.SCHEDULED)
				expired = false;
			else if(typeAction.equals(TypeActionEnum.ATTENDANCE_ALMOST_CANCELLED.name()) && att.getStatus() == AttendanceStatus.WAITING_INSURED)
				expired = false;
			else if(typeAction.equals(TypeActionEnum.NEW_SCHEDULED_ATTENDANCE.name()) && att.getStatus().equals(AttendanceStatus.SCHEDULED))
				expired = false;	
		} catch (Exception e) {
		}	
	}
	
}
