package br.com.maidahealth.telemedapi.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import br.com.maidahealth.telemedapi.form.SpecialtyForm;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.SpecialtyHistoryPrice;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.SpecialtyHistoryPriceRepository;
import br.com.maidahealth.telemedapi.repositories.SpecialtyRepository;
import br.com.maidahealth.telemedapi.utils.ProfileUtils;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class SpecialtyService {

	@Autowired
	public SpecialtyRepository repository;
	
	@Autowired
	public SpecialtyHistoryPriceRepository historyPriceRepository;

	@Autowired
	private AuthenticationService authenticationService;

	public List<Specialty> findAll() {
		return repository.findAll();
	}

	public Specialty update(Long id, SpecialtyForm form) {
		Specialty specialtyModel = repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Não foi encontrada especialidade com o identificador informado " + id));

		Double oldUrgencyValue = Optional.ofNullable(specialtyModel.getCurrentUrgencyValue()).orElseGet(() -> 0.0);
		Double oldElectiveValue = Optional.ofNullable(specialtyModel.getCurrentElectiveValue()).orElseGet(() -> 0.0);

		form.merge(specialtyModel);
		repository.save(specialtyModel);
		saveHistoryPrices(oldUrgencyValue, oldElectiveValue, form, specialtyModel);

		return specialtyModel;
	}

	private void saveHistoryPrices(Double oldUrgencyValue, Double oldElectiveValue, SpecialtyForm specialty,
		Specialty specialtyModel) {

		if(oldUrgencyValue != specialty.getUrgencyValue().doubleValue())
			saveHistory(AttendanceType.URGENCY, specialty.getUrgencyValue(), specialtyModel, oldUrgencyValue);

		if(oldElectiveValue != specialty.getElectiveValue().doubleValue())
			saveHistory(AttendanceType.ELECTIVE, specialty.getElectiveValue(), specialtyModel, oldElectiveValue);
	}

	private void saveHistory(AttendanceType type, BigDecimal newValue, Specialty specialty, Double oldValue) {
		SpecialtyHistoryPrice specialtyHistoryPrice = new SpecialtyHistoryPrice();
		specialtyHistoryPrice.setCurrentValue(newValue);
		specialtyHistoryPrice.setPreviousValue(new BigDecimal(oldValue));
		specialtyHistoryPrice.setType(type);
		specialtyHistoryPrice.setUser(authenticationService.currentUser());
		specialtyHistoryPrice.setSpecialty(specialty);
		historyPriceRepository.save(specialtyHistoryPrice);
	}

	public Specialty find(Long id) {
		Optional<Specialty> optional = repository.findById(id);
		if(optional.isPresent()) {
			return optional.get();
		}
		throw new EntityNotFoundException("Não foi encontrada especialidade com o identificador informado "+id);
	}
	
	public Specialty saveSpecialty(String code, String name, String docwayId) {
		Optional<Specialty> optionalSpecialty = repository.findByCode(code);
		
		Specialty specialty = new Specialty();
		
		if(optionalSpecialty.isPresent())
			specialty = optionalSpecialty.get();
		
		specialty.setCode(code);
		specialty.setName(name);
		specialty.setDocwayId(docwayId);
		return repository.save(specialty);
	}
	
	public Specialty findDefaultSpecialty() {
		return repository.findByExternalId("51c5cd5f-325e-4d80-9dcb-91ee2416c1c9").get();
	}

	public List<Specialty> find(Optional<String> name, Optional<Long> providerId, Optional<Long> professionalId,
								Optional<Boolean> elective, Optional<Boolean> urgency, Optional<BigDecimal> minValue, Optional<BigDecimal> maxValue) {
		Set<Long> selectedProviders = ProfileUtils.getSecretaryProviders(providerId.orElseGet(() -> null), authenticationService);

		User currentUser =authenticationService.currentUser();
		if(!(currentUser.isAdmin() || currentUser.isClientAdmin())){

			Insured insured = currentUser.getInsured();
	
			if(Utils.getAgeOfInsured(insured) != null && Utils.getAgeOfInsured(insured) < 14) {
				name = Optional.of("Pediatria");
			}
		}
		return repository.find(name, selectedProviders, professionalId, elective, urgency, minValue, maxValue);
	}

	public List<Specialty> availableForUrgency(String name) {
		List<Specialty> specialties = repository.find(name, null, null, true);
		if(specialties.isEmpty() && StringUtils.isEmpty(name)) {
			specialties = new ArrayList<Specialty>();
			specialties.add(findDefaultSpecialty());
		}
		return specialties;
	}

	public Set<Specialty> findByCodeList(List<String> specialties) {
		Set<Specialty> specialtyList = new HashSet<>();
		specialties.forEach(s -> {
			Optional<Specialty> specialty = repository.findByCode(s);
			specialty.ifPresent(specialtyList::add);
		});

		return specialtyList;
	}

	public List<Specialty> findElectiveAvailable() {
		return repository.findAllByAvailableForElectiveTrue();
	}
}
