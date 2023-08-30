package br.com.maidahealth.telemedapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.maidahealth.telemedapi.models.HealthInsurer;

@Repository
public interface HealthInsurerRepository extends JpaRepository<HealthInsurer, Long> {
	
	Optional<HealthInsurer> findTop1ByIdGreaterThan(Long id);

}
