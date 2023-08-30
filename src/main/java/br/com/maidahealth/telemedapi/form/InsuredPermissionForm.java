package br.com.maidahealth.telemedapi.form;

import javax.validation.constraints.NotNull;

public class InsuredPermissionForm {
	
	@NotNull
	public Long id;
	
	@NotNull
	public boolean ableToCreateAttendance;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isAbleToCreateAttendance() {
		return ableToCreateAttendance;
	}

	public void setAbleToCreateAttendance(boolean ableToCreateAttendance) {
		this.ableToCreateAttendance = ableToCreateAttendance;
	}
	
}
