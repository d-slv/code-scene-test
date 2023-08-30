package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.enums.ReturnAttendanceReasonEnum;

public class AttendanceReasonDto {
	
	private String name;
	
	private String description;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static AttendanceReasonDto convert(ReturnAttendanceReasonEnum reason) {
		AttendanceReasonDto reasonDto = new AttendanceReasonDto();
		reasonDto.setName(reason.name());
		reasonDto.setDescription(reason.getDescription());
		
		return reasonDto;
	}
}
