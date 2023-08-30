package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotEmpty;

public class UserContactInfoUpdateForm {

	@NotEmpty(message = "O telefone do usuário é obrigatório.")
    private String phoneNumber;
    
    @NotEmpty(message = "O e-mail do usuário é obrigatório.")
    private String email;
    
	public UserContactInfoUpdateForm() {
		super();
	}

	public UserContactInfoUpdateForm(ContactUpdateForm form) {
		this.phoneNumber = form.getPhoneNumber();
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getCleanedPhoneNumber() {
		return phoneNumber.replaceAll("[\\s()-]", "");
	}
    
}
