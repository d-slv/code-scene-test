package br.com.maidahealth.telemedapi.form;

import br.com.maidahealth.telemedapi.models.Specialty;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class SpecialtyForm {

	@NotNull(message = "Valor de urgência não pode ser vazio")
	@DecimalMin(value = "0.00", message = "Valor de urgência deve ser maior ou igual a zero")
	private BigDecimal urgencyValue;
	
	@NotNull(message = "Valor eletivo não pode ser vazio")
	@DecimalMin(value = "0.00", message = "Valor eletivo deve ser maior ou igual a zero")
	private BigDecimal electiveValue;

	@NotNull(message = "Disponibilidade para urgência é obrigatória")
	private Boolean availableForUrgency;
	
	@NotNull(message = "Disponibilidade para eletiva é obrigatória")
	private Boolean availableForElective;

	public SpecialtyForm() {
	}

	public BigDecimal getUrgencyValue() {
		return urgencyValue;
	}

	public void setUrgencyValue(BigDecimal urgencyValue) {
		this.urgencyValue = urgencyValue;
	}

	public BigDecimal getElectiveValue() {
		return electiveValue;
	}

	public void setElectiveValue(BigDecimal electiveValue) {
		this.electiveValue = electiveValue;
	}

	public Boolean getAvailableForUrgency() {
		return availableForUrgency;
	}

	public void setAvailableForUrgency(Boolean availableForUrgency) {
		this.availableForUrgency = availableForUrgency;
	}

	public Boolean getAvailableForElective() {
		return availableForElective;
	}

	public void setAvailableForElective(Boolean availableForElective) {
		this.availableForElective = availableForElective;
	}

	public Specialty toSpecialty() {
		Specialty specialtyModel = new Specialty();
		return merge(specialtyModel);
	}

	public Specialty merge(Specialty specialty) {
		specialty.setCurrentUrgencyValue(urgencyValue.doubleValue());
		specialty.setCurrentElectiveValue(electiveValue.doubleValue());
		specialty.setAvailableForElective(availableForElective);
		specialty.setAvailableForUrgency(availableForUrgency);
		return specialty;
	}

}
