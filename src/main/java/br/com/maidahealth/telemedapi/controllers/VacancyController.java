package br.com.maidahealth.telemedapi.controllers;

import java.util.Date;
import java.util.List;
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

import br.com.maidahealth.telemedapi.dto.ProfessionalDto;
import br.com.maidahealth.telemedapi.dto.SlotDto;
import br.com.maidahealth.telemedapi.dto.VacancyDto;
import br.com.maidahealth.telemedapi.form.VacancyBlockForm;
import br.com.maidahealth.telemedapi.models.Vacancy;
import br.com.maidahealth.telemedapi.services.VacancyService;

@RestController
@RequestMapping("/vacancy")
public class VacancyController {

	@Autowired
	private VacancyService service;

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("/{id}")
	public ResponseEntity<VacancyDto> detail(@PathVariable Long id) {
		Vacancy vacancy = service.find(id);
		if(vacancy == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(VacancyDto.convert(vacancy));
	}

	@GetMapping("/days")
	public ResponseEntity<List<String>> list(@RequestParam Long specialtyId,
										  @RequestParam(required = false) Long professionalId,
										  @RequestParam(required = false) String schedulingType,
										  @RequestParam(name = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {

		return ResponseEntity.ok(service.listAvailableVacancy(specialtyId, professionalId, schedulingType, date));
	}

	@GetMapping("/day/hours")
	public ResponseEntity<List<String>> listHoursByDay(@RequestParam Long specialtyId,
										  	 @RequestParam(required = false) Long professionalId,
											 @RequestParam(required = false) String schedulingType, 
											 @RequestParam(name = "date", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date,
											 @RequestParam(defaultValue = "true") boolean fromNow) {

		return ResponseEntity.ok(service.listAvailableVacancyByDay(specialtyId, professionalId, schedulingType, date, fromNow));
	}

	@GetMapping("/available-professionals")
	public ResponseEntity<List<ProfessionalDto>> listAvailableProfessionals(@RequestParam(required = true) Long specialtyId,
																					 @RequestParam(required = true) String schedulingType, 
																					 @RequestParam(name = "date", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
		
		return ResponseEntity.ok(service.listAvailableProfessionals(specialtyId, schedulingType, date));
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("/admin/list")
	public List<SlotDto> detail(@RequestParam(name = "specialty", required = true) Long specialtyId, @RequestParam(name = "date", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
		return service.list(specialtyId, date);
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@PutMapping("/block/{id}")
	public ResponseEntity<?> blockVacancy(@PathVariable Long id, @RequestBody @Valid VacancyBlockForm form) {
		System.out.println(form.getDescription());
		service.blockVacancy(id, form);
		return ResponseEntity.ok().build();
	}
}
