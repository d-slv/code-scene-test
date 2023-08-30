package br.com.maidahealth.telemedapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.ProfessionalSpecialties;

public interface ProfessionalsSpecialtiesRepository extends JpaRepository<ProfessionalSpecialties, Long> {
	
	Optional<ProfessionalSpecialties> findBySpecialtiesIdAndProfessionalsId(long specialtiesId, long professionalsId);

}
