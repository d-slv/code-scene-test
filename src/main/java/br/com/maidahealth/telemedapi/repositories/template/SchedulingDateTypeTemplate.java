package br.com.maidahealth.telemedapi.repositories.template;

import br.com.maidahealth.telemedapi.enums.AttendanceDateType;

public class SchedulingDateTypeTemplate extends DateTypeTemplate{

	@Override
	public String getElectiveDate() {
		return AttendanceDateType.SCHEDULING.getProperty();
	}

	@Override
	public String getUrgencyDate() {
		return AttendanceDateType.SCHEDULING.getProperty();
	}

}
