package br.com.maidahealth.telemedapi.repositories;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import br.com.maidahealth.telemedapi.models.Specialty;

public interface SpecialtyRepositoryCustom {

	List<Specialty> find(String name, Set<Long> providerId, Long professionalId, Boolean availableForUrgency);

	List<Specialty> find(Optional<String> name, Set<Long> providersId, Optional<Long> professionalId,
						 Optional<Boolean> elective, Optional<Boolean> urgency, Optional<BigDecimal> minValue, Optional<BigDecimal> maxValue);
}
