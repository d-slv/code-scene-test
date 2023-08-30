package br.com.maidahealth.telemedapi.controllers;

import javax.validation.Valid;

import br.com.maidahealth.telemedapi.dto.MessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.ProfessionalDto;
import br.com.maidahealth.telemedapi.form.ProfessionalForm;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.services.ProfessionalService;

import java.util.Map;

@RestController
@RequestMapping("/professional")
public class ProfessionalController {
	
	@Autowired
	private ProfessionalService service;
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public Page<ProfessionalDto> list(@RequestParam Map<String, String> filter,
									  @PageableDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pagination) {
		Page<Professional> professionals = service.find(filter, pagination);

		return ProfessionalDto.convert(professionals);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ProfessionalDto create(@RequestBody @Valid ProfessionalForm form) {
		Professional professional = service.save(form);
		return ProfessionalDto.convert(professional);
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<ProfessionalDto> detail(@PathVariable Long id) {
		Professional professional = service.find(id);
		if(professional == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(ProfessionalDto.convert(professional));
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<ProfessionalDto> update(@PathVariable Long id, @RequestBody ProfessionalForm form) {
		Professional updatedProfessional = service.update(id,form);
		if(updatedProfessional != null) {
			return ResponseEntity.ok(ProfessionalDto.convert(updatedProfessional));
		}
		return ResponseEntity.notFound().build();
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@PostMapping("/migrate-cpf-and-name")
	public ResponseEntity<Object> migrateCpfAndName(){
		int count = service.migrateCpfAndName();
		return ResponseEntity.ok(new MessageDto("Migração de CPF e nome executada com sucesso. Registros atualizados: " + count));
	}

	@GetMapping("/check-by-cpf/{cpf}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<ProfessionalDto> checkByCpf(@PathVariable String cpf) {
		Professional professional = service.checkByCpf(cpf);
		if (professional == null) {
			return ResponseEntity.notFound().build();
		}
		return  ResponseEntity.ok(ProfessionalDto.convert(professional));
	}
	
	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@PutMapping("/reset-password/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<ProfessionalDto> resetPassword(@PathVariable String id) {
		Professional updatedProfessional = service.resetPassword(id);
		if(updatedProfessional != null) {
			return ResponseEntity.ok(ProfessionalDto.convert(updatedProfessional));
		}
		return ResponseEntity.notFound().build();
	}

}
