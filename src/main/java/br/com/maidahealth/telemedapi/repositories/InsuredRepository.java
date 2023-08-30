package br.com.maidahealth.telemedapi.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.InsuredType;

public interface InsuredRepository extends JpaRepository<Insured,Long>, InsuredRepositoryCustom{
	Optional<Insured> findByHealthInsuranceNumber(String healthInsuranceNumber);
	
	Optional<Insured> findByCpf(String cpf);

	Optional<Insured> findByPublicToken(String token);

	@Query(value = "SELECT * FROM Insured i "
			+ " WHERE "
			+ "		(i.cpf = ?1 OR i.health_insurance_number = ?1) AND "
			+ "		i.registration_number = ?2 AND"
			+ "		i.birth_date = ?3"
			, nativeQuery = true)
  	Optional<Insured> getInsuredByCpfOrHealthInsuranceNumberAndRegistrationNumberAndBirthDate(String cpfOrHealthInsuranceNumber, String registrationNumber, Date birthDate);
	
	@Query(value = "select registration_number from insured;"
			, nativeQuery = true)
	List<String> getAllRegistrationNumbers();
	
	@Query("SELECT i FROM Insured i where i.registrationNumber in (:registrationNumbers)")
	List<Insured> getInsuredsByRegistrationNumber(@Param("registrationNumbers") Set<String> registration);
	
	@Query(value = "select count(i.id) from Insured i where i.docwayId IS NOT NULL")
	Long countIdDocway();
	
	Page<Insured> findByCpfContainingOrHealthInsuranceNumberContainingOrNameContaining(String cpf, String healthInsuranceNumber, String name, Pageable pagination);

	List<Insured> findByHolder(Insured holder);
	
	Optional<Insured> findByDocwayId(String id);

	Optional<Insured> findByRegistrationNumberAndType(String registrationNumber, InsuredType type);
	
	Optional<Insured> findById(long insuredId);
}
