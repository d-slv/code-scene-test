package br.com.maidahealth.telemedapi.repositories;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;

import org.springframework.util.StringUtils;

import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.utils.Utils;
import reactor.util.CollectionUtils;

public class SpecialtyRepositoryCustomImpl implements SpecialtyRepositoryCustom {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<Specialty> find(String name, Set<Long> providerIds, Long professionalId, Boolean availableForUrgency) {
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<Specialty> cq = criteriaBuilder.createQuery(Specialty.class);
		
	    Root<Specialty> specialtyRoot = cq.from(Specialty.class);
	    
	    List<Predicate> specialtyPredicates = new ArrayList<Predicate>();

	    if (!StringUtils.isEmpty(name)) {
	        specialtyPredicates.add(criteriaBuilder.like(criteriaBuilder.upper(specialtyRoot.<String>get("name").as(String.class)), "%" + name.toUpperCase() + "%"));
	    }
	    
	    if(!CollectionUtils.isEmpty(providerIds)) {
	    	specialtyPredicates.add(specialtyRoot.join("professionals").join("providers").<Provider>get("id").as(Long.class).in(providerIds));
	    }
	    
	    if(professionalId != null) {
	    	specialtyPredicates.add(criteriaBuilder.equal(specialtyRoot.join("professionals").<Professional>get("id").as(Long.class), professionalId));
	    }
	    
        if (!StringUtils.isEmpty(availableForUrgency)) {
        	specialtyPredicates.add(criteriaBuilder.equal(specialtyRoot.<Boolean>get("availableForUrgency"), availableForUrgency));
        }
        
        Predicate[] providerPredArray = new Predicate[specialtyPredicates.size()];
	    specialtyPredicates.toArray(providerPredArray);
	    
	    cq.where(providerPredArray).distinct(true);	    
	    TypedQuery<Specialty> query = em.createQuery(cq);
	    
	    return query.getResultList();
	}

	@Override
	public List<Specialty> find(Optional<String> name, Set<Long> providersId, Optional<Long> professionalId,
								Optional<Boolean> elective, Optional<Boolean> urgency, Optional<BigDecimal> minValue, Optional<BigDecimal> maxValue) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Specialty> cq = cb.createQuery(Specialty.class);
		Root<Specialty> root = cq.from(Specialty.class);
		List<Predicate> specialtyPredicates = new ArrayList<>();

		Path<Object> availableForElectivePath = root.get("availableForElective");
		Path<Object> availableForUrgencyPath = root.get("availableForUrgency");
		Path<Double> electivePricePath = root.get("currentElectiveValue");
		Path<Double> urgencyPricePath = root.get("currentUrgencyValue");

		name.ifPresent(filter -> specialtyPredicates.add(
				cb.like(cb.upper(root.<String>get("searchQuery").as(String.class)), "%" + Utils.normalizeToQuery(filter.toUpperCase())+ "%"))
		);
		elective.ifPresent(availableConsumer(cb, specialtyPredicates, availableForElectivePath));
		urgency.ifPresent(availableConsumer(cb, specialtyPredicates, availableForUrgencyPath));
		professionalId.ifPresent(id -> specialtyPredicates.add(
				cb.equal(root.join("professionals").<Professional>get("id").as(Long.class), id))
		);

		double minDouble = minValue.map(BigDecimal::doubleValue).orElseGet(() -> 0.0);
		double maxDouble = maxValue.map(BigDecimal::doubleValue).orElseGet(() -> Double.MAX_VALUE);
		Predicate minElective = cb.greaterThanOrEqualTo(electivePricePath, minDouble);
		Predicate minUrgency = cb.greaterThanOrEqualTo(urgencyPricePath, minDouble);
		Predicate maxElective = cb.lessThanOrEqualTo(electivePricePath, maxDouble);
		Predicate maxUrgency = cb.lessThanOrEqualTo(urgencyPricePath, maxDouble);
		if (minValue.isPresent() && maxValue.isPresent()) {
			Predicate electiveBetween = cb.and(minElective, maxElective);
			Predicate urgencyBetween = cb.and(minUrgency, maxUrgency);
			specialtyPredicates.add(cb.or(electiveBetween, urgencyBetween));
		} else if (minValue.isPresent()) {
			specialtyPredicates.add(cb.or(minElective, minUrgency));
		} else if (maxValue.isPresent()) {
			specialtyPredicates.add(cb.or(maxElective, maxUrgency));
		}

		if (!CollectionUtils.isEmpty(providersId)) {
			specialtyPredicates.add(root.join("professionals").join("providers").<Provider>get("id").as(Long.class).in(providersId));
		}

		Predicate[] providerPredArray = new Predicate[specialtyPredicates.size()];
		specialtyPredicates.toArray(providerPredArray);

		cq.where(providerPredArray).distinct(true);
		cq.orderBy(cb.asc(root.get("name")));
		TypedQuery<Specialty> query = em.createQuery(cq);

		return query.getResultList();
	}

	private Consumer<Boolean> availableConsumer(CriteriaBuilder cb, List<Predicate> specialtyPredicates, Path<Object> path) {
		return available -> {
			if (available) {
				specialtyPredicates.add(cb.equal(path, available));
			} else {
				specialtyPredicates.add(cb.or(cb.equal(path, available), cb.isNull(path)));
			}
		};
	}
}
