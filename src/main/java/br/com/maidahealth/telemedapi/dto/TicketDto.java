package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.Ticket;
import br.com.maidahealth.telemedapi.utils.TicketUtils;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public class TicketDto {

    private Long id;
    private String issue;
    private String status;
    private Long attendanceId;
    private Date createdAt;
    private Date expirationDate;
    private Integer deadLine;
    private String attendanceType;
    private String adminTitle;
    private Date closedDate;
    private String closedDateFormatted;

    public TicketDto() {
    }

    public TicketDto(Ticket createdTicket) {
        this.id = createdTicket.getId();
        this.attendanceId = createdTicket.getAttendance().getId();
        this.issue = createdTicket.getIssue();
        this.createdAt = createdTicket.getCreatedAt();
        this.status = createdTicket.getStatus().getDescription();
        this.expirationDate = createdTicket.getExpirationDate();
        this.deadLine = createdTicket.getReason().getConfig().getDeadline();
        this.attendanceType = createdTicket.getAttendance().getType().getDescription().toLowerCase();
        this.adminTitle = createdTicket.getReason().getAdminTitle();
        this.closedDate = createdTicket.getClosedDate();
        this.closedDateFormatted = TicketUtils.parseToPrettyDate(createdTicket);
    }

    public static TicketDto convert(Ticket ticket) {
        return new TicketDto(ticket);
    }

    public static Page<TicketDto> convert(Page<Ticket> tickets) {
        return tickets.map(TicketDto::new);
    }

    public static Set<TicketDto> convert(Set<Ticket> tickets) {
        return Optional.ofNullable(tickets)
                .map(t -> t.stream().map(TicketDto::new).collect(Collectors.toSet())).orElse(new HashSet<>());
    }

    public Long getId() {
        return id;
    }

    public Long getAttendanceId() {
        return attendanceId;
    }

    public String getIssue() {
        return issue;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getStatus() {
        return status;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public Integer getDeadLine() {
        return deadLine;
    }

    public String getAttendanceType() {
        return attendanceType;
    }

    public String getAdminTitle() {
        return adminTitle;
    }

    public Date getClosedDate() {
        return closedDate;
    }

    public String getClosedDateFormatted() {
        return closedDateFormatted;
    }

}
