package br.com.maidahealth.telemedapi.form;

public class PaymentOrderForm {

    private String type;
    private Integer installments;
    private String softDescriptor;
    private CardForm card;

    public PaymentOrderForm() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getInstallments() {
        return installments;
    }

    public void setInstallments(Integer installments) {
        this.installments = installments;
    }

    public String getSoftDescriptor() {
        return softDescriptor;
    }

    public void setSoftDescriptor(String softDescriptor) {
        this.softDescriptor = softDescriptor;
    }

    public CardForm getCard() {
        return card;
    }

    public void setCard(CardForm card) {
        this.card = card;
    }

}
