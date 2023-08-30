package br.com.maidahealth.telemedapi.repositories;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.maidahealth.telemedapi.models.Provider;

public interface ProviderRepositoryCustom {

	Page<Provider> find(String name, Set<Long> selectedProviders, Long professionalId, Long specialtyId, Pageable pagination);
}
