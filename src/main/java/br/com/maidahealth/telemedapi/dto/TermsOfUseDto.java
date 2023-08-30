package br.com.maidahealth.telemedapi.dto;


import br.com.maidahealth.telemedapi.models.TermsOfUse;

public class TermsOfUseDto {
	
	private String termsOfUse;

	public String getTermsOfUse() {
		return termsOfUse;
	}

	public void setTermsOfUse(String termsOfUse) {
		this.termsOfUse = termsOfUse;
	}

	public TermsOfUseDto(TermsOfUse termsOfUse) {
		this.termsOfUse = termsOfUse.getTerms();
	}

	public static TermsOfUseDto convert(TermsOfUse termsOfUse){
		return new TermsOfUseDto(termsOfUse);
	}
}
