package br.com.maidahealth.telemedapi.scheduler;

import br.com.maidahealth.telemedapi.repositories.TokenRepository;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class DeleteOldAccessTokenTask implements Job {

	private static final Logger LOG = LoggerFactory.getLogger(DeleteOldAccessTokenTask.class);

	@Autowired
	private TokenRepository repository;


	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		LOG.info("======EXECUCAO DE TASK DE REMOCAO DE TOKENS DE ACESSO======");
		LOG.info("Initializing DeleteOldTokensTask");
		LocalDateTime dateDifference = LocalDateTime.now(ZoneId.of("UTC")).minusDays(7);
		LOG.info("Removing access tokens earlier than {}", dateDifference);

		int removed = repository.deleteWithCreatedateLessThan(dateDifference);

		LOG.info("Removed {} access tokens from database.", NumberFormat.getInstance().format(removed));
		LOG.info("======FIM DA EXECUCAO======");
	}

}
