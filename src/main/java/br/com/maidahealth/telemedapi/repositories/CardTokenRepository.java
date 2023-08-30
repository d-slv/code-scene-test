package br.com.maidahealth.telemedapi.repositories;

import br.com.maidahealth.telemedapi.models.CardToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardTokenRepository extends JpaRepository<CardToken, Long> {

    Optional<CardToken> findByToken(String token);
}
