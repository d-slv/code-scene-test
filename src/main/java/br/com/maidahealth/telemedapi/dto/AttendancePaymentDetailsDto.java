package br.com.maidahealth.telemedapi.dto;

import java.text.DecimalFormat;

import br.com.maidahealth.telemedapi.enums.CardTokenType;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendancePaymentDetails;

public class AttendancePaymentDetailsDto {
	
	private InstallmentDto installments = new InstallmentDto();
	
	private Double amount;

	private String currentStatus;

	private CardTokenType cardTokenType;

	public InstallmentDto getInstallments() {
		return installments;
	}

	public void setInstallments(InstallmentDto installments) {
		this.installments = installments;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public CardTokenType getCardTokenType() {
		return cardTokenType;
	}

	public void setCardTokenType(CardTokenType cardTokenType) {
		this.cardTokenType = cardTokenType;
	}

	public static AttendancePaymentDetailsDto convert(Attendance attendance) {
		if(attendance.getPaymentDetails() == null) return null;
		
		AttendancePaymentDetails paymentDetails = attendance.getPaymentDetails();
		
		AttendancePaymentDetailsDto dto = new AttendancePaymentDetailsDto();
		dto.setAmount(attendance.getSpecialty().getCurrentUrgencyValue());
		dto.setCurrentStatus(paymentDetails.getStatus().getDescription());
		InstallmentDto installmentDto = new InstallmentDto();
		installmentDto.setInstallmentNumber(paymentDetails.getInstallments());
		
		DecimalFormat df = new DecimalFormat("#.##");
		df.setMinimumFractionDigits(2);
		
		Double installmentValue = Double.valueOf(df.format(dto.getAmount()/paymentDetails.getInstallments()).replaceAll(",", "."));
		installmentDto.setInstallmentValue(installmentValue);

		installmentDto.setDescription(paymentDetails.getInstallments() + "x de " + df.format(installmentDto.getInstallmentValue()));
		
		dto.setInstallments(installmentDto);

		dto.setCardTokenType(paymentDetails.getCardTokenType());

		
		return dto;
	}

	public String getCurrentStatus() {
		return currentStatus;
	}

	public void setCurrentStatus(String currentStatus) {
		this.currentStatus = currentStatus;
	}
}
