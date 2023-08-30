package br.com.maidahealth.telemedapi.repositories.template;

import br.com.maidahealth.telemedapi.enums.AttendanceDateType;

public class ConclusionDateTypeTemplate extends DateTypeTemplate{

	@Override
	public String getElectiveDate() {
		return AttendanceDateType.CONCLUSION.getProperty();
	}

	@Override
	public String getUrgencyDate() {
		return AttendanceDateType.CONCLUSION.getProperty();
	}

}
