package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.enums.VacancyStatus;

public class VacancyScheduleSummaryDto {

    private Double used, available, blocked, canceled;

    public VacancyScheduleSummaryDto() {
    }

    public VacancyScheduleSummaryDto(Double used, Double available, Double blocked, Double canceled) {
        this.used = used;
        this.available = available;
        this.blocked = blocked;
        this.canceled = canceled;
    }

    public Double getUsed() {
        return used;
    }

    public void setUsed(Double used) {
        this.used = used;
    }

    public Double getAvailable() {
        return available;
    }

    public void setAvailable(Double available) {
        this.available = available;
    }

    public Double getTotal() {
        return this.available + this.canceled + this.blocked + this.used;
    }


    public Double getBlocked() {
        return blocked;
    }

    public void setBlocked(Double blocked) {
        this.blocked = blocked;
    }

    public Double getCanceled() {
        return canceled;
    }

    public void setCanceled(Double canceled) {
        this.canceled = canceled;
    }

    public void setValue(double value, VacancyStatus status) {
        switch (status) {
            case AVAILABLE:
                this.setAvailable(value);
                break;
            case USED:
                this.setUsed(value);
                break;
            case BLOCKED:
                this.setBlocked(value);
                break;
            case CANCELED:
                this.setCanceled(value);
                break;
            default:
        }
    }
}
