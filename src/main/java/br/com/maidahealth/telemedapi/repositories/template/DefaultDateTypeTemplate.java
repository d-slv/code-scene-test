package br.com.maidahealth.telemedapi.repositories.template;

import br.com.maidahealth.telemedapi.enums.AttendanceDateType;

public class DefaultDateTypeTemplate extends DateTypeTemplate{

	@Override
	public String getElectiveDate() {
		return AttendanceDateType.SCHEDULING.getProperty();
	}

	@Override
	public String getUrgencyDate() {
		return AttendanceDateType.CREATION.getProperty();
	}

}
