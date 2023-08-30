package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotBlank;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.utils.Utils;

public class UserForm {
	
	private String id;
	
	@NotBlank(message = "nome não pode ser vazio")
	private String name;
	
	@NotBlank(message = "login não pode ser vazio")
	private String login;
	
	@NotBlank(message = "e-mail não pode ser vazio")
	private String email;
	
	private String password;
	
	private String phoneNumber;

	@NotBlank(message = "perfil não pode ser vazio")
	private String profile;

	private String providerId;

	private String professionalId;

	private String InsuredId;

	public String getLogin() {
		return login;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public User toUser() {
		User userModel = new User();
		return merge(userModel);
	}
	
	public User merge(User userModel) {
		if(!Utils.isEmpty(login)) {
			userModel.setLogin(this.login);
		}
		if(!Utils.isEmpty(password)) {
			userModel.setPassword(new BCryptPasswordEncoder().encode(this.password));
		}
		if(!Utils.isEmpty(email)) {
			userModel.setEmail(this.email);
		}
		if(!Utils.isEmpty(name)) {
			userModel.setName(this.name);
		}
		if(!Utils.isEmpty(phoneNumber)) {
			userModel.setPhoneNumber(this.phoneNumber);
		}
		return userModel;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public String getProviderId() {
		return providerId;
	}

	public void setProviderId(String providerId) {
		this.providerId = providerId;
	}

	public String getProfessionalId() {
		return professionalId;
	}

	public void setProfessionalId(String professionalId) {
		this.professionalId = professionalId;
	}

	public synchronized String getInsuredId() {
		return InsuredId;
	}

	public synchronized void setInsuredId(String insuredId) {
		InsuredId = insuredId;
	}
}
