package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.enums.CardTokenType;
import com.fasterxml.jackson.databind.JsonNode;

public class CardBinDto {

	private String status;
	private String provider;
	private CardTokenType cardType;
	private boolean foreignCard;
	private boolean corporateCard;
	private String issuer;
	private String issuerCode;

	public CardBinDto(String status, String provider, CardTokenType cardType, boolean foreignCard, boolean corporateCard, String issuer, String issuerCode) {
		this.status = status;
		this.provider = provider;
		this.cardType = cardType;
		this.foreignCard = foreignCard;
		this.corporateCard = corporateCard;
		this.issuer = issuer;
		this.issuerCode = issuerCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}

	public CardTokenType getCardType() {
		return cardType;
	}

	public void setCardType(CardTokenType cardType) {
		this.cardType = cardType;
	}

	public boolean isForeignCard() {
		return foreignCard;
	}

	public void setForeignCard(boolean foreignCard) {
		this.foreignCard = foreignCard;
	}

	public boolean isCorporateCard() {
		return corporateCard;
	}

	public void setCorporateCard(boolean corporateCard) {
		this.corporateCard = corporateCard;
	}

	public String getIssuer() {
		return issuer;
	}

	public void setIssuer(String issuer) {
		this.issuer = issuer;
	}

	public String getIssuerCode() {
		return issuerCode;
	}

	public void setIssuerCode(String issuerCode) {
		this.issuerCode = issuerCode;
	}


	public static CardBinDto converterFromBinResponse(JsonNode jsonNode){

		String status = "";
		switch (jsonNode.get("Status").asText()){
			case "00":
				status = "Análise autorizada";
				break;
			case "01":
				status = "Bandeira não suportada";
				break;
			case "02":
				status = "Cartão não suportado na consulta de bin";
				break;
			case "73":
				status = "Afiliação bloqueada";
				break;
			default: break;
		}

		CardTokenType cardType = null;
		switch (jsonNode.get("CardType").asText()){
			case "Crédito":
				cardType = CardTokenType.CREDIT;
				break;
			case "Débito":
				cardType = CardTokenType.DEBIT;
				break;
			case "Multiplo":
				cardType = CardTokenType.MULTIPLE;
				break;
			default:break;
		}


		return new CardBinDto(
				status,
				jsonNode.get("Provider").asText(),
				cardType,
				jsonNode.get("ForeignCard").asBoolean(),
				jsonNode.get("CorporateCard").asBoolean(),
				jsonNode.get("Issuer").asText(),
				jsonNode.get("IssuerCode").asText());
	}
}
