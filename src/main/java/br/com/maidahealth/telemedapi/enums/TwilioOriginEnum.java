package br.com.maidahealth.telemedapi.enums;

public enum TwilioOriginEnum {
    WEB("web"),
    MOBILE("mobile");

    private String description;

    TwilioOriginEnum(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
