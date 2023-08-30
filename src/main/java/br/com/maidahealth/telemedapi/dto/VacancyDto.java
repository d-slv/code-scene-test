package br.com.maidahealth.telemedapi.dto;

import java.util.Date;

import br.com.maidahealth.telemedapi.enums.VacancyStatus;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Vacancy;
import br.com.maidahealth.telemedapi.utils.Utils;

public class VacancyDto implements Comparable<VacancyDto>{

	private Long id;
	
	private VacancyStatus status;

	private String statusDescription;

	private String typeDescription;

	private Date date;

	private String dateFormatted;

	private SpecialtyDto specialty;
	
	private ProfessionalDto professional;

	private AttendanceDto attendance;

	public VacancyDto(Vacancy vacancy) {
		super();
		this.id = vacancy.getId();
		this.status = vacancy.getStatus();
		this.statusDescription = vacancy.getStatus().getDescription();
		this.typeDescription = vacancy.getSchedulingType().getDescription();
		this.date = vacancy.getDateVacancy();
		this.dateFormatted = Utils.parseToPrettyDate(vacancy.getDateVacancy());
		this.professional = ProfessionalDto.convert(vacancy.getSchedule().getProfessional());
		this.specialty = SpecialtyDto.convert(vacancy.getSchedule().getSpecialty());
		this.attendance = AttendanceDto.convert(vacancy.getAttendance(), false, null, null, null, null);
	}

	public VacancyDto(Professional professional) {
		super();
		this.professional = ProfessionalDto.convert(professional);
	}

	public static VacancyDto convert(Vacancy vacancy) {
		if(vacancy == null)
			return null;
		
		return new VacancyDto(vacancy);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public SpecialtyDto getSpecialty() {
		return specialty;
	}

	public void setSpecialty(SpecialtyDto specialty) {
		this.specialty = specialty;
	}

	public ProfessionalDto getProfessional() {
		return professional;
	}

	public void setProfessional(ProfessionalDto professional) {
		this.professional = professional;
	}

	public VacancyStatus getStatus() {
		return status;
	}

	public void setStatus(VacancyStatus status) {
		this.status = status;
	}

	public String getStatusDescription() {
		return statusDescription;
	}

	public void setStatusDescription(String statusDescription) {
		this.statusDescription = statusDescription;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getDateFormatted() {
		return dateFormatted;
	}

	public void setDateFormatted(String dateFormatted) {
		this.dateFormatted = dateFormatted;
	}

	public AttendanceDto getAttendance() {
		return attendance;
	}

	public void setAttendance(AttendanceDto attendance) {
		this.attendance = attendance;
	}

	public String getTypeDescription() {
		return typeDescription;
	}

	public void setTypeDescription(String typeDescription) {
		this.typeDescription = typeDescription;
	}

	@Override
	public int compareTo(VacancyDto comparableObject) {
		return this.getProfessional().getName().compareTo(comparableObject.getProfessional().getName());
	}
	
}
