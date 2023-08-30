package br.com.maidahealth.telemedapi.validator;

import java.util.Date;
import java.util.TimeZone;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.SelfAttendanceForm;
import br.com.maidahealth.telemedapi.models.HealthInsurer;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.services.HealthInsurerService;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class AppointmentSelfSchedulingValidator {
	
	@Autowired
	AttendanceRepository attendanceRepository;
	
	@Autowired
	private HealthInsurerService healthInsurerService;
	
	private HealthInsurer hi;
	
	@Autowired
	private TelemedClientApiContext context;
	
	public void validate(@Valid SelfAttendanceForm form) {
		this.hi =  healthInsurerService.getHealthInsurer();
		validateSchedulingDate(form);
		validateHourFormat(form.getHour());
		validateSchedulingDateUnavailable(form);
//		validateSchedulingDatePassed(form);
		validateSchedulingType(form);
	}

	private void validateSchedulingDate(@Valid SelfAttendanceForm form) {
		if(form.getDate() == null) {
			throw new InvalidException("A data da consulta não foi preenchida ou está com valor inválido.");
		}	
	}

	public void validateHourFormat(String hour){
		if(hour.length() < 5) {
			throw new InvalidException("O horário da consulta está com formato inválido.");
		}
		
		Integer hourInt = Integer.parseInt((String)hour.split(":")[0]); 
		if(hourInt < 0 || hourInt > 24) {
			throw new InvalidException("A hora da consulta está inválida.");
		}
		
		Integer minutes = Integer.parseInt((String)hour.split(":")[1]);
		if(minutes < 0 || minutes > 59) {
			throw new InvalidException("Os minutos da consulta está com valor inválido.");
		}
	}

	private void validateSchedulingDateUnavailable(@Valid SelfAttendanceForm form) {
		Date schedulingDate = Utils.formatDataWithHour(form.getDate(),form.getHour(), TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));

		// Se não tiver configuração, considera o tempo mínimo com 5 minutos, que é o tempo padrão da docway.
		Integer minimumTimeForScheduling = (hi != null && hi.getMinimumTimeForScheduling() != null) ? hi.getMinimumTimeForScheduling() : 5;
		Date currentDate = Utils.getCurrentDate(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		Long differenceInMinutes = Utils.getDifferenceInMinutes(currentDate, schedulingDate);
		if(differenceInMinutes < minimumTimeForScheduling) {
			throw new InvalidException("O horário da consulta deve ser superior a " + minimumTimeForScheduling + " minutos do horário atual.");
		}
	}


	private void validateSchedulingType(@Valid SelfAttendanceForm form) {
		if(form.getSchedulingTypeEnum() == null) {
			throw new InvalidException("O tipo da consulta foi preenchido com valor inválido.");
		}
		
	}

	public void validateSchedulingDatePassed(SelfAttendanceForm form) {
		Date currentDate = Utils.getCurrentDate(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		Date schedulingDate = Utils.formatDataWithHour(form.getDate(),form.getHour(), TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		if(schedulingDate.before(currentDate)) {
			throw new InvalidException("A data da consulta deve ser futura.");
		}
	}
	

}
