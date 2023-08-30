package br.com.maidahealth.telemedapi.enums;

public enum AccountCancellationReasonEnum {


	SPECIALTY_NOT_FOUND("Não encontrei a especialidade desejada"),
	UNUSED("Não estou usando a plataforma"),
	INSURED_REGISTRATION("Cadastro do segurado"),
	OTHER("Outro motivo");

	private AccountCancellationReasonEnum(String description) {
		this.description = description;
	}

	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
