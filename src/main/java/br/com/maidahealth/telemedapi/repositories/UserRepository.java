package br.com.maidahealth.telemedapi.repositories;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.User;

public interface UserRepository extends JpaRepository<User,Long>{

	Optional<User> findByEmailOrLogin(String email, String login);
	
	Optional<User> findByLogin(String login);

	Optional<User> findByInsured(Insured insured);
	
	Optional<User> findByEmail(String email);
	
	Optional<User> findByRecoveryPasswordCodeAndRecoveryPasswordCodeExpirationDateGreaterThanEqual(String recoveryPasswordCode, Date expirationDate);

    Optional<User> findByEmailAndRecoveryPasswordCode(String email, String recoveryCode);

	Integer countByEmailAndIdNot(String email, Long id);
}
