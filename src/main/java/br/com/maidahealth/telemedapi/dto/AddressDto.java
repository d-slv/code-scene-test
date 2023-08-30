package br.com.maidahealth.telemedapi.dto;

import java.io.Serializable;

import br.com.maidahealth.telemedapi.models.Address;



public class AddressDto implements Serializable {

	private static final long serialVersionUID = -5563285607460565965L;

	private String street;

	private String number;

	private String complement;
	
	private String neighborhood;
	
	private String publicPlace;

	private String zipCode;

	private String city;

	private String state;

	private String fullAddress;
	
	private Integer ibgeCode;

	public AddressDto() {
	}

	public AddressDto(Address address) {
		this.street = address.getStreet();
		this.number = address.getNumber();
		this.neighborhood = address.getNeighborhood();
		this.publicPlace = address.getPublicPlace();
		this.zipCode = address.getZipCode();
		this.city = address.getCity();
		this.state = address.getState();
		this.fullAddress = address.getStreet() + ", " + address.getNumber() + ". " + address.getNeighborhood() + ". " + address.getCity() + ", " + address.getState();
		this.ibgeCode = address.getIbgeCode();
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

	public String getPublicPlace() {
		return publicPlace;
	}

	public void setPublicPlace(String publicPlace) {
		this.publicPlace = publicPlace;
	}

	public static AddressDto convert(Address address) {
		return address != null ? new AddressDto(address) : null;
	}
}
