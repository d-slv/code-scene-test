package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.Attendance;

public class CurrentAttendanceDto {
	
	private Long id;
	
	public CurrentAttendanceDto(Attendance attendance) {
		super();
		this.id = (attendance != null) ? attendance.getId() : null;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
