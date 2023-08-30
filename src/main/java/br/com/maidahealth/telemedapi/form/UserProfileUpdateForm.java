package br.com.maidahealth.telemedapi.form;

import java.util.Date;
import java.util.stream.Stream;

import javax.validation.constraints.NotEmpty;

import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.utils.Utils;

public class UserProfileUpdateForm {

	@NotEmpty(message = "Obrigatório informar o nome")
	private String name;
	
	@NotEmpty(message = "Obrigatório informar a data de nascimento")
	private String birthDate;
	
	@NotEmpty(message = "Obrigatório informar o sexo")
	private String gender;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}
	
	public Date getBirthDateParsed() {
		return Utils.parse(this.birthDate, "yyyy-MM-dd");
	}
	
	public GenderEnum getGenderEnum() {
		return Stream.of(GenderEnum.values()).filter(g-> g.name().equals(this.gender.toUpperCase())).findFirst().get();
	}
	
}
