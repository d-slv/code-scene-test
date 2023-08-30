package br.com.maidahealth.telemedapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.dto.AttendancePositionDto;
import br.com.maidahealth.telemedapi.dto.QueuePositionMessageDto;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.vo.QueueView;

@Service
public class MessagingService {

	@Autowired
	private WSService wsService;

	@Autowired
	private AttendanceRepository repository;

	public void sendAttendanceQueuePositions(Long specialtyId) {

		List<AttendancePositionDto> queuePositions = new ArrayList<>();

		List<Attendance> waiting = repository.findByStatusAndTypeAndSpecialtyId(AttendanceStatus.WAITING_INSURED,
				AttendanceType.URGENCY, specialtyId);

		for (Attendance att : waiting) {
			AttendancePositionDto position = new AttendancePositionDto(att.getId(), 0L);
			queuePositions.add(position);
		}

		for (QueueView q : repository.getAttendancesInQueueBySpecialty(specialtyId)) {
			AttendancePositionDto position = new AttendancePositionDto(q.getId(), q.getPosition());
			queuePositions.add(position);
		}

		wsService.sendTo("/attendance/queue-" + specialtyId, new QueuePositionMessageDto(specialtyId, queuePositions));
	}
}
