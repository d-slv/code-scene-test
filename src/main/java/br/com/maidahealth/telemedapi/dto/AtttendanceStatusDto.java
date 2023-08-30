package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.List;

import br.com.maidahealth.telemedapi.models.AttendanceStatus;

public class AtttendanceStatusDto {
	
	private String name;
	
	private String description;
	
	public AtttendanceStatusDto(AttendanceStatus status) {
		super();
		this.name = status.name();
		this.description = status.getDescription();
	}

	public static List<AtttendanceStatusDto> convert(AttendanceStatus[] values) {
		List<AtttendanceStatusDto> dtos = new ArrayList<>();
		for (AttendanceStatus attendanceStatus : values) {
			dtos.add(new AtttendanceStatusDto(attendanceStatus));
		}
		return dtos;
	}

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

	
}
