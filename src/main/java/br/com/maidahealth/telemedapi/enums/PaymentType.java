package br.com.maidahealth.telemedapi.enums;

public enum PaymentType {
    CURRENCY("pagamento é feito pelo paciente"),
    PAYMENT_BY_HEALTH_INSURER("pagamento é pelo plano de saúde/cliente");

    private String description;

    PaymentType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
