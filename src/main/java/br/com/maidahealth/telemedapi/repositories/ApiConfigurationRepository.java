package br.com.maidahealth.telemedapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.maidahealth.telemedapi.models.ApiConfiguration;

@Repository
public interface ApiConfigurationRepository extends JpaRepository<ApiConfiguration, Long>{

}
