package br.com.maidahealth.telemedapi.validator;

public class ErrorFormDto {
	
	private String campo;
	private String erro;
	
	public ErrorFormDto(String campo, String erro) {
		this.campo = campo;
		this.erro = erro;
	}

	public String getCampo() {
		return campo;
	}

	public String getErro() {
		return erro;
	}
	
}
