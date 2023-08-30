package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.List;

import br.com.maidahealth.telemedapi.models.SchedulingType;

public class ScheduleTypeDto {

	private String schedulingType;
	
	public ScheduleTypeDto(String schedulingType) {
		this.schedulingType = schedulingType;
	}

	public static List<ScheduleTypeDto> convert(SchedulingType[] types){
		List<ScheduleTypeDto> list = new ArrayList<>();
		for (SchedulingType schedulingType : types) {
			list.add(new ScheduleTypeDto(schedulingType.getDescription()));
		}
		return list;
	}

	public String getSchedulingType() {
		return schedulingType;
	}

	public void setSchedulingType(String schedulingType) {
		this.schedulingType = schedulingType;
	}
}
