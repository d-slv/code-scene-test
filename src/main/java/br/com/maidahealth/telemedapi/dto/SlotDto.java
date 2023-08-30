package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.utils.Utils;

public class SlotDto {
	
	private Date begin;
	
	private String beginFormatted;

	private Date end;
	
	private String endFormatted;
	
	private boolean currentSlot;

	private List<VacancyDto> vacancies = new ArrayList<>();
	
	public SlotDto() {
		super();
	}

	public SlotDto(Date begin, Date end) {
		super();
		this.begin = begin;
		this.beginFormatted = Utils.parseToPretty(begin, "HH:mm");
		this.end = end;
		this.endFormatted = Utils.parseToPretty(end, "HH:mm");
	}

	public Date getBegin() {
		return begin;
	}

	public void setBegin(Date begin) {
		this.begin = begin;
	}

	public Date getEnd() {
		return end;
	}

	public void setEnd(Date end) {
		this.end = end;
	}

	public List<VacancyDto> getVacancies() {
		return vacancies;
	}

	public void setVacancies(List<VacancyDto> vacancies) {
		this.vacancies = vacancies;
	}

	public String getBeginFormatted() {
		return beginFormatted;
	}

	public void setBeginFormatted(String beginFormatted) {
		this.beginFormatted = beginFormatted;
	}

	public String getEndFormatted() {
		return endFormatted;
	}

	public void setEndFormatted(String endFormatted) {
		this.endFormatted = endFormatted;
	}

	public boolean isCurrentSlot() {
		return currentSlot;
	}

	public void setCurrentSlot(boolean currentSlot) {
		this.currentSlot = currentSlot;
	}

	public boolean contains(Professional professional) {
		for (VacancyDto vacancyDto : vacancies) {
			if (vacancyDto.getProfessional().getId().equals(professional.getId())) {
				return true;
			}
		}
		return false;
	}

}
