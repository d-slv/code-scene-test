package br.com.maidahealth.telemedapi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.maidahealth.telemedapi.models.State;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
	
	List<State> findByNameContainingIgnoreCase(String name);

}
