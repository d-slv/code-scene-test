package br.com.maidahealth.telemedapi.repositories.template;

import br.com.maidahealth.telemedapi.enums.AttendanceDateType;

public class CancelationDateTypeTemplate extends DateTypeTemplate{

	@Override
	public String getElectiveDate() {
		return AttendanceDateType.CANCELATION.getProperty();
	}

	@Override
	public String getUrgencyDate() {
		return AttendanceDateType.CANCELATION.getProperty();
	}

}
