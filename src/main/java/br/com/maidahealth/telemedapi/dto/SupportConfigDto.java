package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.SupportConfig;

public class SupportConfigDto {

    private Integer deadline;

    public SupportConfigDto(SupportConfig config) {
        this.deadline = config.getDeadline();
    }

    public Integer getDeadline() {
        return deadline;
    }

    public void setDeadline(Integer deadline) {
        this.deadline = deadline;
    }
}
