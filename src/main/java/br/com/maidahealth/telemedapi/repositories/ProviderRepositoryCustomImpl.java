package br.com.maidahealth.telemedapi.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.utils.JpaOrderUtils;
import reactor.util.CollectionUtils;

@Repository
@Transactional(readOnly = true)
public class ProviderRepositoryCustomImpl implements ProviderRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Page<Provider> find(String name, Set<Long> providerIds, Long professionalId, Long specialtyId,
			Pageable pagination) {
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<Long> cqCount = criteriaBuilder.createQuery(Long.class);
		CriteriaQuery<Provider> cq = criteriaBuilder.createQuery(Provider.class);
		
		Root<Provider> countRoot = cqCount.from(Provider.class);
	    Root<Provider> providerRoot = cq.from(Provider.class);
	    
	    List<Predicate> providerPredicates = new ArrayList<Predicate>();
	    List<Predicate> countPredicates = new ArrayList<Predicate>();

	    if (!StringUtils.isEmpty(name)) {
	        providerPredicates.add(criteriaBuilder.like(criteriaBuilder.upper(providerRoot.<String>get("name").as(String.class)), "%" + name.toUpperCase() + "%"));
	        countPredicates.add(criteriaBuilder.like(criteriaBuilder.upper(countRoot.<String>get("name").as(String.class)), "%" + name.toUpperCase() + "%"));
  
	    }
	    
	    if(!CollectionUtils.isEmpty(providerIds)) {
	    	providerPredicates.add(providerRoot.<Provider>get("id").as(Long.class).in(providerIds));
	    	countPredicates.add(countRoot.<Provider>get("id").as(Long.class).in(providerIds));
	    }

	    if(specialtyId != null) {
	    	providerPredicates.add(
	    			criteriaBuilder.equal(
	    					providerRoot.join("professionals").join("specialties").<Specialty>get("id").as(Long.class), specialtyId
	    					)
	    			);
	    	countPredicates.add(
	    			criteriaBuilder.equal(
	    					countRoot.join("professionals").join("specialties").<Specialty>get("id").as(Long.class), specialtyId
	    					)
	    			);
	    }
	    
	    Predicate[] providerPredArray = new Predicate[providerPredicates.size()];
	    providerPredicates.toArray(providerPredArray);
	    
	    Predicate[] countPredArray = new Predicate[countPredicates.size()];
	    countPredicates.toArray(countPredArray);

	    
	    cq.where(providerPredArray).distinct(true);
	    cqCount.where(countPredArray).distinct(true);
	    TypedQuery<Long> queryCount = em.createQuery(cqCount.select(criteriaBuilder.count(countRoot)));
	    Long totalRows = queryCount.getSingleResult();
	    
	    JpaOrderUtils.addOrderFromPagination(pagination, criteriaBuilder, cq, providerRoot);
	    TypedQuery<Provider> query = em.createQuery(cq);
	    query.setFirstResult(pagination.getPageNumber() * pagination.getPageSize());
	    query.setMaxResults(pagination.getPageSize());
	    
	    
		List<Provider> resultList = query.getResultList();
		Page<Provider> result = new PageImpl<Provider>(resultList, pagination, totalRows);
	    return result;
	}

}
