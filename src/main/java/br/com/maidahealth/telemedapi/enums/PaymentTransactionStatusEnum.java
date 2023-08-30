package br.com.maidahealth.telemedapi.enums;

public enum PaymentTransactionStatusEnum {

    ERROR("Erro"),
    SUCCESS("Sucesso")
    ;


    private final String description;

    PaymentTransactionStatusEnum(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

}
