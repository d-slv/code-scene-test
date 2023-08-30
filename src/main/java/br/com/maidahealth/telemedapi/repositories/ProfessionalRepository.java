package br.com.maidahealth.telemedapi.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.Association;
import br.com.maidahealth.telemedapi.models.Professional;
import org.springframework.data.jpa.repository.Query;

public interface ProfessionalRepository extends JpaRepository<Professional,Long>, ProfessionalRepositoryCustom{

	Optional<Professional> findByAssociationAndAssociationNumber(Association association, String associationNumber);

	Optional<Professional> findByDocwayId(String professionalDocwayId);
	
	Optional<Professional> findByIdAndProvidersSecretariesId(Long professionalId, Long secretaryId);
	
	Optional<Professional> findByIdAndSpecialtiesId(Long professionalId, Long specialtyId);

	@Query("SELECT p FROM Professional p WHERE p.cpfAndName = '' or p.cpfAndName IS NULL")
	Optional<List<Professional>> findEmptyCpfAndName();

	Optional<Professional> findByCpf(String cpf);

}
