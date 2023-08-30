package br.com.maidahealth.telemedapi.controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.ProfessionalScheduleDto;
import br.com.maidahealth.telemedapi.dto.ScheduleSummaryDto;
import br.com.maidahealth.telemedapi.form.ScheduleBlockForm;
import br.com.maidahealth.telemedapi.services.ScheduleService;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

	@Autowired
	private ScheduleService service;

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("/generate")
	public String generateVacancies() {
//		service.generateVacancies(null);
		service.generateDefaultSchedules();
		return "Vagas geradas com sucesso";
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("/specialties-summary")
	public List<ScheduleSummaryDto> generateSchedulesSpecialtySummaries(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<Date> date){
		return service.generateSchedulesSpecialtySummary(date);
	}
	
	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@PutMapping("/block/{id}")
	public ResponseEntity<?> blockSchedule(@PathVariable Long id, @RequestBody @Valid ScheduleBlockForm form){
		service.blockSchedule(id, form);
		return ResponseEntity.ok().build();
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping
	public List<ProfessionalScheduleDto> getProfessionalSchedules(	
			@RequestParam(name = "professional", required = true) Long professionalId, 
			@RequestParam(name = "date", required = true) String date,
			@RequestParam(name = "specialty", required = true) Long specialtyId){
		return service.getProfessionalSchedules(professionalId, date, specialtyId);
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("/generate-professional-vacancies")
	public String generateProfessionalAvailabilityVacancies() {
		service.autoGenerateProfessionalAvailabilitySchedules();
		return "Vagas geradas com sucesso";
	}
}
