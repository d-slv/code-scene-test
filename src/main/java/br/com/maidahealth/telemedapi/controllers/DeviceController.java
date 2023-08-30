package br.com.maidahealth.telemedapi.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.form.DeviceForm;
import br.com.maidahealth.telemedapi.services.DeviceService;

@RestController
@RequestMapping("device")
public class DeviceController {
	
	@Autowired
	private DeviceService service;

	@PostMapping
	public ResponseEntity<Object> create(@RequestBody @Valid DeviceForm deviceForm) throws NoSuchMethodException, SecurityException, MethodArgumentNotValidException {
		service.create(deviceForm);
		
		return ResponseEntity.ok(new MessageDto("ID do dispositivo salvo com sucesso"));
	}
	
}
