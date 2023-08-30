package br.com.maidahealth.telemedapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.NoticeDto;
import br.com.maidahealth.telemedapi.services.NoticeService;

@RestController
@RequestMapping("notice")
public class NoticeController {
	
	@Autowired
	private NoticeService service;

	@GetMapping
	public NoticeDto notice() {
		return service.getNotice(null);
	}
	
}
