package br.com.maidahealth.telemedapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.Profile;

public interface ProfileRepository extends JpaRepository<Profile,Long>{

	Optional<Profile> findByName(String name);
}
