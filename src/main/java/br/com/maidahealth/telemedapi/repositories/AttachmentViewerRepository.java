package br.com.maidahealth.telemedapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.enums.ParticipantType;
import br.com.maidahealth.telemedapi.models.AttachmentViewer;

public interface AttachmentViewerRepository extends JpaRepository<AttachmentViewer, Long>{

    Optional<AttachmentViewer> findByKeyAndPublicIdAndType(String key, String publicId, ParticipantType type);
    
}
