package br.com.maidahealth.telemedapi.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.enums.VacancyStatus;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.SchedulingType;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.Vacancy;

public interface VacancyRepository extends JpaRepository<Vacancy, Long> {

	List<Vacancy> findBySpecialtyIdAndDateVacancyBetweenOrderByDateVacancyAsc(Long specialtyId, Date beginningOfDay, Date endOfDay);

	List<Vacancy> findBySpecialtyAndDateVacancyAndSchedulingTypeAndStatus(Specialty specialty, Date dataVacancy, SchedulingType schedulingType, VacancyStatus vacancyStatus);

	Optional<Vacancy> findBySpecialtyAndProfessionalAndDateVacancyAndSchedulingTypeAndStatus(Specialty specialty, Professional professional, Date dataVacancy, SchedulingType schedulingType, VacancyStatus vacancyStatus);

	List<Vacancy> findBySpecialtyIdAndSchedulingTypeAndStatusAndDateVacancyGreaterThanEqualOrderByDateVacancyAsc(Long specialtyId, SchedulingType schedulingType, VacancyStatus vacancyStatus, Date date);

	List<Vacancy> findBySpecialtyIdAndSchedulingTypeAndStatusAndDateVacancyBetweenOrderByDateVacancyAsc(Long specialtyId, SchedulingType schedulingType, VacancyStatus vacancyStatus, Date beginningOfDay, Date endOfDay);

	List<Vacancy> findAllByDateVacancyBetween(Date initialDateTime, Date finalDateTime);

	List<Vacancy> findByScheduleProfessionalAvailabilityId(Long id);

	List<Vacancy> findByScheduleId(Long scheduleId);

	List<Vacancy> findByStatusNotAndSpecialtyIdAndDateVacancyBetweenOrderByDateVacancyAsc(VacancyStatus status,
			Long specialtyId, Date beginningOfDay, Date endOfDay);

	List<Vacancy> findBySpecialtyIdAndSchedulingTypeAndStatusAndProfessionalIdAndDateVacancyBetweenOrderByDateVacancyAsc(
			Long specialtyId, SchedulingType schedulingTypeEnum, VacancyStatus available, Long professionalId, Date startDate, Date endDate);

    List<Vacancy> findBySpecialtyIdAndSchedulingTypeAndStatusAndProfessionalIdAndDateVacancyGreaterThanEqualOrderByDateVacancyAsc(
            Long id, SchedulingType schedulingTypeEnum, VacancyStatus available, Long professionalId, Date date);

}
