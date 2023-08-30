package br.com.maidahealth.telemedapi.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.maidahealth.telemedapi.enums.ScheduleStatus;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Schedule;
import br.com.maidahealth.telemedapi.models.Specialty;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>{

	List<Schedule> findByStatusIn(List<ScheduleStatus> status);

	@Query("select case when count(s)> 0 then true else false end from Schedule s where s.professional = :professional and s.specialty = :specialty and s.date = :dataConverted and s.status = 'GENERATED'")
	boolean existsScheduleFor(Professional professional, Specialty specialty, Date dataConverted);

	List<Schedule> findByProfessionalAvailabilityId(Long id);

	List<Schedule> findByProfessionalIdAndDateAndStatusAndSpecialtyId(Long professionalId, Date date, ScheduleStatus status, Long specialtyId);
}
