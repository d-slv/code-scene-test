package br.com.maidahealth.telemedapi.form;

import java.util.Date;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import br.com.maidahealth.telemedapi.customvalidations.ValidLoginForm;
import br.com.maidahealth.telemedapi.enums.LoginTypeEnum;

@ValidLoginForm
public class LoginForm {

	private String login;

	private String password;
	
	private String cpf;
	
	private String registrationNumber;
	
	private Date birthDate;
	
	private LoginTypeEnum type;
	
	private String healthInsuranceNumber;

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRegistrationNumber() {
		return registrationNumber;
	}

	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public LoginTypeEnum getType() {
		return type;
	}

	public void setType(LoginTypeEnum type) {
		this.type = type;
	}
	
	public String getHealthInsuranceNumber() {
		return healthInsuranceNumber;
	}

	public void setHealthInsuranceNumber(String healthInsuranceNumber) {
		this.healthInsuranceNumber = healthInsuranceNumber;
	}

	public UsernamePasswordAuthenticationToken convert() {
		return new UsernamePasswordAuthenticationToken(login,password);
	}
	
}
