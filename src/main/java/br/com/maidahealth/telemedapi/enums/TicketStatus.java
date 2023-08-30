package br.com.maidahealth.telemedapi.enums;

public enum TicketStatus {

    OPENED("aberto", "NOT_FINISHED"),
    ON_GOING("em andamento", "NOT_FINISHED"),
    CLOSED("fechado", "FINISHED");

    String description, type;

    TicketStatus(String description, String type) {
        this.description = description;
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public String getType() {
        return type;
    }
}
