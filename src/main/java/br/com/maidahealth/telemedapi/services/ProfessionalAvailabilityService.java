package br.com.maidahealth.telemedapi.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.ProfessionalAvailabilityStatus;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.ProfessionalAvailabilityForm;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.ProfessionalAvailability;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.Vacancy;
import br.com.maidahealth.telemedapi.repositories.ProfessionalAvailabilityRepository;
import br.com.maidahealth.telemedapi.repositories.ProfessionalRepository;
import br.com.maidahealth.telemedapi.repositories.SpecialtyRepository;
import br.com.maidahealth.telemedapi.utils.Utils;
import br.com.maidahealth.telemedapi.validator.ProfessionalAvailabilityValidator;

@Service
public class ProfessionalAvailabilityService {

    @Autowired
	private ProfessionalAvailabilityRepository professionalAvailabilityRepository;
    
    @Autowired
    private ProfessionalRepository professionalRepository;
    
    @Autowired
    private SpecialtyRepository specialtyRepository;
    
    @Autowired
    private ProfessionalAvailabilityValidator professionalAvailabilityValidator;
    
    @Autowired
    private ScheduleService scheduleService;
           
    @Autowired
    private HealthInsurerService healthInsurerService;
    
    public Page<ProfessionalAvailability> getProfessionalAvailability(Long professionalId, Pageable pagination) {
    	this.canGenerateProfessionalAvailabilityShcedules();
    	return professionalAvailabilityRepository.findByProfessionalIdAndStatus(professionalId, pagination, ProfessionalAvailabilityStatus.ACTIVE);
    }
    
    @Transactional
    public ProfessionalAvailability createProfessionalAvailability(ProfessionalAvailabilityForm form) {
    	this.canGenerateProfessionalAvailabilityShcedules();
    	Optional<Professional> optionalProfessional = professionalRepository.findByIdAndSpecialtiesId(form.getProfessionalId(), form.getSpecialtyId());
        Professional storedProfessional = optionalProfessional.orElseThrow(() -> new EntityNotFoundException("Especialidade do profissional inválida"));

        professionalAvailabilityValidator.validate(form, null, form.getProfessionalId());
    	
    	Optional<Specialty> optionalSpecialty = specialtyRepository.findById(form.getSpecialtyId());
    	Specialty storedSpecialty = optionalSpecialty.orElseThrow(() -> new EntityNotFoundException("Especialidade inválida"));
    	
    	ProfessionalAvailability professionalAvailability =  form.convert(storedProfessional, storedSpecialty);
    	
    	professionalAvailabilityRepository.save(professionalAvailability);
    	
    	scheduleService.generateProfessionalAvailabilitySchedules(professionalAvailability);
    	
    	return professionalAvailability;
    }

    @Transactional
	public ProfessionalAvailability updateProfessionalAvailability(@Valid ProfessionalAvailabilityForm form, Long ProfessionalAvailabilityId) {
    	this.canGenerateProfessionalAvailabilityShcedules();
    	ProfessionalAvailability professionalAvailability = professionalAvailabilityRepository.findById(ProfessionalAvailabilityId).get();
		
    	professionalAvailabilityValidator.validate(form, ProfessionalAvailabilityId, professionalAvailability.getProfessional().getId());
		

		Optional<Specialty> optionalSpecialty = specialtyRepository.findById(form.getSpecialtyId());
    	Specialty storedSpecialty = optionalSpecialty.orElseThrow(() -> new EntityNotFoundException("Especialidade inválida"));
		
    	List<Vacancy> usedVacancies = scheduleService.removeProfessionalAvailabilitySchedules(professionalAvailability);
    	
		professionalAvailability.setSpecialty(storedSpecialty);
		professionalAvailability.setBeginHour(form.getBeginHourDate());
		professionalAvailability.setEndHour(form.getEndHourDate());
		professionalAvailability.setAppointmentType(form.getSchedulingTypeEnum());
		professionalAvailability.setDaysOfWeek(Utils.convertIntListToString(form.getDaysOfWeek()));
    	
    	scheduleService.generateProfessionalAvailabilitySchedules(professionalAvailability);
    	usedVacancies.forEach(v -> scheduleService.reScheduleAttendancy(v.getAttendance(), CancellingAttendanceReasonEnum.CANCELED_BY_PROFESSIONAL_AVAILABILITY));
		
		return professionalAvailability;
	}

    @Transactional
	public void removeProfessionalAvailability(Long id) {
    	this.canGenerateProfessionalAvailabilityShcedules();
		Optional<ProfessionalAvailability> optional = professionalAvailabilityRepository
				.findByIdAndStatus(id, ProfessionalAvailabilityStatus.ACTIVE);
		if (!optional.isPresent()) {
			throw new InvalidException("Escala já removida ou inexistente");
		}	
    	
		ProfessionalAvailability professionalAvailability = optional.get();
		professionalAvailability.setStatus(ProfessionalAvailabilityStatus.REMOVED);
		List<Vacancy> usedVacancies = scheduleService.removeProfessionalAvailabilitySchedules(professionalAvailability);
		usedVacancies.forEach(v -> scheduleService.reScheduleAttendancy(v.getAttendance(), CancellingAttendanceReasonEnum.CANCELED_BY_PROFESSIONAL_AVAILABILITY));
	}
    
    private void canGenerateProfessionalAvailabilityShcedules() {
		if(!healthInsurerService.canGenerateProfessionalAvailabilitySchedules()) {
			throw new InvalidException("Escalas Médicas não habilitadas.");
		}
    }

}
