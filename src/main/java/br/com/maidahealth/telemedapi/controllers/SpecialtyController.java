package br.com.maidahealth.telemedapi.controllers;

import br.com.maidahealth.telemedapi.dto.SpecialtyDto;
import br.com.maidahealth.telemedapi.form.SpecialtyForm;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.services.SpecialtyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/specialty")
public class SpecialtyController {

	@Autowired
	private SpecialtyService service;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<SpecialtyDto> list(@RequestParam("name") Optional<String> name,
								   @RequestParam("provider") Optional<Long> providerId,
								   @RequestParam("professional") Optional<Long> professionalId,
								   @RequestParam Optional<Boolean> elective,
								   @RequestParam Optional<Boolean> urgency,
								   @RequestParam Optional<BigDecimal> minValue,
								   @RequestParam Optional<BigDecimal> maxValue) {
		List<Specialty> specialties = service.find(name, providerId, professionalId, elective, urgency, minValue, maxValue);
		return SpecialtyDto.convert(specialties);
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<SpecialtyDto> detail(@PathVariable Long id) {
		Specialty specialty = service.find(id);
		if(specialty == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(SpecialtyDto.convert(specialty));
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	public ResponseEntity<SpecialtyDto> update(@PathVariable Long id, @Valid @RequestBody SpecialtyForm form) {
		Specialty updatedSpecialty = service.update(id, form);
		if(updatedSpecialty != null) {
			return ResponseEntity.ok(SpecialtyDto.convert(updatedSpecialty));
		}
		return ResponseEntity.notFound().build();
	}

}
