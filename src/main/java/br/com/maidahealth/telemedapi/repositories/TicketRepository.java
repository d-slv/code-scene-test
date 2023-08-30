package br.com.maidahealth.telemedapi.repositories;

import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.SupportReason;
import br.com.maidahealth.telemedapi.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long>, TicketRepositoryCustom {

    @Query("SELECT count(t) FROM Ticket t WHERE t.attendance = ?1 AND t.status <> 'CLOSED' AND t.reason = ?2")
    int countActiveTicketsByAttendance(Attendance storedAttendance, SupportReason storedReason);


}
