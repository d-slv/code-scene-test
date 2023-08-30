package br.com.maidahealth.telemedapi.enums;

public enum PaymentTransactionTypeEnum {

    AUTHORIZATION("Autorização"),
    CANCEL("Cancelamento"),
    CAPTURE("Captura")
    ;

    private final String description;

    PaymentTransactionTypeEnum(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

}
