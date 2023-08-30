package br.com.maidahealth.telemedapi.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.Specialty;

public interface SpecialtyRepository extends JpaRepository<Specialty,Long>, SpecialtyRepositoryCustom{

	Optional<Specialty> findByCodeOrName(String code, String name);
	
	Optional<Specialty> findByCode(String code);
	
	Optional<Specialty> findByExternalId(String externalId);

	List<Specialty> findByAvailableForUrgency(boolean availableForUrgency);

	List<Specialty> findAllByAvailableForElectiveTrue();
}
