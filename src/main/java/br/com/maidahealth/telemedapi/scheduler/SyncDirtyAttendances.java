package br.com.maidahealth.telemedapi.scheduler;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.maidahealth.telemedapi.services.AttendanceService;
import br.com.maidahealth.telemedapi.services.InsuredService;

@Component
public class SyncDirtyAttendances implements Job {

	@Autowired
	InsuredService service;

	@Autowired
	private AttendanceService attendanceService;


	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		attendanceService.SyncDirtyAttendances();
	}

}
