package br.com.maidahealth.telemedapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.maidahealth.telemedapi.models.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
