package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.Attendance;

public class AttendanceCreatedByClientDto {
	
	private String url;
	
	private AttendanceDto attendance;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public AttendanceDto getAttendance() {
		return attendance;
	}

	public void setAttendance(AttendanceDto attendance) {
		this.attendance = attendance;
	}

	public static AttendanceCreatedByClientDto convert(Attendance att) {
		AttendanceCreatedByClientDto dto = new AttendanceCreatedByClientDto();		
		dto.setAttendance(AttendanceDto.convert(att, false, null, null, null, null));
		return dto;
	}

}
