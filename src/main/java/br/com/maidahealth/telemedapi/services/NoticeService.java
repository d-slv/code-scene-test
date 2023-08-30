package br.com.maidahealth.telemedapi.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.dto.NoticeDto;
import br.com.maidahealth.telemedapi.enums.TypeActionEnum;
import br.com.maidahealth.telemedapi.enums.TypeMessageEnum;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.models.HealthInsurer;
import br.com.maidahealth.telemedapi.models.Insured;

@Service
public class NoticeService {

	@Autowired
	private AttendanceService attendanceService;

	@Autowired
	private AuthenticationService authenticationService;
	
	@Autowired
	private HealthInsurerService healthInsurerService;

	@Autowired
	private InsuredService insuredService;

	public NoticeDto getNotice(Insured insuredParam) {
		
		Attendance attendanceInProgress = attendanceService.getAttendanceInProgress(insuredParam);

		if(attendanceInProgress != null)
			return NoticeDto.convert(attendanceInProgress, TypeMessageEnum.INFO.name(), "Consulta em andamento", "Clique aqui para entrar.", TypeActionEnum.ATTENDANCE_IN_PROGRESS.name());
		
		Insured insured;
		
		if (insuredParam != null) {
			insured = insuredParam;
		}else {
			insured = authenticationService.currentUser().getInsured();
		}

		Boolean isEligible = insuredService.isEligible(insured);
		if(!isEligible)
			return NoticeDto.convert(null, TypeMessageEnum.ERROR.name(), "Infelizmente não será possível realizar consultas.", "Clique aqui e fale com o plano.", TypeActionEnum.INELIGIBLE_INSURED.name());

		List<Attendance> attendances = attendanceService.getAttendancesByRequesterInsuredAndStatusInAndTypeIn(insured, Arrays.asList(AttendanceStatus.WAITING_IN_QUEUE), Arrays.asList(AttendanceType.URGENCY));

		//TODO Avisar quando segurando está na fila
		if(attendances.size() > 0)
			return NoticeDto.convert(attendances.get(0), TypeMessageEnum.INFO.name(), "Você está na fila de urgência.", "Clique aqui para entrar", TypeActionEnum.INSURED_IN_QUEUE.name());

		// TODO Avisar quando o médico está esperando
		List<Insured> requesterAndAttendanceInsureds = new ArrayList<Insured>();
		requesterAndAttendanceInsureds.add(insured);
		requesterAndAttendanceInsureds.addAll(insured.getDependents());
		attendances = attendanceService.findByInsuredInAndStatusInAndTypeIn(requesterAndAttendanceInsureds, Arrays.asList(AttendanceStatus.WAITING_INSURED), Arrays.asList(AttendanceType.URGENCY, AttendanceType.ELECTIVE));
		if(attendances.size() > 0) {
			Attendance att = attendances.get(0);
			String title = att.getProfessional().getName() + " está aguardando.";
			return NoticeDto.convert(att, TypeMessageEnum.INFO.name(), title, "Clique aqui para entrar", TypeActionEnum.WAITING_INSURED.name());
		}
		
		List<Attendance> attendancesPaid = attendanceService.getAttendancesByRequesterInsuredAndStatusInAndTypeIn(insured, Arrays.asList(AttendanceStatus.PAYMENT_APPROVED), Arrays.asList(AttendanceType.URGENCY));
		if(attendancesPaid.size() > 0)
			return NoticeDto.convert(attendancesPaid.get(0), TypeMessageEnum.WARNING.name(), "Identificamos um atendimento pendente.", "Clique aqui para mais detalhes", TypeActionEnum.PAYMENT_APPROVED.name());

		if(!attendanceService.canGetUrgencyAttendance()) {
			HealthInsurer hi = healthInsurerService.getHealthInsurer();
			String subtitle = "Nossos horários de atendimento são entre " + hi.getStartUrgencyTime() + " e " + hi.getFinishUrgencyTime() + ".";
			return NoticeDto.convert(null, TypeMessageEnum.WARNING.name(), "Horário de atendimento encerrado", subtitle, TypeActionEnum.CLOSED_TIME.name());
		}

		return null;
	}

}
