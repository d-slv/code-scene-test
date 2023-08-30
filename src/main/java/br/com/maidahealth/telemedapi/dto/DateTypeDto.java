package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.List;

import br.com.maidahealth.telemedapi.enums.AttendanceDateType;

public class DateTypeDto {
	
	private String name;
	
	private String description;
	
	public DateTypeDto(AttendanceDateType dateType) {
		this.name = dateType.name();
		this.description = dateType.getDescription();
	}
	
	public static List<DateTypeDto> convert(AttendanceDateType[] values) {
		List<DateTypeDto> dtos = new ArrayList<>();
		for (AttendanceDateType attendanceStatus : values) {
			dtos.add(new DateTypeDto(attendanceStatus));
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
