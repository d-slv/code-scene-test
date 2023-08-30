package br.com.maidahealth.telemedapi.controllers;

import br.com.maidahealth.telemedapi.dto.CardBinDto;
import br.com.maidahealth.telemedapi.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("checkout")
public class CheckoutController {
	
	@Autowired
	private PaymentService service;


	@GetMapping("/{number}")
	public ResponseEntity<CardBinDto> getCardInfo(@PathVariable String number){

		return ResponseEntity.ok(service.getCardInfo(number));

	}
	
}
