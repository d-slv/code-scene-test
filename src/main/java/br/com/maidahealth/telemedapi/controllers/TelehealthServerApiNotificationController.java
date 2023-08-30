package br.com.maidahealth.telemedapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.services.TelehealthServerApiNotificationService;

@RestController
@RequestMapping("server-notifications")
public class TelehealthServerApiNotificationController {
	
	@Autowired
	private TelehealthServerApiNotificationService service;
	
	@PostMapping("professional-online")
    public ResponseEntity<Object> professionalOnline(@RequestBody Object obj) {
		service.setProfessionalLastSeenAt(obj);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
	

}
