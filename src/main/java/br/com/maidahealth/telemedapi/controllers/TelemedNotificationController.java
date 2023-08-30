package br.com.maidahealth.telemedapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.dto.NotificationDto;
import br.com.maidahealth.telemedapi.dto.NotificationUnreadDto;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.services.TelemedNotificationService;

@RestController
@RequestMapping("notification")
public class TelemedNotificationController {
	
	@Autowired
	private TelemedNotificationService telemedNotificationService;

	@GetMapping("/unread/count")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<NotificationUnreadDto> unread() {
		Integer count = telemedNotificationService.unreadCount();
		return ResponseEntity.ok(NotificationUnreadDto.convert(count));
	}
	
	@GetMapping("")
	@ResponseStatus(HttpStatus.OK)
	public Page<NotificationDto> list(Pageable pagination) {
		return telemedNotificationService.list(pagination);
	}

	@PutMapping("all/read")
	public ResponseEntity<Object> markAllAsRead() {
		telemedNotificationService.markAllAsRead();
		return new ResponseEntity<>(new MessageDto("Notificações marcadas como lida!"), HttpStatus.OK);
	}
	
	@GetMapping("{id}/metadata")
	public ResponseEntity<Object> list(@PathVariable("id") Long id) {
		Object obj = telemedNotificationService.getMetadataByTelemedNotificationId(id);
		
		if(obj == null)
			throw new InvalidException("Metadata inválido");
		
		return ResponseEntity.ok(obj);
	}
}
