package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.CardToken;

public class ClientCardTokenDto {

    private Long id;
    private String number;
    private String holder;
    private String brand;

    public ClientCardTokenDto(CardToken cardToken) {
        this.id = cardToken.getId();
        this.number = cardToken.getNumber();
        this.holder = cardToken.getHolder();
        this.brand = cardToken.getBrand();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
