package br.com.maidahealth.telemedapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.maidahealth.telemedapi.models.Guest;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long>{

    Optional<Guest> findByCpf(String cpf);

    Optional<Guest> findByPublicId(String publicId);
    
}
