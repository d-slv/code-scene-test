package br.com.maidahealth.telemedapi.scheduler;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.maidahealth.telemedapi.services.ScheduleService;

@Component
public class GenerateScheduleFromProfessionalAvailability implements Job {

	@Autowired
	private ScheduleService scheduleService;
	
    Logger logger = LoggerFactory.getLogger(getClass());

    @Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
        logger.info("Início da Rotina no Quartz para Geração de agendas baseadas nas escalas...");
		scheduleService.autoGenerateProfessionalAvailabilitySchedules();
        logger.info("Fim da Rotina no Quartz para Geração de agendas baseadas nas escalas...");
	}

}
