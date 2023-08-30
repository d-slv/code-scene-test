package br.com.maidahealth.telemedapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.AirmedWebhook;

public interface AirmedWebhookRepository extends JpaRepository<AirmedWebhook, Long>{

}
