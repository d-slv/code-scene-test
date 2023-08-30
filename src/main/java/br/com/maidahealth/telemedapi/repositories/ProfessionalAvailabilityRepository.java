package br.com.maidahealth.telemedapi.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.maidahealth.telemedapi.enums.ProfessionalAvailabilityStatus;
import br.com.maidahealth.telemedapi.models.ProfessionalAvailability;

@Repository
public interface ProfessionalAvailabilityRepository extends JpaRepository<ProfessionalAvailability, Long>{

	List<ProfessionalAvailability> findByProfessionalIdAndStatus(Long professionalId,
			ProfessionalAvailabilityStatus status);

	Page<ProfessionalAvailability> findByProfessionalIdAndStatus(Long professionalId, Pageable pagination,
			ProfessionalAvailabilityStatus active);
	
	Optional<ProfessionalAvailability> findByIdAndStatus(Long professionalAvailabilityId,
			ProfessionalAvailabilityStatus status);

	List<ProfessionalAvailability> findByStatus(ProfessionalAvailabilityStatus status);

}
