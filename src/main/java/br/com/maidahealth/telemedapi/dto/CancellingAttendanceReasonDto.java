package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;

public class CancellingAttendanceReasonDto {
	
	private String id;
	
	private String description;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static CancellingAttendanceReasonDto convert(CancellingAttendanceReasonEnum reason) {
		CancellingAttendanceReasonDto reasonDto = new CancellingAttendanceReasonDto();
		reasonDto.setId(reason.name());
		reasonDto.setDescription(reason.getDescription());
		
		return reasonDto;
	}
	
}
