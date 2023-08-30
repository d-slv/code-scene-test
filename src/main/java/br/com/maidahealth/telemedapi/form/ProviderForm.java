package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotBlank;

import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.utils.Utils;

public class ProviderForm {

	@NotBlank(message = "O cnpj deve ser informado")
	private String cnpj;
	
	@NotBlank(message = "O nome deve ser informado")
	private String name;
	
	private Boolean makeUrgencyCare;
	
	private Boolean makeElectiveCare;

	public String getCnpj() {
		return cnpj;
	}

	public String getName() {
		return name;
	}

	public Boolean isMakeUrgencyCare() {
		return makeUrgencyCare;
	}

	public Boolean isMakeElectiveCare() {
		return makeElectiveCare;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setMakeUrgencyCare(Boolean makeUrgencyCare) {
		this.makeUrgencyCare = makeUrgencyCare;
	}

	public void setMakeElectiveCare(Boolean makeElectiveCare) {
		this.makeElectiveCare = makeElectiveCare;
	}

	public Provider toProvider() {
		return new Provider(cnpj, name, makeUrgencyCare, makeElectiveCare);
	}

	public void merge(Provider provider) {
		if(!Utils.isEmpty(name)) {
			provider.setName(name);
		}
		if(makeUrgencyCare != null) {
			provider.setMakeUrgencyCare(makeUrgencyCare);
		}
		if(makeElectiveCare != null) {
			provider.setMakeElectiveCare(makeElectiveCare);
		}
		
	}
	
}
