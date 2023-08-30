package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotBlank;

import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.InsuredType;
import br.com.maidahealth.telemedapi.utils.Utils;

public class InsuredClientForm {

	@NotBlank(message = "email não pode ser vazio")
	private String email;

	private String cpf;

	@NotBlank(message = "nome não pode ser vazio")
	private String name;
	
	private String phoneNumber;
		
	public InsuredClientForm() {
		super();
	}

	public InsuredClientForm(String cpf, String name, String email, String phoneNumber) {
		super();
		this.cpf = cpf;
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
	}

	public String getCpf() {
		if(Utils.isEmpty(this.cpf))
			return "";
		return cpf.replaceAll("[\\s()-.]", "");
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public synchronized String getPhoneNumber() {
		return phoneNumber;
	}

	public synchronized void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Insured toInsured() {
		return new Insured(getCpf(), getName(), getCpf(), InsuredType.HOLDER, null, null);
	}

	public void merge(Insured insured) {
		if(!Utils.isEmpty(getCpf())) {
			insured.setCpf(getCpf());
		}
		if(!Utils.isEmpty(name)) {
			insured.setName(name);
		}
	}

	public boolean isPhoneValid() {
		if(Utils.isEmpty(getPhoneNumber()))
			return true;
			
		return getPhoneNumber().replaceAll("[\\s()-]", "").matches("[0-9]{11}");
	}

	public boolean isCpfValid() {
		return getCpf().matches("[0-9]{11}");
	}
}
