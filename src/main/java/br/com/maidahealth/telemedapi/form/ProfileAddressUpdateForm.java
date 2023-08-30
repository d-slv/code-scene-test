package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class ProfileAddressUpdateForm {

    @NotEmpty(message = "Obrigatório informar a rua")
    private String street;

    @NotEmpty(message = "Obrigatório informar o número")
    private String number;

    @NotEmpty(message = "Obrigatório informar o bairro")
    private String neighborhood;

    @NotEmpty(message = "Obrigatório informar o cep")
    private String zipCode;

    @NotNull(message = "Obrigatório informar o código do ibge")
    private Integer ibgeCode;

    @NotEmpty(message = "Obrigatório informar o complemento")
    private String publicPlace;

    @NotEmpty(message = "Obrigatório informar o estado")
    private String state;


    public ProfileAddressUpdateForm() {
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public Integer getIbgeCode() {
        return ibgeCode;
    }

    public void setIbgeCode(Integer ibgeCode) {
        this.ibgeCode = ibgeCode;
    }

    public String getPublicPlace() {
        return publicPlace;
    }

    public void setPublicPlace(String publicPlace) {
        this.publicPlace = publicPlace;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
