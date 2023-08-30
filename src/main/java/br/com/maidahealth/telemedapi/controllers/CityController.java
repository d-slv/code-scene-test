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

import br.com.maidahealth.telemedapi.dto.CityDto;
import br.com.maidahealth.telemedapi.models.State;
import br.com.maidahealth.telemedapi.services.CityService;
import br.com.maidahealth.telemedapi.services.StateService;

@RestController
@RequestMapping("city")
public class CityController {
	
	@Autowired
	private CityService service;
	
	@Autowired
	private StateService stateService;

	@GetMapping
	public ResponseEntity<List<CityDto>> list(@RequestParam(name = "name", required = false) String name, @RequestParam(name = "state_id", required = false) Long stateId) {
		Optional<String> optionalName = Optional.ofNullable(name);
		Optional<Long> optionalStateId = Optional.ofNullable(stateId);
		
		List<CityDto> dtos = new ArrayList<CityDto>();
		
		if(optionalStateId.isPresent()) {
			State state = stateService.findById(optionalStateId.get());
			if(state != null)
				dtos = service.findByNameAndState(name, state);
		}
		else {
			dtos = service.findByName(optionalName.isPresent() ? name :  "");
		}
		
		return ResponseEntity.ok(dtos);
	}
	
	
	
}
