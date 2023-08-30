package br.com.maidahealth.telemedapi.enums;

public enum ParticipantType {
    
    PATIENT("Paciente"),
    PROFESSIONAL("Profissional");

    private String description;

    private ParticipantType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
