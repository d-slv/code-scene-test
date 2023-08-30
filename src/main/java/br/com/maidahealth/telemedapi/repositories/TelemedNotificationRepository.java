package br.com.maidahealth.telemedapi.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.maidahealth.telemedapi.models.TelemedNotification;
import br.com.maidahealth.telemedapi.models.User;

@Repository
public interface TelemedNotificationRepository extends JpaRepository<TelemedNotification, Long> {

	List<TelemedNotification> findBySentAt(Date date);

	Integer countByUserAndReadedAt(User user, Date createdAt);
	
	List<TelemedNotification> findByUserAndReadedAt(User user, Date createdAt);
	
	Page<TelemedNotification> findByUser(User user, Pageable pageable);

	Page<TelemedNotification> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
}
