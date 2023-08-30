package br.com.maidahealth.telemedapi.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.form.TwilioLogForm;
import br.com.maidahealth.telemedapi.services.TwilioLogService;

@RestController
@RequestMapping("/twilio_log")
public class TwilioLogController {

	@Autowired
	private TwilioLogService service;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Object> create(@Valid @RequestBody(required = false) TwilioLogForm form) {
		if(service.save(form) != null)
			return new ResponseEntity<Object>(HttpStatus.OK);
		
		return ResponseEntity.status(403).build();
	}

}
