package br.com.maidahealth.telemedapi.controllers;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.maidahealth.telemedapi.dto.ProfessionalAvailabilityDto;
import br.com.maidahealth.telemedapi.form.ProfessionalAvailabilityForm;
import br.com.maidahealth.telemedapi.models.ProfessionalAvailability;
import br.com.maidahealth.telemedapi.services.ProfessionalAvailabilityService;

@RestController
@RequestMapping("/professional-availability")
public class ProfessionalAvailabilityController {

	@Autowired
	private ProfessionalAvailabilityService service;

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("/list")
    public Page<ProfessionalAvailabilityDto> listProfessionalAvailability(@RequestParam(name = "professional", required = true) Long professionalId,
                                              @PageableDefault(page = 0, size = 10) Pageable pagination) {
        Page<ProfessionalAvailability> professionalAvailability = service.getProfessionalAvailability(professionalId, pagination);
        return ProfessionalAvailabilityDto.convert(professionalAvailability);
    }

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@PostMapping("/create")
    public ResponseEntity<ProfessionalAvailabilityDto> createProfessionalAvailability(@RequestBody @Valid ProfessionalAvailabilityForm form, UriComponentsBuilder uriBuilder) {
        ProfessionalAvailability professionalAvailability = service.createProfessionalAvailability(form);
        URI uri = uriBuilder.path("/professional-availability/{id}").buildAndExpand(professionalAvailability.getId()).toUri();
        return ResponseEntity.created(uri).body(new ProfessionalAvailabilityDto(professionalAvailability));
    }
	
	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@PutMapping("/update/{id}")
    public ResponseEntity<ProfessionalAvailabilityDto> updateProfessionalAvailability(@PathVariable Long id, @RequestBody @Valid ProfessionalAvailabilityForm form) {
        ProfessionalAvailability professionalAvailability = service.updateProfessionalAvailability(form, id);
        return ResponseEntity.ok(new ProfessionalAvailabilityDto(professionalAvailability));
    }
	
	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@DeleteMapping("/remove/{id}")
    public ResponseEntity<?> removeProfessionalAvailability(@PathVariable Long id) {
        service.removeProfessionalAvailability(id);
        return ResponseEntity.ok().build();
    }
}
