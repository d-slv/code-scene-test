package br.com.maidahealth.telemedapi.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.maidahealth.telemedapi.enums.TypeActionEnum;

@Entity
@Table(indexes = {
		@Index(name = "telemed_notification_idx_user_id",  columnList="user_id"),
	  })
public class TelemedNotification {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date sentAt;

	@Temporal(TemporalType.TIMESTAMP)
	private Date readedAt;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	private String message;
	
	private Long metadataId;
	
	public TelemedNotification() {}
	
	public TelemedNotification(String message, Long metadataId, User user, TypeActionEnum typeAction) {
		super();
		this.message = message;
		this.metadataId = metadataId;
		this.user = user;
		this.typeAction = typeAction;
	}

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@Enumerated(EnumType.STRING)
	private TypeActionEnum typeAction;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getSentAt() {
		return sentAt;
	}

	public void setSentAt(Date sentAt) {
		this.sentAt = sentAt;
	}

	public Date getReadedAt() {
		return readedAt;
	}

	public void setReadedAt(Date readedAt) {
		this.readedAt = readedAt;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TypeActionEnum getTypeAction() {
		return typeAction;
	}

	public void setTypeAction(TypeActionEnum typeAction) {
		this.typeAction = typeAction;
	}

	public Long getMetadataId() {
		return metadataId;
	}

	public void setMetadataId(Long metadataId) {
		this.metadataId = metadataId;
	}
	
	@PrePersist
	private void prePersist() {
		createdAt = new Date();
	}
	
}
