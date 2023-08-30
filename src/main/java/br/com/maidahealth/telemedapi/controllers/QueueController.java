package br.com.maidahealth.telemedapi.controllers;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalTime;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.customvalidations.PaymentOrderValidator;
import br.com.maidahealth.telemedapi.dto.QueuePositionDto;
import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.StatisticsDescriptionEnum;
import br.com.maidahealth.telemedapi.form.QueuePositionForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.Statistics;
import br.com.maidahealth.telemedapi.services.AttendanceService;
import br.com.maidahealth.telemedapi.services.StatisticsService;

@RestController
@RequestMapping("/queue")
public class QueueController {

	@Autowired
	private AttendanceService service;

	@Autowired
	private StatisticsService statisticsService;

	@Autowired
	private PaymentOrderValidator paymentOrderValidator;

	@InitBinder(value = { "queuePositionForm" })
	public void initPaymentOrderValidationBinder(WebDataBinder binder) {
		binder.addValidators(paymentOrderValidator);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public QueuePositionDto create(@Valid @RequestBody(required = false) QueuePositionForm form) {
		boolean enabledMedia = true;
		Statistics statisticTMA = statisticsService
				.findByDescription(StatisticsDescriptionEnum.TEMPO_MEDIA_ATENDIMENTO);
		BigDecimal averageWaitingTimeInMinutes = statisticTMA.getValue();

		Statistics statisticQPO = statisticsService
				.findByDescription(StatisticsDescriptionEnum.QUANTIDADE_PROFISSIONAIS_ATENDENDO);
		Integer onlineProfessionalsQuantity = statisticQPO.getValue().intValue();
		Attendance attendance = service.saveUrgency(form, enabledMedia);
		Integer myPosition = service.getPositionInQueue(attendance);

		String remainingWaitingTime = "";

		try {
			BigDecimal remainingWaitingTimeCalc = (averageWaitingTimeInMinutes.multiply(BigDecimal.valueOf(myPosition)))
					.divide(BigDecimal.valueOf(onlineProfessionalsQuantity), 2, RoundingMode.HALF_UP);

			Duration duration = Duration.ofMinutes(remainingWaitingTimeCalc.intValue());

			remainingWaitingTime = LocalTime.MIN.plus(duration).toString();
		} catch (Exception e) {
			remainingWaitingTime = "N/A";
		}

		return QueuePositionDto.convert(myPosition, attendance, remainingWaitingTime);
	}

	@GetMapping("position")
	public QueuePositionDto myPositionInQueue() {
		Statistics statisticTMA = statisticsService
				.findByDescription(StatisticsDescriptionEnum.TEMPO_MEDIA_ATENDIMENTO);
		BigDecimal averageWaitingTimeInMinutes = statisticTMA.getValue();

		Statistics statisticQPO = statisticsService
				.findByDescription(StatisticsDescriptionEnum.QUANTIDADE_PROFISSIONAIS_ATENDENDO);
		Integer onlineProfessionalsQuantity = statisticQPO.getValue().intValue();

		Attendance attendance = service.getLastUrgencyAttendance();
		Integer myPosition = service.getPositionInQueue(attendance);
		String remainingWaitingTime = "N/A";

		if(myPosition >= 1) {
			try {
				BigDecimal remainingWaitingTimeCalc = (averageWaitingTimeInMinutes.multiply(BigDecimal.valueOf(myPosition)))
						.divide(BigDecimal.valueOf(onlineProfessionalsQuantity), 2, RoundingMode.HALF_UP);

				Duration duration = Duration.ofMinutes(remainingWaitingTimeCalc.intValue());

				remainingWaitingTime = LocalTime.MIN.plus(duration).toString();
			} catch (Exception e) {
				remainingWaitingTime = "N/A";
			}
		}
		

		return QueuePositionDto.convert(myPosition, attendance, remainingWaitingTime);
	}

	@PostMapping("leave")
	public String leave() {
		service.leave(CancellingAttendanceReasonEnum.CANCELED_BY_INSURED);
		return "success";
	}

	@GetMapping("can_get_urgency_attendance")
	public ResponseEntity<Object> canGetUrgencyAttendance() {

		if (service.canGetUrgencyAttendance())
			return new ResponseEntity<Object>(HttpStatus.OK);

		return ResponseEntity.status(403).build();
	}
}
