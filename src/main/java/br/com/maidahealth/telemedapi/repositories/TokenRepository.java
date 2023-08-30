package br.com.maidahealth.telemedapi.repositories;

import br.com.maidahealth.telemedapi.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByValue(String oldAccessToken);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Token WHERE created_at <= ?1", nativeQuery = true)
    int deleteWithCreatedateLessThan(LocalDateTime date);
}
