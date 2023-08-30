package br.com.maidahealth.telemedapi.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.ScheduleTypeDto;
import br.com.maidahealth.telemedapi.models.SchedulingType;

@RestController
@RequestMapping("schedule-type")
public class ScheduleTypeController {

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<ScheduleTypeDto> list() {
		return ScheduleTypeDto.convert(SchedulingType.values());
	}
	
}
