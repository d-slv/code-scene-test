package br.com.maidahealth.telemedapi.enums;

public enum CardTokenType {

    CREDIT("Credit"), DEBIT("Debit"), MULTIPLE("Multiple");

    private final String description;

    CardTokenType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
