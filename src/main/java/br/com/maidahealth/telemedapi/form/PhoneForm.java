package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotBlank;

public class PhoneForm {

	@NotBlank(message = "número não pode ser vazio")
	private String number;

	public PhoneForm() {
		super();
	}

	public PhoneForm(String number) {
		super();
		this.number = number;
	}

	public String getNumber() {
		return number.replaceAll("[\\s()-]", "");
	}

	public void setNumber(String number) {
		this.number = number;
	}

}
