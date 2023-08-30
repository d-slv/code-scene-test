package br.com.maidahealth.telemedapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.CurrentDateDto;

@RestController
@RequestMapping("")
public class HomeController {

	@GetMapping("/hello")
	@ResponseBody
	public ResponseEntity<CurrentDateDto> hello() {
		
		CurrentDateDto dto = new CurrentDateDto();

		return ResponseEntity.ok(dto);
	}
}
