package br.com.maidahealth.telemedapi.repositories.template;

import br.com.maidahealth.telemedapi.enums.AttendanceDateType;

public class CreationDateTypeTemplate extends DateTypeTemplate{

	@Override
	public String getElectiveDate() {
		return AttendanceDateType.CREATION.getProperty();
	}

	@Override
	public String getUrgencyDate() {
		return AttendanceDateType.CREATION.getProperty();
	}

}
