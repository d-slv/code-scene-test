package br.com.maidahealth.telemedapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.ClientSpecialties;

public interface ClientSpecialtiesRepository extends JpaRepository<ClientSpecialties, Long> {
    Optional<ClientSpecialties> findByClientSpecialtyIdAndClientId(long specialty, long client);
}
