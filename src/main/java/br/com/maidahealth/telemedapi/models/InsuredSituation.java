package br.com.maidahealth.telemedapi.models;

import br.com.maidahealth.telemedapi.enums.AccountCancellationReasonEnum;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(indexes = {
		@Index(name = "insured_situation_idx_type",  columnList="type"),
		@Index(name = "insured_situation_idx_created_at",  columnList="createdAt")
	  })
public class InsuredSituation implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private InsuredSituationType type;

	@Enumerated(EnumType.STRING)
	private AccountCancellationReasonEnum reason;

	private String detail;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	public InsuredSituation() {
		super();
	}

	public InsuredSituation(InsuredSituationType type, AccountCancellationReasonEnum reason, String detail) {
		super();
		this.type = type;
		this.reason = reason;
		this.detail = detail;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public InsuredSituationType getType() {
		return type;
	}

	public void setType(InsuredSituationType type) {
		this.type = type;
	}

	public AccountCancellationReasonEnum getReason() {
		return reason;
	}

	public void setReason(AccountCancellationReasonEnum reason) {
		this.reason = reason;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	@PrePersist
	void setDataOnCreate() {
		this.createdAt = new Date();
	}

}
