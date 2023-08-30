package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.enums.CardTokenType;
import br.com.maidahealth.telemedapi.models.CardToken;

public class CardDto {
	
	private String name;
	
	private String brand;
	
	private String number;
	
	private Long cardTokenId;

	private CardTokenType type;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public Long getCardTokenId() {
		return cardTokenId;
	}

	public void setCardTokenId(Long cardTokenId) {
		this.cardTokenId = cardTokenId;
	}

	public CardTokenType getType() {
		return type;
	}

	public void setType(CardTokenType type) {
		this.type = type;
	}

	public static CardDto convert(CardToken card) {
		CardDto dto = new CardDto();
		dto.setBrand(card.getBrand());
		dto.setCardTokenId(card.getId());
		dto.setName(card.getHolder());
		dto.setNumber(card.getNumber());
		dto.setType(card.getType());
		return dto;
	}
	
}
