package br.com.maidahealth.telemedapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.Provider;

public interface ProviderRepository extends JpaRepository<Provider, Long>, ProviderRepositoryCustom{

	Optional<Provider> findByCnpj(String cnpj);
}
