package br.com.maidahealth.telemedapi.validator;

import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.TimeZone;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.AttendanceForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.models.HealthInsurer;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.SchedulingType;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.ProfessionalRepository;
import br.com.maidahealth.telemedapi.services.AuthenticationService;
import br.com.maidahealth.telemedapi.services.HealthInsurerService;
import br.com.maidahealth.telemedapi.utils.ProfileUtils;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class AppointmentSchedulingValidator {
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@Autowired
	private ProfessionalRepository professionalRepository;
	
	@Autowired
	AttendanceRepository attendanceRepository;
	
	@Autowired
	private HealthInsurerService healthInsurerService;
	
	private User currentUser;
	
	private HealthInsurer hi;
	
	@Autowired
	private TelemedClientApiContext context;
	
	public void validate(@Valid AttendanceForm form) {
		this.currentUser = authenticationService.currentUser();
		this.hi =  healthInsurerService.getHealthInsurer();
		validateSchedulingDate(form);
		validateHourFormat(form.getHour());
//		validateSchedulingDatePassed(form);
		validatePhoneNumber(form);
		validateSecretaryProviders(form);
		validateChosenProfessional(form);
		validateSchedulingDateUnavailable(form);
		validateSpecialty(form);
		validateSchedulingType(form);
		validateReturnAppointment(form);
	}

	private void validateSchedulingDateUnavailable(@Valid AttendanceForm form) {
		Date schedulingDate = Utils.formatDataWithHour(form.getDate(),form.getHour(), TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		Integer count = attendanceRepository.countByProfessionalIdAndSchedulingDate(Long.valueOf(form.getProfessionalId()),schedulingDate);
		if(count > 0) {
			throw new InvalidException("O horário de agendamento solicitado já está ocupado.");
		}
		
		// Se não tiver configuração, considera o tempo mínimo com 5 minutos, que é o tempo padrão da docway.
		Integer minimumTimeForScheduling = (hi != null && hi.getMinimumTimeForScheduling() != null) ? hi.getMinimumTimeForScheduling() : 5;
		Date currentDate = Utils.getCurrentDate(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		Long differenceInMinutes = Utils.getDifferenceInMinutes(currentDate, schedulingDate);
		if(differenceInMinutes < minimumTimeForScheduling) {
			throw new InvalidException("O horário da consulta deve ser superior a "+minimumTimeForScheduling+" minutos do horário atual.");
		}
	}

	private void validatePhoneNumber(@Valid AttendanceForm form) {
		boolean phoneNumberValid = Utils.isCellPhoneNumberValid(form.getPhoneNumber());
		if(!phoneNumberValid) {
			throw new InvalidException("O telefone informado não é válido. Revise-o e tente novamente.");
		}
		
	}

	private void validateSchedulingDate(@Valid AttendanceForm form) {
		if(form.getDate() == null) {
			throw new InvalidException("A data da consulta não foi preenchida ou está com valor inválido.");
		}	
	}

	private void validateSchedulingType(@Valid AttendanceForm form) {
		if(form.getSchedulingTypeEnum() == null) {
			throw new InvalidException("O tipo da consulta foi preenchido com valor inválido.");
		}
		
	}

	public void validateSecretaryProviders(AttendanceForm form) {
		Set<Long> secretaryProviders = ProfileUtils.getSecretaryProviders(currentUser);
		if(!secretaryProviders.contains(Long.valueOf(form.getProviderId()))) {
			throw new InvalidException("A secretária não atende pelo prestador informado.");
		}
	}

	public void validateChosenProfessional(AttendanceForm form) {
		Optional<Professional> optional = professionalRepository.findByIdAndProvidersSecretariesId(Long.valueOf(form.getProfessionalId()), currentUser.getId());
		if(!optional.isPresent()) {
			throw new InvalidException("A secretária não gerencia a agenda do médico informado.");
		}
	}
	
	public void validateSpecialty(AttendanceForm form) {
		Optional<Professional> optional = professionalRepository.findByIdAndSpecialtiesId(Long.valueOf(form.getProfessionalId()), Long.valueOf(form.getSpecialtyId()));
		if(!optional.isPresent()) {
			throw new InvalidException("O médico não atende pela especialidade selecionada.");
		}
	}
	
	public void validateReturnAppointment(AttendanceForm form) {
		if(form.getSchedulingTypeEnum().equals(SchedulingType.FIRST_APPOINTMENT)) {
			AttendanceStatus status = AttendanceStatus.FINISHED;
			AttendanceType type = AttendanceType.ELECTIVE;
			
//			Se não tiver configuração, considera como prazo para considerar consulta de retorno 30 dias, que é o tempo praticado pela maioria das
//			autogestões clientes da maida
			Integer deadlineForReturnAttendance = (hi != null && hi.getDeadlineForReturnAttendance() != null) ? hi.getDeadlineForReturnAttendance() : 30;
			Date now = Utils.currentDate();
			
			Date limitDate = Utils.addDays(now, -deadlineForReturnAttendance);
			
			Optional<Attendance> lastAttendanceOptional = attendanceRepository
					.findFirstByStatusAndTypeAndSchedulingTypeAndProfessionalIdAndSpecialtyIdAndSchedulingDateGreaterThanEqualOrderBySchedulingDateDesc(
							status, type, SchedulingType.FIRST_APPOINTMENT, Long.valueOf(form.getProfessionalId()),
							Long.valueOf(form.getSpecialtyId()), limitDate);
			if(lastAttendanceOptional.isPresent()) {
				Attendance lastAttendance = lastAttendanceOptional.get();
				throw new InvalidException(
						"Este Atendimento deve ser considerado como Consulta de Retorno, pois o prazo de atendimento de uma consulta de retorno é de "
								+ deadlineForReturnAttendance + " dias. A última consulta foi no dia "
								+ Utils.format(lastAttendance.getSchedulingDate(), "dd/MM/yyyy"));
			}
		}
	}

	public void validateSchedulingDatePassed(AttendanceForm form) {
		Date currentDate = Utils.getCurrentDate(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		Date schedulingDate = Utils.formatDataWithHour(form.getDate(),form.getHour(), TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		if(schedulingDate.before(currentDate)) {
			throw new InvalidException("A data da consulta deve ser futura.");
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

}
