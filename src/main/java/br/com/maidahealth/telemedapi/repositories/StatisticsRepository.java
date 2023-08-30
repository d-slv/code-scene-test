package br.com.maidahealth.telemedapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.Statistics;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {

	Statistics findByStatistic(String statistic);
}
