package br.com.maidahealth.telemedapi.dto;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import javax.swing.text.MaskFormatter;

import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Profile;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.utils.Utils;

public class UserDto {

	private String urlProfile;
	
	private String name;
	
	private String cpf;

	private String email;
	
	private String phoneNumber;
	
	private String login;
	
	private List<String> profiles = new ArrayList<String>();
	
	private String healthInsuranceNumber;

	private Boolean termsAccepted;
	
	private String insuredType;
	
	private String gender;
	
	private String birthDate;

	public UserDto(User user) {
		super();
		this.name = Utils.convertStringLikePersonName(user.getName());
		this.login = user.getLogin();
		this.email = user.getEmail();
		this.phoneNumber = user.getPhoneNumber();
		this.cpf = user.getCpf();
		this.healthInsuranceNumber = user.getHealthInsuranceNumber();
		this.insuredType = user.getInsuredType();
		this.termsAccepted = user.getTermsAccepted();
		this.gender = user.getGender() != null ? user.getGender().name() : "";
		this.birthDate = getBirthDate(user);
		for (Profile p : user.getProfiles()) {
			this.profiles.add(p.getName());
		}
	}
	
	private String getBirthDate(User user) {
		if(user.getBirthDate() != null) {
			return Utils.format(user.getBirthDate(), "yyyy-MM-dd");
		}
		if(user.isInsured()) {
			Insured insured = user.getInsured();
			return insured.getBirthDate() != null ? Utils.format(insured.getBirthDate(), "yyyy-MM-dd") : null;
		}
		return null;
	}

	public String getName() {
		return name;
	}

	public String getLogin() {
		return login;
	}

	public String getEmail() {
		return email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	public static UserDto convert(User user) {
		if(user.isSecretary()) {
			return new SecretaryDto(user);
		}
		return new UserDto(user);
	}

	public List<String> getProfiles() {
		return profiles;
	}

	public void setProfiles(List<String> profiles) {
		this.profiles = profiles;
	}

	public String getUrlProfile() {
		return urlProfile;
	}

	public void setUrlProfile(String urlProfile) {
		this.urlProfile = urlProfile;
	}

	public String getCpf() {
		MaskFormatter mask;
		try {
			mask = new MaskFormatter("###.###.###-##");
			mask.setValueContainsLiteralCharacters(false);
			return mask.valueToString(cpf);
		} catch (ParseException e) {
			// e.printStackTrace();
		}
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public synchronized String getHealthInsuranceNumber() {
		return healthInsuranceNumber;
	}

	public synchronized void setHealthInsuranceNumber(String healthInsuranceNumber) {
		this.healthInsuranceNumber = healthInsuranceNumber;
	}

	public synchronized String getInsuredType() {
		return insuredType;
	}

	public synchronized void setInsuredType(String insuredType) {
		this.insuredType = insuredType;
	}

	public Boolean getTermsAccepted() {
		return termsAccepted;
	}

	public void setTermsAccepted(Boolean termsAccepted) {
		this.termsAccepted = termsAccepted;
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
}
