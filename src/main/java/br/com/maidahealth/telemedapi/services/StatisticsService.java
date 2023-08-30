package br.com.maidahealth.telemedapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.enums.StatisticsDescriptionEnum;
import br.com.maidahealth.telemedapi.models.Statistics;
import br.com.maidahealth.telemedapi.repositories.StatisticsRepository;

@Service
public class StatisticsService {

	@Autowired
	private StatisticsRepository repository;

	public Statistics findByDescription(StatisticsDescriptionEnum statistics) {

		return repository.findByStatistic(statistics.getDescription());
	}

}
