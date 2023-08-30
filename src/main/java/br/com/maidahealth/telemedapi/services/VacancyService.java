package br.com.maidahealth.telemedapi.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.dto.ProfessionalDto;
import br.com.maidahealth.telemedapi.dto.SlotDto;
import br.com.maidahealth.telemedapi.dto.VacancyDto;
import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.VacancyStatus;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.VacancyBlockForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.SchedulingType;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.models.Vacancy;
import br.com.maidahealth.telemedapi.repositories.ProfessionalRepository;
import br.com.maidahealth.telemedapi.repositories.SpecialtyRepository;
import br.com.maidahealth.telemedapi.repositories.VacancyRepository;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class VacancyService {

	@Autowired
	public VacancyRepository vacancyRepository;

	@Autowired
	private SpecialtyRepository specialtyRepository;

	@Autowired
	private ProfessionalRepository professionalRepository;

	@Autowired
	private SpecialtyService specialtyService;
	
	@Autowired
	private AttendanceService attendanceService;

	@Autowired
	private AuthenticationService authenticationService;

	public Vacancy find(Long id) {
		Optional<Vacancy> optional = vacancyRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}

		throw new EntityNotFoundException();
	}

	public List<SlotDto> list(Long specialtyId, Date date) {
		List<Vacancy> vacancies = vacancyRepository.findByStatusNotAndSpecialtyIdAndDateVacancyBetweenOrderByDateVacancyAsc(
				VacancyStatus.REMOVED, specialtyId, Utils.getBeginningOfDay(date), Utils.getEndOfDay(date));

		Specialty specialty = specialtyService.find(specialtyId);
		Integer averageTime = specialty.getElectiveAverageTime();

		List<SlotDto> slots = new ArrayList<SlotDto>();
		Set<Professional> professionals = new HashSet<Professional>();

		SlotDto currentSlot = null;

		for (Vacancy vacancy : vacancies) {
			if (currentSlot == null || !isVacancyPermmitedToSlot(currentSlot, vacancy)) {
				currentSlot = new SlotDto(vacancy.getDateVacancy(), getSlotEndDate(vacancy, averageTime));
				if (isCurrentSlot(currentSlot)) {
					currentSlot.setCurrentSlot(true);
				}
				slots.add(currentSlot);
			}
			currentSlot.getVacancies().add(new VacancyDto(vacancy));
			professionals.add(vacancy.getProfessional());
		}

		for (SlotDto slot : slots) {
			for (Professional professional : professionals) {
				if (!slot.contains(professional)) {
					slot.getVacancies().add(new VacancyDto(professional));
				}
			}
			Collections.sort(slot.getVacancies());
		}
		return slots;
	}

	private boolean isCurrentSlot(SlotDto slot) {
		return Utils.isBetween(new Date(), slot.getBegin(), slot.getEnd());
	}

	private boolean isVacancyPermmitedToSlot(SlotDto slot, Vacancy vacancy) {
		return (!slot.getBegin().after(vacancy.getDateVacancy()) && !slot.getEnd().before(vacancy.getDateVacancy()));
	}

	private Date getSlotEndDate(Vacancy vacancy, Integer averageTime) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(vacancy.getDateVacancy());
		calendar.add(Calendar.MINUTE, averageTime - 1);
		return calendar.getTime();
	}

	public List<String> listAvailableVacancy(Long specialtyId, Long professionalId, String schedulingType, Date date) {
		Optional<Specialty> specialty = specialtyRepository.findById(specialtyId);
		if (!specialty.isPresent()) {
			throw new InvalidException("Especialidade não encontrada: " + specialtyId);
		}

		List<Vacancy> vacancyList;

		if(professionalId != null) {

			Optional<Professional> professional = professionalRepository.findById(professionalId);
			if (!professional.isPresent()) {
				throw new InvalidException("Profissional não encontrado: " + professionalId);
			}

			if(date != null) {

				vacancyList = vacancyRepository
						.findBySpecialtyIdAndSchedulingTypeAndStatusAndProfessionalIdAndDateVacancyBetweenOrderByDateVacancyAsc(
								specialty.get().getId(), getSchedulingTypeEnum(schedulingType), VacancyStatus.AVAILABLE, 
								professional.get().getId(), new Date(),Utils.getEndOfDay(date));
			} else {

				vacancyList = vacancyRepository
						.findBySpecialtyIdAndSchedulingTypeAndStatusAndProfessionalIdAndDateVacancyGreaterThanEqualOrderByDateVacancyAsc(
								specialty.get().getId(), getSchedulingTypeEnum(schedulingType), VacancyStatus.AVAILABLE,
								professional.get().getId(), new Date());
			}
		} else {

			if(date != null) {

				vacancyList = vacancyRepository
						.findBySpecialtyIdAndSchedulingTypeAndStatusAndDateVacancyBetweenOrderByDateVacancyAsc(
								specialty.get().getId(), getSchedulingTypeEnum(schedulingType), VacancyStatus.AVAILABLE, 
								new Date(),Utils.getEndOfDay(date));
			} else {

				vacancyList = vacancyRepository
						.findBySpecialtyIdAndSchedulingTypeAndStatusAndDateVacancyGreaterThanEqualOrderByDateVacancyAsc(
								specialty.get().getId(), getSchedulingTypeEnum(schedulingType), VacancyStatus.AVAILABLE,
								new Date());
			}
		}

		return vacancyList.stream().map(vacancy -> Utils.parseToPretty(vacancy.getDateVacancy(), "dd/MM/yyyy"))
				.distinct().sorted().collect(Collectors.toList());
	}

	public List<String> listAvailableVacancyByDay(Long specialtyId, Long professionalId, String schedulingType, Date date, boolean fromNow) {
		Optional<Specialty> specialty = specialtyRepository.findById(specialtyId);
		if (!specialty.isPresent()) {
			throw new InvalidException("Especialidade não encontrada: " + specialtyId);
		}

		List<Vacancy> vacancyList;
		Date beginDate = fromNow ? Utils.getActualDate() : Utils.getBeginningOfDay(date);

		if(professionalId != null) {

			Optional<Professional> professional = professionalRepository.findById(professionalId);
			if (!professional.isPresent()) {
				throw new InvalidException("Profissional não encontrado: " + professionalId);
			}

			vacancyList = vacancyRepository
				.findBySpecialtyIdAndSchedulingTypeAndStatusAndProfessionalIdAndDateVacancyBetweenOrderByDateVacancyAsc(
						specialty.get().getId(), getSchedulingTypeEnum(schedulingType), VacancyStatus.AVAILABLE,
						professional.get().getId(),beginDate, Utils.getEndOfDay(date));

		} else {

			vacancyList = vacancyRepository
					.findBySpecialtyIdAndSchedulingTypeAndStatusAndDateVacancyBetweenOrderByDateVacancyAsc(
							specialty.get().getId(), getSchedulingTypeEnum(schedulingType), VacancyStatus.AVAILABLE,
							beginDate, Utils.getEndOfDay(date));
		}

		return vacancyList.stream().map(vacancy -> Utils.parseToPretty(vacancy.getDateVacancy(), "HH:mm")).distinct()
				.collect(Collectors.toList());
	}

	private SchedulingType getSchedulingTypeEnum(String type) {
		if (type == null || type.isEmpty()) {
			return SchedulingType.FIRST_APPOINTMENT;
		}

		SchedulingType[] values = SchedulingType.values();
		for (SchedulingType schedulingType : values) {
			if (type.toUpperCase().equals(schedulingType.name().toUpperCase())) {
				return schedulingType;
			}
		}

		throw new InvalidException("Tipo de atendimento inválido: " + type);
	}

	@Transactional
	public void blockVacancy(Long id, VacancyBlockForm form) {
		Vacancy vacancy = vacancyRepository.findById(id).get();
		VacancyStatus status = vacancy.getStatus();
		vacancy.setStatus(VacancyStatus.BLOCKED);
		vacancy.setCancellingReason(form.getDescription());
		
		if (status.equals(VacancyStatus.USED)) {
			reScheduleAttendance(vacancy.getAttendance(), CancellingAttendanceReasonEnum.CANCELED_BY_PROFESSIONAL_AVAILABILITY);
		}
	}

	public void reScheduleAttendance(Attendance attendance, CancellingAttendanceReasonEnum reason) {
		if (attendance != null && AttendanceStatus.SCHEDULED.equals(attendance.getStatus())) {
			boolean reScheduled = attendanceService.reScheduleAttendance(attendance);
			if (!reScheduled) {
				attendanceService.cancel(attendance.getId(), reason);
			}
		}
	}

    public List<ProfessionalDto> listAvailableProfessionals(Long specialtyId, String schedulingType, Date date) {

		Optional<Specialty> specialty = specialtyRepository.findById(specialtyId);

		if(!specialty.isPresent()) {
			throw new InvalidException("Especialidade não encontrada: " + specialtyId);
		}

		User currentUser =authenticationService.currentUser();
		if(!(currentUser.isAdmin() || currentUser.isClientAdmin())){

			Insured insured = currentUser.getInsured();
	
			if(Utils.getAgeOfInsured(insured) != null && Utils.getAgeOfInsured(insured) < 14) {
				specialtyId = 48L; //Pediatria
			}
		}

		List<Vacancy> vacancies = vacancyRepository.findBySpecialtyIdAndSchedulingTypeAndStatusAndDateVacancyBetweenOrderByDateVacancyAsc(specialtyId, SchedulingType.valueOf(schedulingType), VacancyStatus.AVAILABLE, Utils.getBeginningOfDay(date), Utils.getEndOfDay(date));
		List<Professional> availableProfessionals = vacancies.stream().map(Vacancy::getProfessional).distinct().collect(Collectors.toList());

		return availableProfessionals.stream().map(ProfessionalDto::new).collect(Collectors.toList());
    }

}
