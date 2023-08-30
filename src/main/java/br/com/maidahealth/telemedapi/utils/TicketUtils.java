package br.com.maidahealth.telemedapi.utils;

import br.com.maidahealth.telemedapi.enums.TicketStatus;
import br.com.maidahealth.telemedapi.models.Ticket;
import java.time.*;
import java.util.Date;

public class TicketUtils {

    private TicketUtils() {
    }


    public static String parseToPrettyDate(Ticket ticket) {
        if (TicketStatus.CLOSED.equals(ticket.getStatus())) {
            return Utils.parseToPrettyDate(ticket.getClosedDate());
        }

        String template = new Date().after(ticket.getExpirationDate()) ? "atrasado %d%s" : "faltam %d%s";
        Instant t1 = LocalDateTime.now().toInstant(ZoneOffset.UTC);
        Instant t2 = LocalDateTime.ofInstant(ticket.getExpirationDate().toInstant(), ZoneId.of("UTC")).toInstant(ZoneOffset.UTC);
        Duration duracao = Duration.between(t1, t2);
        long horas = Math.abs(duracao.toHours());
        long dias = Math.abs(duracao.toDays());
        long min = Math.abs(duracao.toMinutes());

        if (dias > 0) {
            return String.format(template, dias, "d");
        }
        if (horas > 0) {
            return String.format(template, horas, "h");
        }

        return String.format(template, min, "m");
    }
}
