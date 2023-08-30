package br.com.maidahealth.telemedapi.controllers;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.BookingDto;
import br.com.maidahealth.telemedapi.dto.BookingErrorDto;
import br.com.maidahealth.telemedapi.models.TasyIntegration;
import br.com.maidahealth.telemedapi.repositories.TasyIntegrationRepository;
import br.com.maidahealth.telemedapi.services.BookingService;
import br.com.maidahealth.telemedapi.services.TelemedServerService;
import br.com.maidahealth.telemedapi.validator.BookingValidator;

@RestController
@RequestMapping("booking")
@EnableAsync
public class BookingController {

	@Autowired
	private TelemedServerService telemedServerService;

	@Autowired
	private BookingService bookingService;

	@Autowired
	private TasyIntegrationRepository tasyIntegrationRepository;

	@Autowired
	private BookingValidator validator;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Object> createBooking(@RequestBody BookingDto bookingRequest,
			@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
		Object[] isInvalid = validator.check(bookingRequest);
		if (isInvalid[0].equals(true)) {
			BookingErrorDto response = new BookingErrorDto(
					"Existem campos não preenchidos ou incorretos: " + isInvalid[1],
					"Entre em contado pelos canais de atendimento.");

			TasyIntegration tasyIntegration = new TasyIntegration();
			tasyIntegration.setBookingRequest(bookingRequest.toString());

			tasyIntegration.setClientId(bookingRequest.getClientId());
			tasyIntegration.setType(bookingRequest.getType().toString());
			tasyIntegration.setSpecialtyId(bookingRequest.getSpecialtyId());
			tasyIntegration.setHealthAttendanceId(bookingRequest.getHealthAttendanceId());
			tasyIntegration.setProfessionalId(bookingRequest.getProfessionalId());
			tasyIntegration.setSchedulingDate(bookingRequest.getSchedulingDate());
			tasyIntegration.setHour(bookingRequest.getHour());
			tasyIntegration.setCreatedAt(new Date());

			tasyIntegration.setError("Existem campos não preenchidos ou incorretos: " + isInvalid[1]);

			tasyIntegrationRepository.save(tasyIntegration);

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		return bookingService.patientExistenceValidation(bookingRequest);
	}
}
