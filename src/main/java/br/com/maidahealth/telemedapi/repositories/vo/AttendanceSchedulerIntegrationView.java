package br.com.maidahealth.telemedapi.repositories.vo;

import java.util.Date;

import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.AttendanceType;

public interface AttendanceSchedulerIntegrationView {

	Long getId();

	String getDocwayId();

	Date getCreatedAt();

	Date getSchedulingDate();

	Date getProfessionalOnlineDate();

	Date getInsuredOnlineDate();

	Date getCancellingDate();

	Date getVideoCallEndDate();

	Date getFinishDate();

	String getContactNumber();

	String getChatbotId();

	String getUrlReturn();

	Boolean getHasSickNote();

	Boolean getHasPrescription();

	Boolean getHasExamRequest();

	ProfessionalDTO getProfessional();

	SpecialtyDTO getSpecialty();

	AttendanceStatus getStatus();

	AttendanceType getType();

	CancellingAttendanceReasonEnum getCancellingReason();

	public interface ProfessionalDTO {

		Long getId();

		String getName();

		String getAssociation();

		String getAssociationNumber();

		String getUfCrm();

		String getCpf();

	}

	public interface SpecialtyDTO {

		Long getId();

		String getName();

		String getCode();
	}

}
