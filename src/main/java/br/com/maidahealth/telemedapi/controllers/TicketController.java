package br.com.maidahealth.telemedapi.controllers;


import br.com.maidahealth.telemedapi.dto.TicketDto;
import br.com.maidahealth.telemedapi.dto.TicketStatusDto;
import br.com.maidahealth.telemedapi.enums.TicketStatus;
import br.com.maidahealth.telemedapi.form.TicketForm;
import br.com.maidahealth.telemedapi.models.Ticket;
import br.com.maidahealth.telemedapi.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService service;

    @PostMapping
    public TicketDto createTicket(@Valid @RequestBody TicketForm form) {
        Ticket ticket = service.create(form);

        return TicketDto.convert(ticket);
    }

    @GetMapping
    public Page<TicketDto> list(@RequestParam(required = false) Map<String, Object> params,
                                @RequestParam(name = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                                @RequestParam(name = "finishDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date finishDate,
                                @PageableDefault(page = 0, size = 10) Pageable pagination) {

        Page<Ticket> tickets = service.findAll(params, startDate, finishDate, pagination);
        return TicketDto.convert(tickets);
    }

    @GetMapping("/{id}")
    public TicketDto findById(@PathVariable Long id) {
        Ticket ticket = service.findById(id);
        return TicketDto.convert(ticket);
    }

    @GetMapping("/statuses")
    public List<TicketStatusDto> listStatuses() {
        return TicketStatusDto.convert(TicketStatus.values());
    }

}
