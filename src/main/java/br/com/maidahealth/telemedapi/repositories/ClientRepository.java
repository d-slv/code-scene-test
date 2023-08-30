package br.com.maidahealth.telemedapi.repositories;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.Client;
import br.com.maidahealth.telemedapi.models.Professional;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByPublicId(String publicId);

	Optional<Client> findByName(String name);

	Optional<Client> findByAccessToken(String accessKey);

	List<Client> findByPublicIdIn(List<String> clientsIds);
	
	Set<Client> findByProfessionalsIn(Set<Professional> professionals);

}
