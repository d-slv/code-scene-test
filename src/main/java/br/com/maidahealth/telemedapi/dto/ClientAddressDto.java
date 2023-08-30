package br.com.maidahealth.telemedapi.dto;

import com.fasterxml.jackson.annotation.JsonView;

public class ClientAddressDto {

	@JsonView(Views.UpdateProfile.class)
	private String street;

	@JsonView(Views.UpdateProfile.class)
	private String number;

	private String complement;

	@JsonView(Views.UpdateProfile.class)
	private String neighborhood;

	@JsonView(Views.UpdateProfile.class)
	private String publicPlace;

	@JsonView(Views.UpdateProfile.class)
	private String zipCode;

	private String city;

	private String state;

	private String fullAddress;

	@JsonView(Views.UpdateProfile.class)
	private Integer ibgeCode;

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

	public String getComplement() {
		return complement;
	}

	public void setComplement(String complement) {
		this.complement = complement;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public String getPublicPlace() {
		return publicPlace;
	}

	public void setPublicPlace(String publicPlace) {
		this.publicPlace = publicPlace;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getFullAddress() {
		return fullAddress;
	}

	public void setFullAddress(String fullAddress) {
		this.fullAddress = fullAddress;
	}

	public Integer getIbgeCode() {
		return ibgeCode;
	}

	public void setIbgeCode(Integer ibgeCode) {
		this.ibgeCode = ibgeCode;
	}

}
