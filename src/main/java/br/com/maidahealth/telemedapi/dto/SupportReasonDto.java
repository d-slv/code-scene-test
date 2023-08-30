package br.com.maidahealth.telemedapi.dto;


import br.com.maidahealth.telemedapi.models.SupportReason;

public class SupportReasonDto {

    private Long id;

    private String reason;

    private String adminTitle;

    private SupportConfigDto supportConfig;

    public SupportReasonDto(SupportReason supportReason) {
        this.id = supportReason.getId();
        this.reason = supportReason.getDescription();
        this.adminTitle = supportReason.getAdminTitle();
        this.supportConfig = new SupportConfigDto(supportReason.getConfig());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public SupportConfigDto getSupportConfig() {
        return supportConfig;
    }

    public void setSupportConfig(SupportConfigDto supportConfig) {
        this.supportConfig = supportConfig;
    }

    public String getAdminTitle() {
        return adminTitle;
    }

    public void setAdminTitle(String adminTitle) {
        this.adminTitle = adminTitle;
    }
}
