package br.com.maidahealth.telemedapi.form;

public class QueuePositionForm {

    private Long insuredId;

    private String chatbotId;
    
    private Long specialtyId;

    private PaymentOrderForm payment;

    public QueuePositionForm() {
    }

    public QueuePositionForm(Long insuredId, String chatbotId, Long specialtyId) {
        this.insuredId = insuredId;
        this.chatbotId = chatbotId;
        this.specialtyId = specialtyId;
    }

    public Long getInsuredId() {
        return insuredId;
    }

    public void setInsuredId(Long insuredId) {
        this.insuredId = insuredId;
    }

    public String getChatbotId() {
        return chatbotId;
    }

    public void setChatbotId(String chatbotId) {
        this.chatbotId = chatbotId;
    }

	public Long getSpecialtyId() {
		return specialtyId;
	}

	public void setSpecialtyId(Long specialtyId) {
		this.specialtyId = specialtyId;
	}

    public PaymentOrderForm getPayment() {
        return payment;
    }

    public void setPayment(PaymentOrderForm payment) {
        this.payment = payment;
    }
}
