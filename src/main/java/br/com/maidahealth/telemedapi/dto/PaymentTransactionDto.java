package br.com.maidahealth.telemedapi.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import br.com.maidahealth.telemedapi.enums.PaymentTransactionStatusEnum;
import br.com.maidahealth.telemedapi.enums.PaymentTransactionTypeEnum;
import br.com.maidahealth.telemedapi.models.PaymentTransaction;

public class PaymentTransactionDto {

	private Long id;

	private PaymentTransactionStatusEnum status;

	private PaymentTransactionTypeEnum type;

	private Date createdAt;

	private String details;

	public PaymentTransactionDto(PaymentTransaction paymentTransacion) {
		super();
		this.id = paymentTransacion.getId();
		this.status = paymentTransacion.getStatus();
		this.type = paymentTransacion.getType();
		this.createdAt = paymentTransacion.getCreatedAt();
		this.details = paymentTransacion.getDetails();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public PaymentTransactionStatusEnum getStatus() {
		return status;
	}

	public void setStatus(PaymentTransactionStatusEnum status) {
		this.status = status;
	}

	public PaymentTransactionTypeEnum getType() {
		return type;
	}

	public void setType(PaymentTransactionTypeEnum type) {
		this.type = type;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}
	
    public static Set<PaymentTransactionDto> convert(Set<PaymentTransaction> paymentTransactions) {
        return Optional.ofNullable(paymentTransactions)
                .map(t -> t.stream().map(PaymentTransactionDto::new).collect(Collectors.toSet())).orElse(new HashSet<>());
    }

}
