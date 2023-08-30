package br.com.maidahealth.telemedapi.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.exceptions.InvalidUserException;
import br.com.maidahealth.telemedapi.form.ProfessionalForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.ProfessionalRepository;
import br.com.maidahealth.telemedapi.utils.ProfileUtils;
import br.com.maidahealth.telemedapi.utils.TelemedServerResponseUtil;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class ProfessionalService {

	@Autowired
	ProfessionalRepository repository;
	
	@Autowired
	private TelemedServerService telemedServerService;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private SpecialtyService specialtyService;

	@Autowired
	private AttendanceRepository attendanceRepository;

	public List<Professional> findAll() {
		return repository.findAll();
	}

	@Transactional
	public Professional save(@Valid ProfessionalForm form) {
		Professional professionalReturned = repository.findByCpf(form.getCpf()).orElseGet(() -> {
			Professional professional = form.toProfessional();
			professional.setSpecialties(specialtyService.findByCodeList(form.getSpecialties()));

			if(!Utils.isCellPhoneNumberValid(form.getPhoneNumber())) {
				throw new InvalidException("Telefone informado é inválido.");
			}

			JsonObject response = telemedServerService.createProfessional(form);
			String externalId = response.get("id").getAsString();
			professional.setDocwayId(externalId);
			return repository.save(professional);

		});

		return update(professionalReturned.getId(), form);
	}
	
	@Transactional
	public Professional update(Long id, ProfessionalForm form) {
		Optional<Professional> professionalOptional = repository.findById(id);
		if(professionalOptional.isPresent()){
			Professional professionalModel = professionalOptional.get();
			form.merge(professionalModel);
			
			if(!Utils.isCellPhoneNumberValid(form.getPhoneNumber())) {
				throw new InvalidException("Telefone informado é inválido.");
			}
			
			professionalModel.setSpecialties(specialtyService.findByCodeList(form.getSpecialties()));
			repository.save(professionalModel);

			List<String> specialties = new ArrayList<>();
			for(Specialty s : professionalModel.getSpecialties()){
				specialties.add(s.getExternalId());
			}

			form.setSpecialties(specialties);
			telemedServerService.updateProfessional(professionalModel.getDocwayId(), form);
			return professionalModel;
		}
		return null;
	}
	
	public Professional resetPassword(String id) {
		Optional<Professional> professionalOptional = repository.findByDocwayId(id);
		if(professionalOptional.isPresent()){
			Professional professionalModel = professionalOptional.get();			

			telemedServerService.resetPasswordProfessional(professionalModel.getDocwayId());			
			
			return professionalModel;
		}
		return null;
	}


	public Professional find(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Não foi encontrado profissional com o identificador " + id));
	}

	public Page<Professional> find(String name, Long providerId, Long specialtyId, Pageable pagination) {
		Set<Long> selectedProviders = ProfileUtils.getSecretaryProviders(providerId, authenticationService);
		return repository.find(name, selectedProviders, specialtyId, pagination);
	}

	public Page<Professional> find(Map<String, String> filter, Pageable pagination) {
		Optional.ofNullable(filter.get("providerId"))
				.map(value -> ProfileUtils.getSecretaryProviders(Long.valueOf(value), authenticationService)) // retorna os providers encontrados (longs)
				.map(longs -> longs.stream().map(String::valueOf).collect(Collectors.joining(","))) // mapeia os longs para uma String separada por vírgula
				.ifPresent(ids -> filter.put("providers", ids)); // adiciona no filter se os providers forem encontrados

			User currentUser =authenticationService.currentUser();
			if(!(currentUser.isAdmin() || currentUser.isClientAdmin())){
		
				Insured insured = currentUser.getInsured();
			
				if(Utils.getAgeOfInsured(insured) != null && Utils.getAgeOfInsured(insured) < 14) {
					filter.put("specialties", "48"); //Pediatria
				}
			}

		return repository.find(filter, pagination);
	}
	
	public Professional findByIdAndProvidersSecretariesId(Long professionalId, Long secretaryId){
		return repository.findByIdAndProvidersSecretariesId(professionalId, secretaryId).orElse(null);
	}
	
	public Professional findByIdAndSpecialtiesId(Long professionalId, Long specialtyId) {
		return repository.findByIdAndSpecialtiesId(professionalId, specialtyId).orElse(null);
	}

	@Transactional
	public int migrateCpfAndName() {
		return repository.migrateCpfAndName();
	}

	public Professional checkByCpf(String cpf) {
		if (!Utils.isCpfValido(cpf))
			throw new InvalidUserException("Cpf inválido: " + cpf);

		Professional professional = repository.findByCpf(cpf).orElseGet(() -> {

			TelemedServerResponseUtil resp = telemedServerService.getProfessional(cpf);
			if (resp.getStatus().is2xxSuccessful()) {
				JsonArray allProfessionals = JsonParser.parseString(resp.getBody()).getAsJsonObject().get("content").getAsJsonArray();
				for (JsonElement e : allProfessionals) {
					return telemedServerService.getProfessionalModel(e.getAsJsonObject());
				}
			} else {
				throw new InvalidUserException("Exceção ao consultar Server API");
			}
			return null;
		});

		if(professional != null && professional.getId() != null) {
				throw new InvalidException("Profissional já cadastrado.");
		}
		return professional;
	}

	public Professional findByDocwayId(String professionalUUID) {
		Optional<Professional> optProfessional = repository.findByDocwayId(professionalUUID);
		return optProfessional.isPresent() ? optProfessional.get() : null;
	}

	public Professional save(Professional p) {
		return repository.save(p);
	}

	public Attendance getCurrentAttendance(Long professionalId) {
		try {
	        Professional professional = repository.findById(professionalId).orElseThrow(() -> new InvalidException("Profissional com o id informado não foi encontrado"));
			String appoinString = telemedServerService.currentAttendance(professional);
	        Attendance attendance = attendanceRepository.findByDocwayId(appoinString).orElseThrow(() -> new InvalidException("Atendimento encontrado não pertence a essa cliente"));
			return attendance;
		} catch (Exception e) {
			return null;
		}
	}

}
