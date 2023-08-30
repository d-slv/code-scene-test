package br.com.maidahealth.telemedapi.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.StateDto;
import br.com.maidahealth.telemedapi.services.StateService;

@RestController
@RequestMapping("state")
public class StateController {
	
	@Autowired
	private StateService service;
	
	@GetMapping
	public ResponseEntity<List<StateDto>> list(@RequestParam(name = "name", required = false) String name) {
		Optional<String> optionalName = Optional.ofNullable(name);
		List<StateDto> dtos = new ArrayList<StateDto>();
		
		dtos = service.findByName(optionalName.isPresent() ? name :  "");
		
		return ResponseEntity.ok(dtos);
	}

}
