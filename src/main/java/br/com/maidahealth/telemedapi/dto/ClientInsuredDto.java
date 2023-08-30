package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.models.CardToken;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.utils.Utils;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import org.apache.commons.lang3.StringUtils;

import java.util.*;

public class ClientInsuredDto {

	@JsonView(Views.UpdateProfile.class)
	private Object id;

	private Object holderId;

	@JsonView(Views.UpdateProfile.class)
	private String name;

	@JsonView(Views.UpdateProfile.class)
	private String cpf;

	@JsonView(Views.UpdateProfile.class)
	private String healthInsuranceNumber;

	@JsonView(Views.UpdateProfile.class)
	private String email;

	@JsonView(Views.UpdateProfile.class)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "GMT")
	private Date birthdate;

	@JsonView(Views.UpdateProfile.class)
	private String rg;

	@JsonView(Views.UpdateProfile.class)
	private String rgIssuer;

	@JsonView(Views.UpdateProfile.class)
	private String cns;

	@JsonView(Views.UpdateProfile.class)
	private GenderEnum gender;

	@JsonView(Views.UpdateProfile.class)
	private String phoneNumber;

	private String ddd;

	@JsonView(Views.UpdateProfile.class)
	private ClientAddressDto address;

	@JsonView(Views.UpdateProfile.class)
	private Set<ClientCardTokenDto> cardTokens;

	public ClientInsuredDto() {
	}

	public ClientInsuredDto(Insured insured) {
		this.id = insured.getId();
		this.holderId = Optional.ofNullable(insured.getHolder()).map(Insured::getId).orElse(null);
		this.name = insured.getName();
		this.cpf = insured.getCpf();
		this.healthInsuranceNumber = insured.getHealthInsuranceNumber();
		this.email = Optional.ofNullable(insured.getUser()).map(User::getEmail).orElse(null);
		this.birthdate = insured.getBirthDate();
		this.rg = insured.getRegistrationNumber();
		this.rgIssuer = null;
		this.cns = null;
		this.gender = null;
		// this.ddd = Optional.ofNullable().map(pn -> pn.length() >= 8 ? pn.substring(0,2) : null).orElse(null);
		// this.phoneNumber = Optional.ofNullable(insured.getLastPhoneNumber()).map(pn -> pn.length() >= 8 ? pn.substring(2, pn.length()) : null).orElse(null);
		this.phoneNumber = insured.getLastPhoneNumber();
		this.address = new ClientAddressDto();
		this.cardTokens = converteToCardTokenToDto(insured.getCardTokens());
	}

	public Set<ClientCardTokenDto> converteToCardTokenToDto(Set<CardToken> cardTokens) {
		Set<ClientCardTokenDto> card = new HashSet<>();

		for (CardToken cardToken : cardTokens) {
			card.add(new ClientCardTokenDto(cardToken));
		}
		return card;
	}

	public Object getId() {
		return id;
	}

	public void setId(Object id) {
		this.id = id;
	}

	public Object getHolderId() {
		return holderId;
	}

	public void setHolderId(Object holderId) {
		this.holderId = holderId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getHealthInsuranceNumber() {
		return healthInsuranceNumber;
	}

	public void setHealthInsuranceNumber(String healthInsuranceNumber) {
		this.healthInsuranceNumber = healthInsuranceNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getRgIssuer() {
		return rgIssuer;
	}

	public void setRgIssuer(String rgIssuer) {
		this.rgIssuer = rgIssuer;
	}

	public String getCns() {
		return cns;
	}

	public void setCns(String cns) {
		this.cns = cns;
	}

	public GenderEnum getGender() {
		return gender;
	}

	public void setGender(GenderEnum gender) {
		this.gender = gender;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public ClientAddressDto getAddress() {
		return address;
	}

	public void setAddress(ClientAddressDto address) {
		this.address = address;
	}

	public String getDdd() {
		return ddd;
	}

	public void setDdd(String ddd) {
		this.ddd = ddd;
	}

	public Set<ClientCardTokenDto> getCardTokens() {
		return cardTokens;
	}

	public void setCardTokens(Set<ClientCardTokenDto> cardTokens) {
		this.cardTokens = cardTokens;
	}

	public String getCleanedCpf() {
		if(!StringUtils.isEmpty(cpf)) {
			String cpfOnlyDigits = cpf.replaceAll("[\\s()-.]", "");
			return Utils.complete(cpfOnlyDigits, 11, "0");
		}
		return null;
	}

	public static ClientInsuredDto convert(Insured insured) {
    	return new ClientInsuredDto(insured);
	}
}
