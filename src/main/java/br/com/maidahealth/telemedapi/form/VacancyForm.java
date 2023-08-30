package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotNull;

public class VacancyForm {
	
	@NotNull(message = "O campo id não deve ser vazio")
	private Long id;

	private String returnReason;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getReturnReason() {
		return returnReason;
	}

	public void setReturnReason(String returnReason) {
		this.returnReason = returnReason;
	}

	
}
