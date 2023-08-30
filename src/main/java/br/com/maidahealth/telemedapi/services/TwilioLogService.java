package br.com.maidahealth.telemedapi.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.form.TwilioLogForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.TwilioLog;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.TwilioLogRepository;

@Service
public class TwilioLogService {

	@Autowired
	public TwilioLogRepository repository;
	
	@Autowired
	public AttendanceRepository attendanceRepository;
	
	@Autowired
	private AuthenticationService authenticationService;

	public TwilioLog save(@Valid TwilioLogForm form) {
		TwilioLog twilioLog = form.toTwilioLog();

		Optional<Attendance> optional = attendanceRepository.findById(form.getAttendanceId());
		if(!optional.isPresent()) {
			throw new EntityNotFoundException("Não foi encontrado atendimento com o identificador informado: "+ form.getAttendanceId());
		}

		twilioLog.setAttendance(optional.get());
		
		User currentUser = authenticationService.currentUser();
		twilioLog.setUser(currentUser);

		return repository.save(twilioLog);
	}
}
