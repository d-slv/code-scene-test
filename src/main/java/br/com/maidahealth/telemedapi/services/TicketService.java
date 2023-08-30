package br.com.maidahealth.telemedapi.services;

import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.TicketForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.SupportReason;
import br.com.maidahealth.telemedapi.models.Ticket;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.SupportReasonRepository;
import br.com.maidahealth.telemedapi.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.Map;

@Service
public class TicketService {

    @Autowired
    private TicketRepository repository;

    @Autowired
    private SupportReasonRepository reasonRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Ticket create(TicketForm form) throws InvalidException {
        Attendance storedAttendance = attendanceRepository.findById(form.getAttendanceId())
                .orElseThrow(() -> new EntityNotFoundException("atendimento não encontrado para o id informado"));
        SupportReason storedReason = reasonRepository.findById(form.getReasonId())
                .orElseThrow(() -> new EntityNotFoundException("motivo não encontrado para o id informado"));

        int openTickets = repository.countActiveTicketsByAttendance(storedAttendance, storedReason);
        if (openTickets > 0) {
            throw new InvalidException("Já existe um ticket em aberto com o mesmo motivo informado");
        }

        Ticket ticket = form.toTicket(storedAttendance, storedReason);

        return repository.save(ticket);
    }

    public Page<Ticket> findAll(Map<String, Object> params, Date startDate, Date finishDate, Pageable pagination) {
        return repository.findAll(params, startDate, finishDate, pagination);
    }

    public Ticket findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("chamado não encontrado para o id informado"));
    }
}
