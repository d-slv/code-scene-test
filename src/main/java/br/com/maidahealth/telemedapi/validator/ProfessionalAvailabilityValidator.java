package br.com.maidahealth.telemedapi.validator;

import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.enums.ProfessionalAvailabilityStatus;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.ProfessionalAvailabilityForm;
import br.com.maidahealth.telemedapi.models.ProfessionalAvailability;
import br.com.maidahealth.telemedapi.repositories.ProfessionalAvailabilityRepository;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class ProfessionalAvailabilityValidator {

	@Autowired
	private ProfessionalAvailabilityRepository professionalAvailabilityRepository;

	public void validate(@Valid ProfessionalAvailabilityForm form, Long ProfessionalAvailabilityId, Long ProfessionalId) {
		validateDateRange(form);
		if (validateFieldsNotChanged(form, ProfessionalAvailabilityId)) {
			throw new InvalidException("Nenhum campo foi alterado.");
		}
		validateProfessionalAvailabilityDateUnavailable(form, ProfessionalAvailabilityId, ProfessionalId);
	}
	
	private void validateDateRange(@Valid ProfessionalAvailabilityForm form) {
		if (Utils.isAfterHour(form.getBeginHourDate(), form.getEndHourDate())) {
			throw new InvalidException("O horário do fim deve ser um horário após o horário de início.");
		}
	}

	private void validateProfessionalAvailabilityDateUnavailable(@Valid ProfessionalAvailabilityForm form, Long ProfessionalAvailabilityId, Long ProfessionalId) {
		List<ProfessionalAvailability> list = professionalAvailabilityRepository
				.findByProfessionalIdAndStatus(ProfessionalId, ProfessionalAvailabilityStatus.ACTIVE);

		for (ProfessionalAvailability pa : list) {
			if (!pa.getId().equals(ProfessionalAvailabilityId)) {
				verifyDataAvailability(pa, form);
			}
		}
	}
	
	private void verifyDataAvailability(ProfessionalAvailability professionalAvailability, ProfessionalAvailabilityForm form) {
		if (hasHourConflict(form.getBeginHourDate(), form.getEndHourDate()
				, professionalAvailability.getBeginHourFakeDate(), professionalAvailability.getEndHourFakeDate())) {
			for (Integer day : Utils.convertStringToIntList(professionalAvailability.getDaysOfWeek())) {
				if (form.getDaysOfWeek().contains(day)) {
					throw new InvalidException("Essas configurações geram conflitos na sua escala de "
							+ Utils.getDayOfWeekPortuguese(day, TextStyle.FULL));
				}
			}
		}
	}

	private boolean validateFieldsNotChanged(@Valid ProfessionalAvailabilityForm form, Long id) {
		if (id == null) {
			return false;
		}
		Optional<ProfessionalAvailability> professionalAvailability = professionalAvailabilityRepository
				.findByIdAndStatus(id, ProfessionalAvailabilityStatus.ACTIVE);
		if (!professionalAvailability.isPresent()) {
			throw new InvalidException("Escala já removida ou inexistente");
		}
		return form.equals(ProfessionalAvailabilityForm.toForm(professionalAvailability.get()));
	}
	
	private boolean hasHourConflict(Date newBeginDate, Date newEndDate, Date oldBeginDate, Date oldEndDate) {
		LocalDateTime newBegin = Utils.convertToLocalDateTime(newBeginDate, Utils.getApiZoneId());
		LocalDateTime newEnd = Utils.convertToLocalDateTime(newEndDate, Utils.getApiZoneId());
		LocalDateTime oldBegin = Utils.convertToLocalDateTime(oldBeginDate, Utils.getApiZoneId());
		LocalDateTime oldEnd = Utils.convertToLocalDateTime(oldEndDate, Utils.getApiZoneId());

		if((newBegin.isBefore(oldBegin))
				&& (newEnd.isEqual(oldBegin) || newEnd.isBefore(oldBegin))) {
			return false;
		}
		
		if((newEnd.isAfter(oldEnd))
				&& (newBegin.isEqual(oldEnd) || newBegin.isAfter(oldEnd))) {
			return false;
		}
		
		return true;
	}
	
}
