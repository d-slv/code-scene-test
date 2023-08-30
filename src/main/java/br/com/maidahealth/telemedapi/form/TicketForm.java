package br.com.maidahealth.telemedapi.form;

import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.SupportReason;
import br.com.maidahealth.telemedapi.models.Ticket;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class TicketForm {

    @NotNull(message = "o identificador do motivo não pode ser vazio")
    private Long reasonId;
    @Size(min = 10, message = "a descrição do ticket deve ter no mínimo {min} caracteres")
    @NotEmpty(message = "a descrição do ticket não pode ser vazia")
    private String issue;
    @NotNull(message = "o identificador do atendimento não pode ser nulo")
    private Long attendanceId;

    public TicketForm() {
    }

    public Long getReasonId() {
        return reasonId;
    }

    public void setReasonId(Long reasonId) {
        this.reasonId = reasonId;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public Long getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }

    @Override
    public String toString() {
        return "TicketForm{" +
                "reasonId=" + reasonId +
                ", issue='" + issue + '\'' +
                ", attendanceId=" + attendanceId +
                '}';
    }

    public Ticket toTicket(Attendance attendance, SupportReason reason) {
        return new Ticket(null, reason, this.issue, null, null, null, null, attendance);
    }

}
