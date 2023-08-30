package br.com.maidahealth.telemedapi.services;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.dto.ProfessionalScheduleDto;
import br.com.maidahealth.telemedapi.dto.ProfessionalScheduleSummaryDto;
import br.com.maidahealth.telemedapi.dto.ScheduleSummaryDto;
import br.com.maidahealth.telemedapi.dto.SpecialtyScheduleSummaryDto;
import br.com.maidahealth.telemedapi.dto.VacancyScheduleSummaryDto;
import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.ProfessionalAvailabilityStatus;
import br.com.maidahealth.telemedapi.enums.ScheduleStatus;
import br.com.maidahealth.telemedapi.enums.VacancyStatus;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.ScheduleBlockForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.HealthInsurer;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.ProfessionalAvailability;
import br.com.maidahealth.telemedapi.models.Schedule;
import br.com.maidahealth.telemedapi.models.SchedulingType;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.Timetable;
import br.com.maidahealth.telemedapi.models.Vacancy;
import br.com.maidahealth.telemedapi.repositories.ProfessionalAvailabilityRepository;
import br.com.maidahealth.telemedapi.repositories.ScheduleRepository;
import br.com.maidahealth.telemedapi.repositories.VacancyRepository;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class ScheduleService {

	Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	public ScheduleRepository scheduleRepository;

	@Autowired
	private HealthInsurerService healthInsurerService;

	@Autowired
	public VacancyRepository vacancyRepository;

	@Autowired
	private SpecialtyService specialtyService;
	
	@Autowired
	private AttendanceService attendanceService;
	
	@Autowired
	private ProfessionalAvailabilityRepository professionalAvailabilityRepository;

	public void generateVacancies(Schedule schedule) {
		List<Schedule> schedules = new ArrayList<Schedule>();

		if (schedule != null) {
			schedules.add(schedule);
		} else {
			List<ScheduleStatus> status = Arrays.asList(ScheduleStatus.CREATED);
			schedules = scheduleRepository.findByStatusIn(status);
		}

		for (Schedule currentSchedule : schedules) {
			if (ScheduleStatus.CREATED.equals(currentSchedule.getScheduleStatus())) {
				generateVacanciesFrom(currentSchedule);
				currentSchedule.setScheduleStatus(ScheduleStatus.GENERATED);
				scheduleRepository.save(currentSchedule);
			}
		}
	}
	
	private void generateVacanciesFromProfessionalAvailabilitySchedules(ProfessionalAvailability professionalAvailability) {
		List<Schedule> schedules = scheduleRepository.findByProfessionalAvailabilityId(professionalAvailability.getId());
		
		for (Schedule currentSchedule : schedules) {
			generateVacancies(currentSchedule);
		}
	}

	private void generateVacanciesFrom(Schedule schedule) {
		List<Vacancy> vacancies = new ArrayList<Vacancy>();
		for (Timetable currentTimetable : schedule.getTimetables()) {
			List<Date> dates = getPermittedDates(schedule, currentTimetable);
			for (Date currentDate : dates) {
				Vacancy vacancy = new Vacancy(currentDate, schedule);
				vacancies.add(vacancy);
			}
		}
		vacancyRepository.saveAll(vacancies);
	}

	private List<Date> getPermittedDates(Schedule schedule, Timetable timetable) {
		List<Date> dates = new ArrayList<Date>();
		Integer electiveAverageTime = schedule.getSpecialty().getElectiveAverageTime();

		Date nextDate = combine(schedule.getDate(), timetable.getBegin());
		Date endDate = combine(schedule.getDate(), timetable.getEnd());
		nextDate = adjustDate(nextDate, timetable.getBegin());
		endDate = adjustDate(endDate, timetable.getEnd());

		while (nextDate.before(endDate)) {
			dates.add(nextDate);
			nextDate = getNextDate(nextDate, electiveAverageTime);
		}

		return dates;
	}

	private Date getNextDate(Date currentDate, Integer electiveAverageTime) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(currentDate);
		cal.add(Calendar.MINUTE, electiveAverageTime);
		return cal.getTime();
	}

	private static Date combine(Date date, Date time) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(time);
		int hour = cal.get(Calendar.HOUR_OF_DAY);
		int min = cal.get(Calendar.MINUTE);
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, hour);
		cal.set(Calendar.MINUTE, min);
		return cal.getTime();
	}

	private Date adjustDate(Date date, Date timeTableDate) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date(0));
		int firstDate = cal.get(Calendar.DAY_OF_MONTH);

		cal.setTime(timeTableDate);
		int beginDay = cal.get(Calendar.DAY_OF_MONTH);

		cal.setTime(date);
		cal.add(Calendar.DATE, beginDay - firstDate);

		return cal.getTime();
	}

	public List<ScheduleSummaryDto> generateSchedulesSpecialtySummary(Optional<Date> optionalDate) {
		Date date = optionalDate.orElseThrow(() -> new InvalidException("Parâmetro date deve ser informado"));

		Date initialDate = Utils.normalizeDate(date);
		Date finalDate = Utils.normalizeDate(Utils.getDayWithTimeAtEndOfDay(date));

		List<Vacancy> vacancies = vacancyRepository.findAllByDateVacancyBetween(initialDate, finalDate);
		Map<Specialty, Map<Professional, List<Vacancy>>> map = vacancies.stream().collect(groupingBy(
				Vacancy::getSpecialty, groupingBy(Vacancy::getProfessional, mapping((Vacancy v) -> v, toList()))));

		return map.entrySet().parallelStream().map(specialtyMapEntry -> {
			Specialty specialty = specialtyMapEntry.getKey();
			Map<Professional, List<Vacancy>> professionalListMap = specialtyMapEntry.getValue();
			ScheduleSummaryDto scheduleSummaryDto = new ScheduleSummaryDto();
			scheduleSummaryDto.setSpecialty(SpecialtyScheduleSummaryDto.convert(specialty));
			scheduleSummaryDto.setProfessional(getProfessionalSummary(professionalListMap));
			scheduleSummaryDto.setVacancy(getVacancySummary(professionalListMap));

			return scheduleSummaryDto;
		}).sorted(Comparator.comparing(scheduleSummaryDto -> scheduleSummaryDto.getSpecialty().getName(),
				String.CASE_INSENSITIVE_ORDER)).collect(toList());
	}

	private VacancyScheduleSummaryDto getVacancySummary(Map<Professional, List<Vacancy>> map) {
		Map<VacancyStatus, Long> vacancyStatusGroup = map.values().stream().flatMap(List::stream)
				.collect(groupingBy(Vacancy::getStatus, mapping((Vacancy v) -> v, counting())));
		VacancyScheduleSummaryDto summaryDto = new VacancyScheduleSummaryDto();
		Arrays.stream(VacancyStatus.values()).forEach(vacancyStatus -> {
			double quantity = getVacanciesValue(vacancyStatusGroup, vacancyStatus);
			summaryDto.setValue(quantity, vacancyStatus);
		});
		return summaryDto;
	}

	private Long getVacanciesValue(Map<VacancyStatus, Long> vacancyStatusGroup, VacancyStatus vacancyStatus) {
		return Optional.ofNullable(vacancyStatusGroup.get(vacancyStatus)).orElse(0L);
	}

	private ProfessionalScheduleSummaryDto getProfessionalSummary(Map<Professional, List<Vacancy>> map) {
		double totalProfessionals = map.keySet().size();
		double onlineProfessionals = (double) map.keySet().stream().filter(Professional::isOnline).count();
		return new ProfessionalScheduleSummaryDto(onlineProfessionals, totalProfessionals);
	}

	public void generateDefaultSchedules() {
		logger.info("Geração de agendas automáticas...");

		HealthInsurer healthInsurer = healthInsurerService.getHealthInsurer();
		if (healthInsurer != null && (healthInsurer.getGenerateDefaultSchedules() == true)) {
			logger.info("Iniciando...");

			List<Specialty> specialties = specialtyService.findElectiveAvailable();

			LocalDate start = LocalDate.now()
					, end = LocalDate.now().plusMonths(1);

			logger.info("Gerando agendas...");
			LocalDate next = start.minusDays(1);
			while ((next = next.plusDays(1)).isBefore(end.plusDays(0))) {
				if (Utils.isWeekend(next))
					continue;

				for (Specialty specialty : specialties) {
					generateSchedule(next, specialty);
				}
			}

			logger.info("Gerando vagas...");
			generateVacancies(null);
		}

		logger.info("Geração finalizada.");
	}

	private void generateSchedule(LocalDate data, Specialty specialty) {
		for (Professional professional : specialty.getProfessionals()) {
			logger.info(data + " => " + specialty.getName() + " - " + professional.getId());
			Date dataConverted = java.sql.Date.valueOf(data);
			if (!scheduleRepository.existsScheduleFor(professional, specialty, dataConverted)) {
				logger.info("Criando agenda...");
				Schedule schedule = new Schedule();
				schedule.setDate(dataConverted);
				schedule.setSchedulingType(SchedulingType.FIRST_APPOINTMENT);
				schedule.setProfessional(professional);
				schedule.setSpecialty(specialty);
				schedule.setScheduleStatus(ScheduleStatus.CREATED);
				schedule.setTimetables(getTimetables(schedule));
				scheduleRepository.save(schedule);

			}
		}
	}
	
	private void generateSchedule(LocalDate data, ProfessionalAvailability professionalAvailability) {
		Professional professional = professionalAvailability.getProfessional();
		Specialty specialty = professionalAvailability.getSpecialty();
		logger.info(data + " => " + specialty.getName() + " - " + professional.getId());
		Date dataConverted = java.sql.Date.valueOf(data);
		logger.info("Criando agenda...");
		Schedule schedule = new Schedule();
		schedule.setDate(dataConverted);
		schedule.setSchedulingType(professionalAvailability.getAppointmentType());
		schedule.setProfessional(professional);
		schedule.setSpecialty(specialty);
		schedule.setScheduleStatus(ScheduleStatus.CREATED);
		schedule.setTimetables(getTimetablesFromProfessionalAvailability(professionalAvailability, schedule));
		schedule.setProfessionalAvailability(professionalAvailability);
		scheduleRepository.save(schedule);
	}

	private Set<Timetable> getTimetables(Schedule schedule) {
		Set<Timetable> timetables = new HashSet<Timetable>();

		Timetable timetable1 = generateTimetable(8, 12, schedule);
		timetables.add(timetable1);

		Timetable timetable2 = generateTimetable(14, 18, schedule);
		timetables.add(timetable2);

		return timetables;
	}
	
	private Set<Timetable> getTimetablesFromProfessionalAvailability(ProfessionalAvailability professionalAvailability, Schedule schedule) {
		Set<Timetable> timetables = new HashSet<Timetable>();

		Timetable timetable = generateTimetableFromProfessionalAvailability(professionalAvailability.getBeginHour(), professionalAvailability.getEndHour(), schedule);
		timetables.add(timetable);

		return timetables;
	}

	private Timetable generateTimetable(int begin, int end, Schedule schedule) {
		Date beginHour = Utils.convertLocalDateTimeToDate(LocalDate.now().atTime(begin, 0));
		Date endHour = Utils.convertLocalDateTimeToDate(LocalDate.now().atTime(end, 0));
		Timetable timetable = new Timetable();
		timetable.setBegin(beginHour);
		timetable.setEnd(endHour);
		timetable.setSchedule(schedule);
		return timetable;
	}
	
	private Timetable generateTimetableFromProfessionalAvailability(Date beginHour, Date endHour, Schedule schedule) {
		Timetable timetable = new Timetable();
		timetable.setBegin(Utils.normalizeDate(beginHour));
		timetable.setEnd(Utils.normalizeDate(endHour));
		timetable.setSchedule(schedule);
		return timetable;
	}

	@Transactional
	public void generateProfessionalAvailabilitySchedules(ProfessionalAvailability professionalAvailability) {
		logger.info("Geração de agendas baseadas na escala médica...");
		
		if (healthInsurerService.canGenerateProfessionalAvailabilitySchedules()) {
			logger.info("Iniciando...");
			
			LocalDate start = LocalDate.now()
					, end = LocalDate.now().plusMonths(1);
			
			logger.info("Gerando agendas...");
			LocalDate next = start.minusDays(1);
			while ((next = next.plusDays(1)).isBefore(end.plusDays(0))) {
				if (Utils.isInDaysOfWeek(next, professionalAvailability.getDaysOfWeek())) {
					generateSchedule(next, professionalAvailability);
				}
			}
			
			logger.info("Gerando vagas...");
			generateVacanciesFromProfessionalAvailabilitySchedules(professionalAvailability);
		}

		logger.info("Geração finalizada.");
	}

	@Transactional
	public List<Vacancy> removeProfessionalAvailabilitySchedules(ProfessionalAvailability professionalAvailability) {
		List<Schedule> schedules = scheduleRepository.findByProfessionalAvailabilityId(professionalAvailability.getId());
		schedules.forEach(s -> s.setScheduleStatus(ScheduleStatus.REMOVED));
		
		List<Vacancy> vacancies = vacancyRepository.findByScheduleProfessionalAvailabilityId(professionalAvailability.getId());
		List<Vacancy> usedVacancies = this.setStatusAndGetUsedVacancies(vacancies, VacancyStatus.REMOVED);
		
		return usedVacancies;
	}

	public void reScheduleAttendancy(Attendance attendance, CancellingAttendanceReasonEnum reason) {
		if (attendance != null && AttendanceStatus.SCHEDULED.equals(attendance.getStatus())) {
			boolean reScheduled = attendanceService.reScheduleAttendance(attendance);
			if (!reScheduled) {
				logger.info("Cancelando atendimento " + attendance.getId() + " por falta de vaga durante o reagendamento");
				attendanceService.cancel(attendance.getId(), reason);
			}
		}
	}
	
	@Transactional
	public void blockSchedule(Long scheduleId, ScheduleBlockForm form) {
		Schedule schedule = scheduleRepository.findById(scheduleId).get();
		schedule.setScheduleStatus(ScheduleStatus.BLOCKED);
		schedule.setDescription(form.getDescription());
		
		List<Vacancy> vacancies = vacancyRepository.findByScheduleId(scheduleId);
		List<Vacancy> usedVacancies = setStatusAndGetUsedVacancies(vacancies, VacancyStatus.BLOCKED);
		
		usedVacancies.forEach(v -> this.reScheduleAttendancy(v.getAttendance(), CancellingAttendanceReasonEnum.CANCELED_BY_PROFESSIONAL_AVAILABILITY));
	}
	
	@Transactional
	private List<Vacancy> setStatusAndGetUsedVacancies(List<Vacancy> vacancies, VacancyStatus status){
		List<Vacancy> usedVacancies = vacancies.stream().filter(v -> v.getStatus().equals(VacancyStatus.USED)).collect(Collectors.toList());
		vacancies.forEach(v -> v.setStatus(status));
		
		return usedVacancies;
	}

	public List<ProfessionalScheduleDto> getProfessionalSchedules(Long professionalId, String date, Long specialtyId) {
		List<Schedule> scheduleList = scheduleRepository.findByProfessionalIdAndDateAndStatusAndSpecialtyId(professionalId, Utils.parse(date, "yyyy-MM-dd"), ScheduleStatus.GENERATED, specialtyId);
		List<ProfessionalScheduleDto> professionalScheduleList = new ArrayList<>(); 
		scheduleList.forEach(s -> professionalScheduleList
				.add(new ProfessionalScheduleDto(s.getId(), 
						professionalAvailabilityRepository.findById(s.getProfessionalAvailability().getId()).get())));
		return professionalScheduleList;
	}

	public void autoGenerateProfessionalAvailabilitySchedules() {
		List<ProfessionalAvailability> list = professionalAvailabilityRepository.findByStatus(ProfessionalAvailabilityStatus.ACTIVE);
		list.forEach(s -> this.generateProfessionalAvailabilitySchedules(s));
	}

}
