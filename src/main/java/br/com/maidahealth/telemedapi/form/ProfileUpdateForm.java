package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotNull;

import br.com.maidahealth.telemedapi.enums.GenderEnum;

public class ProfileUpdateForm {

    @NotNull(message = "Obrigatório informar o nome")
    private String name;

    @NotNull(message = "Obrigatório informar a data de nascimento")
    private String birthdate;

    @NotNull(message = "Obrigatório informar o sexo")
    private GenderEnum gender;
    
    public ProfileUpdateForm() {
		super();
	}

	public ProfileUpdateForm(UserProfileUpdateForm form) {
		this.name = form.getName();
		this.gender = form.getGenderEnum();
		this.birthdate = form.getBirthDate();
	}

	public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

}
