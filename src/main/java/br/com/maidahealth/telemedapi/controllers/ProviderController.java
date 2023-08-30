package br.com.maidahealth.telemedapi.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.ProviderDto;
import br.com.maidahealth.telemedapi.form.ProviderForm;
import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.services.ProviderService;

@RestController
@RequestMapping("/provider")
public class ProviderController {

	@Autowired
	private ProviderService service;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ProviderDto create(@RequestBody @Valid ProviderForm form) {
		Provider provider = service.save(form);
		return ProviderDto.convert(provider);
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public Page<ProviderDto> list(@RequestParam(name="name", required = false) String name,
										@RequestParam(name="professional", required = false) Long professionalId,
										@RequestParam(name="specialty", required = false) Long specialtyId,
										@PageableDefault( page = 0, size = 10) Pageable pagination) {
		Page<Provider> providers = service.find(name, professionalId, specialtyId, pagination);
		return ProviderDto.convert(providers);
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<ProviderDto> update(@PathVariable Long id, @RequestBody ProviderForm form) {
		Provider updatedProvider = service.update(id,form);
		if(updatedProvider != null) {
			return ResponseEntity.ok(ProviderDto.convert(updatedProvider));
		}
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<ProviderDto> detail(@PathVariable Long id) {
		Provider provider = service.find(id);
		if(provider == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(ProviderDto.convert(provider));
	}
}
