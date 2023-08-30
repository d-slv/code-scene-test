package br.com.maidahealth.telemedapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.TwilioLog;

public interface TwilioLogRepository extends JpaRepository<TwilioLog, Long> {

}
