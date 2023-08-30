package br.com.maidahealth.telemedapi.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.HealthInsurerDto;
import br.com.maidahealth.telemedapi.exceptions.NotAuthorizedException;
import br.com.maidahealth.telemedapi.form.HealthInsurerForm;
import br.com.maidahealth.telemedapi.models.HealthInsurer;
import br.com.maidahealth.telemedapi.services.AuthenticationService;
import br.com.maidahealth.telemedapi.services.HealthInsurerService;

@RestController
@RequestMapping("health_insurer")
public class HealthInsurerController {
	
	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private HealthInsurerService service;

	@GetMapping
	public HealthInsurerDto get() {
		return HealthInsurerDto.convert(service.getHealthInsurer());
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<HealthInsurerDto> save(@RequestBody @Valid HealthInsurerForm form) {
		validateIfCurrentUserIsAdmin();	
		HealthInsurer healthInsurer = service.updateHealthInsurer(form);
		return ResponseEntity.ok(HealthInsurerDto.convert(healthInsurer));
	}

	private void validateIfCurrentUserIsAdmin() {
		if(!authenticationService.currentUser().isAdmin())
			throw new NotAuthorizedException();
	}

}
