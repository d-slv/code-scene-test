package br.com.maidahealth.telemedapi.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.SchedulingType;
import br.com.maidahealth.telemedapi.repositories.vo.AttendanceSchedulerIntegrationView;
import br.com.maidahealth.telemedapi.repositories.vo.QueueView;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long>, AttendanceRepositoryCustom {

	List<Attendance> findByRequesterInsuredAndStatusInAndTypeInAndEnabledMedia(Insured insured,
			List<AttendanceStatus> status, List<AttendanceType> types, Boolean enabledMedia);

	List<Attendance> findByInsuredInAndStatusInAndTypeIn(List<Insured> insured, List<AttendanceStatus> status,
			List<AttendanceType> types);

	List<Attendance> findByStatusInAndType(List<AttendanceStatus> status, AttendanceType type);

	Integer countByStatusInAndEnabledMediaDateLessThanAndTypeAndSpecialtyIdAndEnabledMedia(
			List<AttendanceStatus> status, Date enabledMediaDate, AttendanceType type, Long specialtyId,
			Boolean enabledMedia);

	Integer countByStatusInAndEnabledMediaDateLessThanAndTypeAndEnabledMedia(List<AttendanceStatus> status,
			Date enabledMediaDate, AttendanceType type, Boolean enabledMedia);

	List<Attendance> findByInsuredInAndTypeAndStatusAndSchedulingDateGreaterThanOrderBySchedulingDateAsc(
			List<Insured> insureds, AttendanceType type, AttendanceStatus status, Date date);

	List<Attendance> findByTypeAndSchedulingDateGreaterThanOrderBySchedulingDateAsc(AttendanceType type, Date date);

	Optional<Attendance> findByIdAndStatusIn(Long id, List<AttendanceStatus> status);

	Optional<Attendance> findByInsuredInAndStatusOrderByTypeDesc(List<Insured> insureds, AttendanceStatus status);

	Optional<Attendance> findByDocwayId(String attendanceDocwayId);

	Optional<AttendanceSchedulerIntegrationView> findViewById(Long id);

	@Query(value = "SELECT * FROM Attendance a " + " LEFT JOIN Professional p ON a.professional_id = p.id "
			+ "	LEFT JOIN Specialty s ON a.specialty_id = s.id " + " WHERE "
			+ "		( a.insured_id IN (?1) OR a.requester_insured_id IN (?1) ) " + "		AND " + "		("
			+ "			LOWER(p.name) like %?2% OR " + " 		LOWER(s.name) like %?2%" + "		)"
			+ " ORDER BY a.created_at DESC", nativeQuery = true)
	Page<Attendance> getAttendancesByInsuredAndDependentsIdsAndFilter(List<Long> insuredsIds, String filter,
			Pageable pageable);

	Optional<Attendance> findFirstByStatusOrderByCreatedAtDesc(AttendanceStatus status);

	List<Attendance> findByTypeAndStatusAndSchedulingDateBetween(AttendanceType elective, AttendanceStatus scheduled,
			Date beginningOfDay, Date endOfDay);

	List<Attendance> findByStatusAndProfessionalOnlineDateLessThan(AttendanceStatus status,
			Date professionalOnlineDate);

	Optional<Attendance> findFirstByStatusAndTypeAndSchedulingTypeAndProfessionalIdAndSpecialtyIdAndSchedulingDateGreaterThanEqualOrderBySchedulingDateDesc(
			AttendanceStatus status, AttendanceType type, SchedulingType schedulingType, Long professionalId,
			Long specialtyId, Date schedulingDate);

	Integer countByProfessionalIdAndSchedulingDate(Long professionalId, Date schedulingDate);

	@Query(value = "SELECT a.url_return FROM Attendance a WHERE a.insured_id = ?1 AND a.url_return IS NOT NULL ORDER BY a.id DESC LIMIT 1", nativeQuery = true)
	String findUrlByInsuredIdOrderByIdDesc(Long insuredId);

	List<Attendance> findByStatusInAndProfessionalOnlineDateLessThan(List<AttendanceStatus> status,
			Date professionalOnlineDate);

	Optional<Attendance> findByInsuredIdAndProfessionalIdAndSpecialtyIdAndSchedulingDateAndStatus(Long patientId,
			Long professionalId, Long specialtyId, Date scheduledDate, AttendanceStatus status);

	@Query(value = "" + "SELECT a.id, ROW_NUMBER() OVER (ORDER BY a.created_at) as \"position\" " + "FROM Attendance a "
			+ "WHERE a.specialty_id = ?1 and a.status = 'WAITING_IN_QUEUE'" + "", nativeQuery = true)
	List<QueueView> getAttendancesInQueueBySpecialty(Long specialtyId);

	List<Attendance> findByStatusAndTypeAndSchedulingTypeAndSpecialtyIdAndInsuredIdAndSchedulingDateGreaterThanOrderBySchedulingDateDesc(
			AttendanceStatus status, AttendanceType type, SchedulingType schedulingType, Long specialtyId,
			Long insuredId, Date beginDate);

	boolean existsByIdAndInviteCodeAndStatusIn(Long id, String inviteCode, List<AttendanceStatus> statusList);

	List<Attendance> findByStatusAndTypeAndSpecialtyId(AttendanceStatus status, AttendanceType type, Long specialtyId);

	Optional<Attendance> findByIdAndGuestsId(Long id, Long guestsId);

	Page<Attendance> findByInsuredAndProfessionalAndStatus(Insured insured, Professional professional,
			AttendanceStatus status, Pageable pageable);

	Page<Attendance> findByInsuredAndStatus(Insured insured, AttendanceStatus status, Pageable pageable);

	Optional<Attendance> findByHealthInsuranceIdentificatorAndHealthAttendanceId(String healthInsuranceIdentificator, long healthAttendenceId);

	Optional<Attendance> findByHealthAttendanceIdAndHealthInsuranceIdentificator(Long healthAttendanceId, String healthInsuranceIdentificator);

	Optional<Attendance> findById(Long id);

	List<Attendance> findByHealthInsuranceIdentificatorAndStatusAndType(String healthInsuranceIdentificato, AttendanceStatus status, AttendanceType type);
}

