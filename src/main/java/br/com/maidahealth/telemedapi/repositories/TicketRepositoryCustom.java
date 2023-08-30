package br.com.maidahealth.telemedapi.repositories;

import br.com.maidahealth.telemedapi.models.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.Map;

public interface TicketRepositoryCustom {

    Page<Ticket> findAll(Map<String, Object> params, Date startDate, Date finishDate, Pageable pagination);
}
