package br.com.maidahealth.telemedapi.utils;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.services.AuthenticationService;

public class ProfileUtils {
	public static Set<Long> getSecretaryProviders(Long providerId, AuthenticationService authenticationService) {
		Set<Long> providerIds = new HashSet<>();
		if(providerId == null) {
			User currentUser = authenticationService.currentUser();
			if(currentUser.isSecretary()) {
				providerIds = currentUser.getProviders().stream().map(Provider::getId).collect(Collectors.toSet());
			}
		}else {
			providerIds.add(providerId);
		}
		return providerIds;
	}
	
	public static Set<Long> getSecretaryProviders(User currentUser) {
		Set<Long> providerIds = new HashSet<>();
		if(currentUser.isSecretary()) {
			providerIds = currentUser.getProviders().stream().map(Provider::getId).collect(Collectors.toSet());
		}
		return providerIds;
	}
}
