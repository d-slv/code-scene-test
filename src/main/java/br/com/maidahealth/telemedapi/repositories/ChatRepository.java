package br.com.maidahealth.telemedapi.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.maidahealth.telemedapi.enums.ChatType;
import br.com.maidahealth.telemedapi.models.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    
    Optional<Chat> findByMsChatId(Long msChatId);

    @Query("SELECT DISTINCT c FROM Chat c JOIN c.participants p WHERE UPPER(p.name) LIKE %?3% AND p.id != ?1 AND c.id IN (SELECT c.id FROM Chat c JOIN c.participants p WHERE p.id = ?1 AND c.type = ?2)")
    List<Chat> searchChatsByParticipant(Long userParticipantId, ChatType chatType, String name);

    Optional<Chat> findByMsChatIdAndParticipantsPublicId(Long msChatId, String publicId);

    List<Chat> findByParticipantsPublicId(String publicId);
}
