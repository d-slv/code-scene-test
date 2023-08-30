package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.models.User;

public class SecretaryDto extends UserDto{

	private List<ProviderDto> providers = new ArrayList<>();
	
	private List<ProfessionalDto> professionals = new ArrayList<>();
	
	public SecretaryDto(User user) {
		super(user);
		Set<Provider> providersModel = user.getProviders();
		providers = providersModel.stream().map(ProviderDto::new).collect(Collectors.toList());
		professionals = providersModel.stream().flatMap(pr -> pr.getProfessionals().stream().map(ProfessionalDto::new)).collect(Collectors.toList());
	}

	public List<ProviderDto> getProviders() {
		return providers;
	}

	public void setProviders(List<ProviderDto> providers) {
		this.providers = providers;
	}

	public List<ProfessionalDto> getProfessionals() {
		return professionals;
	}

	public void setProfessionals(List<ProfessionalDto> professionals) {
		this.professionals = professionals;
	}

}
