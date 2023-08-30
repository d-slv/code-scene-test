package br.com.maidahealth.telemedapi.enums;

public enum PaymentMethod {

    CREDIT ("CreditCard"),
    DEBIT ("DebitCard"),
    QR ("QRCode"),
    TRANSFER ("EletronicTransfer");

    String description;

    PaymentMethod(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
