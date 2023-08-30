package br.com.maidahealth.telemedapi.repositories;

import java.util.Map;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.maidahealth.telemedapi.models.Professional;

public interface ProfessionalRepositoryCustom {

	public Page<Professional> find(String name, Set<Long> providerId, Long specialtyId, Pageable pagination);

	public Page<Professional> find(Map<String, String> filter, Pageable pagination);

    public int migrateCpfAndName();
}
