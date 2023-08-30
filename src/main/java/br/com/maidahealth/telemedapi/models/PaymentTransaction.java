package br.com.maidahealth.telemedapi.models;

import br.com.maidahealth.telemedapi.enums.PaymentTransactionStatusEnum;
import br.com.maidahealth.telemedapi.enums.PaymentTransactionTypeEnum;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class PaymentTransaction implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private final PaymentTransactionStatusEnum status;

    @Enumerated(EnumType.STRING)
    private final PaymentTransactionTypeEnum type;

    @Temporal(TemporalType.TIMESTAMP)
    private final Date createdAt;

    @ManyToOne(optional = false)
    private final Attendance attendance;

    @ManyToOne
    private final CardToken cardToken;

	@Column(columnDefinition="TEXT")
	private String details;

	private PaymentTransaction(Builder builder) {
        this.status = builder.status;
        this.type = builder.type;
        this.details = builder.details;
        this.createdAt = new Date();
        this.attendance = builder.attendance;
        this.cardToken = builder.cardToken;
    }

    public static class Builder {
        private PaymentTransactionStatusEnum status;
        private PaymentTransactionTypeEnum type;
        private String details;
        private Attendance attendance;
        private CardToken cardToken;

        public Builder() {
        }

        public Builder status(PaymentTransactionStatusEnum status) {
            this.status = status;
            return this;
        }

        public Builder type(PaymentTransactionTypeEnum type) {
            this.type = type;
            return this;
        }

        public Builder details(String details) {
            this.details = details;
            return this;
        }

        public Builder attendace(Attendance attendance) {
            this.attendance = attendance;
            return this;
        }

        public Builder cardToken(CardToken cardToken) {
            this.cardToken = cardToken;
            return this;
        }

        public PaymentTransaction build() {
            return new PaymentTransaction(this);
        }
    }

    public Long getId() {
        return id;
    }

    public PaymentTransactionStatusEnum getStatus() {
        return status;
    }

    public PaymentTransactionTypeEnum getType() {
        return type;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Attendance getAttendance() {
        return attendance;
    }

    public CardToken getCardToken() {
        return cardToken;
    }

    public String getDetails() {
        return details;
    }

}

