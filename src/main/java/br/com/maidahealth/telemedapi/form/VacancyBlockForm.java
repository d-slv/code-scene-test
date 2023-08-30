package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotBlank;

public class VacancyBlockForm {
	
	@NotBlank(message = "O campo da descrição do motivo de bloqueio não deve ser vazio")
	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
