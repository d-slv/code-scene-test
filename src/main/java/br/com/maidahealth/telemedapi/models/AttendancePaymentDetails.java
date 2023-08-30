package br.com.maidahealth.telemedapi.models;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Optional;

import javax.persistence.*;

import br.com.maidahealth.telemedapi.enums.CardTokenType;
import br.com.maidahealth.telemedapi.enums.PaymentDetailsStatusEnum;

@Entity
public class AttendancePaymentDetails implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer installments;

    private String transactionId;

    @Enumerated(EnumType.STRING)
    private PaymentDetailsStatusEnum status;

    private String paymentId;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private CardTokenType cardTokenType;

    public AttendancePaymentDetails() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getInstallments() {
        return installments;
    }

    public void setInstallments(Integer installments) {
        this.installments = installments;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public PaymentDetailsStatusEnum getStatus() {
        return status;
    }

    public void setStatus(PaymentDetailsStatusEnum status) {
        this.status = status;
    }

    public int priceToInt() {
        return Optional.ofNullable(this.price)
                .map(price -> {
                    BigDecimal plus = price.multiply(BigDecimal.valueOf(100));
                    return plus.intValue();
                }).orElse(0);
    }

    public CardTokenType getCardTokenType() {
        return cardTokenType;
    }

    public void setCardTokenType(CardTokenType cardTokenType) {
        this.cardTokenType = cardTokenType;
    }
}
