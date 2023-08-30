package br.com.maidahealth.telemedapi.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.City;
import br.com.maidahealth.telemedapi.models.State;

public interface CityRepository extends JpaRepository<City, Long> {
	
	List<City> findByNameContainingIgnoreCase(String name);

	Optional<City> findByIbgeCode(Integer ibgeCode);
	
	List<City> findByNameContainingIgnoreCaseAndState(String name, State state);

}
