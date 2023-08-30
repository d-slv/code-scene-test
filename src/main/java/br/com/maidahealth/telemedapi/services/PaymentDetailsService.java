package br.com.maidahealth.telemedapi.services;

import java.text.DecimalFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.dto.CardDto;
import br.com.maidahealth.telemedapi.dto.InstallmentDto;
import br.com.maidahealth.telemedapi.dto.PaymentDetailsDto;
import br.com.maidahealth.telemedapi.exceptions.NotAuthorizedException;
import br.com.maidahealth.telemedapi.models.CardToken;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.User;

@Service
public class PaymentDetailsService {
	
	@Autowired
	private AuthenticationService authService;
	
	@Autowired
	private SpecialtyService specialtyService;
	
	@Autowired
	private HealthInsurerService healthInsurerService;

	public PaymentDetailsDto getPaymentDetailsBySpecialty(Long specialtyId) {
		User user = authService.currentUser();
		
		if(!user.isInsured()) throw new NotAuthorizedException();
		
		Specialty specialty = specialtyService.find(specialtyId);
		
		PaymentDetailsDto dto = new PaymentDetailsDto();
		dto.setAmount(specialty.getCurrentUrgencyValue());
		
		Insured insured = user.getInsured();
		
		for (CardToken card : insured.getCardTokens())
			dto.getCards().add(CardDto.convert(card));
		
		Integer maxInstallments = healthInsurerService.getHealthInsurer().getPaymentConfig().getMaxInstallments();
		
		DecimalFormat df = new DecimalFormat("#.##");
		df.setMinimumFractionDigits(2);
		
		for (int i = 1; i <= maxInstallments; i++) {
			InstallmentDto installmentDto = new InstallmentDto();
			installmentDto.setInstallmentNumber(i);
			
			Double installmentValue = Double.valueOf(df.format(dto.getAmount()/i).replaceAll(",", "."));
			installmentDto.setInstallmentValue(installmentValue);
			installmentDto.setDescription(i + "x de " + df.format(installmentDto.getInstallmentValue()) + " sem juros");
			
			dto.getInstallments().add(installmentDto);
		}
		
		return dto;
	}

}
