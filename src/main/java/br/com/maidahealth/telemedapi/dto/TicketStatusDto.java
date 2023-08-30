package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.enums.TicketStatus;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class TicketStatusDto {

    private String name, description, type;

    public TicketStatusDto() {
    }

    public TicketStatusDto(TicketStatus ticketStatus) {
        this.name = ticketStatus.name();
        this.description = ticketStatus.getDescription();
        this.type = ticketStatus.getType();
    }

    public static List<TicketStatusDto> convert(TicketStatus[] values) {
        return Stream.of(values).map(TicketStatusDto::new).collect(Collectors.toList());
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getType() {
        return type;
    }
}
