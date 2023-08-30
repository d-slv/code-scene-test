package br.com.maidahealth.telemedapi.scheduler;

import java.util.List;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.maidahealth.telemedapi.enums.TypeActionEnum;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.TelemedNotification;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.services.AttendanceService;
import br.com.maidahealth.telemedapi.services.InsuredService;
import br.com.maidahealth.telemedapi.services.TelemedNotificationService;

@Component
public class AttendancesOfTomorrow implements Job {

	@Autowired
	InsuredService service;
	
	@Autowired
	private AttendanceService attendanceService;
	
	@Autowired
	private TelemedNotificationService notService;
	
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		List<Attendance> attendances = attendanceService.getAttendancesOfTomorrow();
		
		for (Attendance attendance : attendances) {
			String message = "Não se esqueça: seu atendimento com Dra(a) " + attendance.getProfessional().getName() + " será amanhã!";
			User user = attendance.getInsured().getUser() == null ? attendance.getInsured().getHolder().getUser() : attendance.getInsured().getUser();
			TelemedNotification not = notService.save(message, attendance.getId(), user, TypeActionEnum.TOMORROW_ATTENDANCE);
			
			notService.send(not);
		}
	}

}
