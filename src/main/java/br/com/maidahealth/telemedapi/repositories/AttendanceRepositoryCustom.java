package br.com.maidahealth.telemedapi.repositories;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.maidahealth.telemedapi.enums.AttendanceDateType;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;

public interface AttendanceRepositoryCustom {

	public Page<Attendance> findSecretaryAttendances(String filter, Long insuredId, Set<Long> providerId,
			Long specialtyId, Long professionalId, List<AttendanceStatus> status, Date startDate, Date finishDate, String type, 
			AttendanceDateType dateType, Date schedulingDate, String schedulingHour, Pageable pagination);

	Page<Attendance> findSecretaryAttendances(String filter, Long insuredId, Set<Long> providerIds, Long speciatyId,
			Long professionalId, List<AttendanceStatus> status, Date startDate, Date finishDate, String type,
			AttendanceDateType dateType, Boolean hasDocuments, Date schedulingDate, String schedulingHour,
			Pageable pagination);
}
