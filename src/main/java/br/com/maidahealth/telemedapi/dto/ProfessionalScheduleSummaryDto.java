package br.com.maidahealth.telemedapi.dto;

public class ProfessionalScheduleSummaryDto {

    private Double online, total;

    public ProfessionalScheduleSummaryDto() {
    }

    public ProfessionalScheduleSummaryDto(Double online, Double total) {
        this.online = online;
        this.total = total;
    }

    public Double getOnline() {
        return online;
    }

    public void setOnline(Double online) {
        this.online = online;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}
