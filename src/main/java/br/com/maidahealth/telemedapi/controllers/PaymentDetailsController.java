package br.com.maidahealth.telemedapi.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.PaymentDetailsDto;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.services.PaymentDetailsService;

@RestController
@RequestMapping("payment-details")
public class PaymentDetailsController {
	
	@Autowired
	private PaymentDetailsService service;

	@GetMapping
	public ResponseEntity<Object> paymentDetails(@RequestParam(name = "specialtyId") Long specialtyId) {
		Optional<Long> optSpecialtyId = Optional.ofNullable(specialtyId);
		
		if(!optSpecialtyId.isPresent())
			throw new InvalidException("ID da especialidade deve ser fornecido");
		
		PaymentDetailsDto dto = service.getPaymentDetailsBySpecialty(specialtyId);
		
		return ResponseEntity.ok(dto);
	}
	

}
