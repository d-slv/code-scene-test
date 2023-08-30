package br.com.maidahealth.telemedapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.maidahealth.telemedapi.models.SensediaConfiguration;

@Repository
public interface SensediaConfigurationRepository extends JpaRepository<SensediaConfiguration, Long>{

}
