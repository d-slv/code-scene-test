package br.com.maidahealth.telemedapi.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.form.AirmedWebhookForm;
import br.com.maidahealth.telemedapi.models.AirmedWebhook;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.repositories.AirmedWebhookRepository;
import br.com.maidahealth.telemedapi.utils.Utils;
import reactor.core.publisher.Mono;

@Service
public class AirmedService {
	
	private static final Logger LOG = LoggerFactory.getLogger(AirmedService.class);
	
	@Autowired
	private TelemedClientApiContext context;
	
    @Autowired
    private AttendanceService attendanceService;
    
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private InsuredService insuredService;
	
	@Autowired
	private AirmedWebhookRepository webhookRepository;

	public ResponseEntity<?> handleWebhook(@Valid AirmedWebhookForm form, String accessToken, BindingResult result)
			throws NoSuchMethodException, MethodArgumentNotValidException {
		if (invalidWebhookAccessToken(accessToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageDto("access token not valid"));
		}

		Attendance storedAttendance = validateFields(form, result);
		String error = getProcessingError(result);

		saveWebhook(form, error);

		LOG.info("INFO :: Received data from Airmed, event type: {}", form.getEventType());
		if (!result.hasErrors()) {
			insuredService.updateInsuredCpf(storedAttendance, form.getCpf());
		}
		return ResponseEntity.ok(new MessageDto("success"));
	}
	
	private boolean invalidWebhookAccessToken(String accessToken) {
		String airmedToken = context.getApiConfiguration().getAirmedWebhookAccessToken();

		return !Objects.equals(accessToken, airmedToken);
	}
	
	private Attendance validateFields(AirmedWebhookForm form, BindingResult result)
			throws NoSuchMethodException, MethodArgumentNotValidException {
		Attendance storedAppointment = null;
		try {
			storedAppointment = attendanceService.findByDocwayId(form.getObjectId());
		} catch (Exception e) {
			String message = e.getMessage();
			result.rejectValue("id", "error.id", message);
		}

		return storedAppointment;
	}
	
	private String getProcessingError(BindingResult result) throws NoSuchMethodException, SecurityException {
		if (result.hasErrors()) {
			List<String> errors = new ArrayList<>();
			result.getAllErrors().stream().forEach(e -> {
				e.getObjectName();
				String fieldName = e.getObjectName();

				try {
					fieldName = ((FieldError) e).getField();
				} catch (Exception e2) {
				}

				String message = fieldName + ": " + messageSource.getMessage(e, LocaleContextHolder.getLocale());
				errors.add(message);
			});
			return String.join("; ", errors);
		}
		return null;
	}
	
	private void saveWebhook(@Valid AirmedWebhookForm form, String error) {
		try {
			AirmedWebhook airmedWebhook = new AirmedWebhook();
			airmedWebhook.setAppointment(form.getObjectId());
			airmedWebhook.setContent(new Gson().toJson(form));
			airmedWebhook.setDate(new Date());
			airmedWebhook.setEventType(form.getEventType());
			airmedWebhook.setError(error);
			webhookRepository.save(airmedWebhook);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public JsonNode getNotice(Insured insured) {
		if(insured == null || Utils.isEmpty(insured.getCpf()))
			return null;
		WebClient webClient = WebClient.create(context.getApiConfiguration().getAirmedApiUrl());
		String accessKey = context.getApiConfiguration().getAirmedKey();
		JsonNode obj = webClient.get()

				.uri("/notice/" + insured.getCpf())
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
				.header("accessKey", accessKey)

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return Mono.error(new RuntimeException("4xx"));
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				})

				.bodyToMono(JsonNode.class)
				.block()
				;
		
		return obj;
	}
	
}
