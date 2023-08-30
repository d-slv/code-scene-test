package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotBlank;

public class ChatMessageForm {

	@NotBlank(message = "O type deve ser informado")
	private String type;
	@NotBlank(message = "O text deve ser informado")
	private String body;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String text) {
		this.body = text;
	}

}
