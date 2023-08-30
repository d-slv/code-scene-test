package br.com.maidahealth.telemedapi.models;

import br.com.maidahealth.telemedapi.enums.CardTokenType;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class CardToken implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private String number;
    private String holder;
    private String brand;
    private String expirationDate;
    @ManyToOne
    private Insured insured;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(255) default 'CREDIT'")
    private CardTokenType type;

    public CardToken() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getHolder() {
        return holder;
    }

    public void setHolder(String holder) {
        this.holder = holder;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Insured getInsured() {
        return insured;
    }

    public void setInsured(Insured insured) {
        this.insured = insured;
    }

    public CardTokenType getType() {
        return type;
    }

    public void setType(CardTokenType type) {
        this.type = type;
    }
}
