package br.com.maidahealth.telemedapi.dto;

import java.util.LinkedHashSet;

public class PaymentDetailsDto {
	
	private LinkedHashSet<InstallmentDto> installments = new LinkedHashSet<InstallmentDto>();
	
	private Double amount;
	
	private LinkedHashSet<CardDto> cards = new LinkedHashSet<CardDto>();

	public LinkedHashSet<InstallmentDto> getInstallments() {
		return installments;
	}

	public void setInstallments(LinkedHashSet<InstallmentDto> installments) {
		this.installments = installments;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public LinkedHashSet<CardDto> getCards() {
		return cards;
	}

	public void setCards(LinkedHashSet<CardDto> cards) {
		this.cards = cards;
	}
	
}
