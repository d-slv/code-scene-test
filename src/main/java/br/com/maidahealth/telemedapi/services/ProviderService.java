package br.com.maidahealth.telemedapi.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.exceptions.InvalidUserException;
import br.com.maidahealth.telemedapi.form.ProviderForm;
import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.repositories.ProviderRepository;
import br.com.maidahealth.telemedapi.utils.ProfileUtils;

@Service
public class ProviderService {
	
	@Autowired
	ProviderRepository providerRepository;
	
	@Autowired
	private AuthenticationService authenticationService;

	public Provider save(@Valid ProviderForm form) {
		Optional<Provider> result = providerRepository.findByCnpj(form.getCnpj());
		if(result.isPresent()) {
			throw new InvalidUserException("Já existe um prestador com o cnpj informado.");		
		}
		Provider provider = form.toProvider();
		providerRepository.save(provider);
		return provider;
	}

	public List<Provider> findAll() {
		List<Provider> providers = providerRepository.findAll();
		return providers;
	}

	public Provider update(Long id, ProviderForm form) {
		Optional<Provider> providerOptional = providerRepository.findById(id);
		if(providerOptional.isPresent()){
			Provider providerModel = providerOptional.get();
			form.merge(providerModel);
			providerRepository.save(providerModel);
			return providerModel;
		}
		return null;
	}

	public Provider find(Long id) {
		Optional<Provider> optional = providerRepository.findById(id);
		if(optional.isPresent()) {
			return optional.get();
		}
		throw new EntityNotFoundException("Não foi encontrado prestador com o identificador: "+id);
	}

	public Page<Provider> find(String name, Long professionalId, Long specialtyId, Pageable pagination) {
		Set<Long> selectedProviders = ProfileUtils.getSecretaryProviders(null, authenticationService);
		return providerRepository.find(name, selectedProviders, professionalId, specialtyId, pagination);
	}

}
