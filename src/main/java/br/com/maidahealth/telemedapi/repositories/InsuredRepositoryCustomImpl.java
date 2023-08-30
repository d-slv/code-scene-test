package br.com.maidahealth.telemedapi.repositories;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.utils.JpaOrderUtils;
import br.com.maidahealth.telemedapi.utils.Utils;

@Repository
@Transactional
public class InsuredRepositoryCustomImpl implements InsuredRepositoryCustom{

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public Page<Insured> findInsureds(String filter, String cpf, GenderEnum gender, Date startDate, Date finishDate, Pageable pagination) {
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();

		CriteriaQuery<Long> cqCount = criteriaBuilder.createQuery(Long.class);
		CriteriaQuery<Insured> cq = criteriaBuilder.createQuery(Insured.class);
		
		Root<Insured> countRoot = cqCount.from(Insured.class);
	    Root<Insured> insuredRoot = cq.from(Insured.class);
	    
	    List<Predicate> insuredPredicates = new ArrayList<Predicate>();
	    List<Predicate> countPredicates = new ArrayList<Predicate>();
		if(!StringUtils.isEmpty(filter)) {
			insuredPredicates.add(criteriaBuilder.like(criteriaBuilder.upper(insuredRoot.get("cpfAndName")), "%"+filter.toUpperCase()+"%"));
			countPredicates.add(criteriaBuilder.like(criteriaBuilder.upper(countRoot.get("cpfAndName")), "%"+filter.toUpperCase()+"%"));	
		}
		
		if(!StringUtils.isEmpty(cpf)) {
			insuredPredicates.add(criteriaBuilder.like(insuredRoot.get("cpf"), "%"+Utils.getCleanedCpf(cpf)+"%"));
			countPredicates.add(criteriaBuilder.like(countRoot.get("cpf"), "%"+Utils.getCleanedCpf(cpf)+"%"));
		}
		
		 if(startDate != null && finishDate != null) {
			 insuredPredicates.add(criteriaBuilder.between(insuredRoot.get("birthDate"), startDate, finishDate));
			 countPredicates.add(criteriaBuilder.between(countRoot.get("birthDate"), startDate, finishDate));
		 }else if(startDate != null) {
			 insuredPredicates.add(criteriaBuilder.greaterThanOrEqualTo(insuredRoot.get("birthDate"), startDate));
			 countPredicates.add(criteriaBuilder.greaterThanOrEqualTo(countRoot.get("birthDate"), startDate));
		 }else if(finishDate != null) {
			 insuredPredicates.add(criteriaBuilder.lessThanOrEqualTo(insuredRoot.get("birthDate"), finishDate));
			 countPredicates.add(criteriaBuilder.lessThanOrEqualTo(countRoot.get("birthDate"), finishDate));
		 }
		 
		 if(gender != null) {
			 insuredPredicates.add(criteriaBuilder.equal(insuredRoot.join("user").<User>get("gender").as(GenderEnum.class), gender));
			 countPredicates.add(criteriaBuilder.equal(countRoot.join("user").<User>get("gender").as(GenderEnum.class), gender));
		 }
		
		Predicate[] attendancePredArray = new Predicate[insuredPredicates.size()];
	    insuredPredicates.toArray(attendancePredArray);
	    
	    Predicate[] countPredArray = new Predicate[countPredicates.size()];
	    countPredicates.toArray(countPredArray);
	    
	    cq.where(attendancePredArray);
	    cqCount.where(countPredArray);
	    TypedQuery<Long> queryCount = em.createQuery(cqCount.select(criteriaBuilder.count(countRoot)));
	    Long totalRows = queryCount.getSingleResult();
	    
	    JpaOrderUtils.addOrderFromPagination(pagination, criteriaBuilder, cq, insuredRoot);
	    TypedQuery<Insured> query = em.createQuery(cq);
	    query.setFirstResult(pagination.getPageNumber() * pagination.getPageSize());
	    query.setMaxResults(pagination.getPageSize());
	    
		List<Insured> resultList = query.getResultList();
		
		Page<Insured> result = new PageImpl<Insured>(resultList, pagination, totalRows);
	    return result;
	
	}

	@Override
	public int migrateCpfAndName() {
		String migration1 = "UPDATE insured set cpf_and_name = concat(cpf, ' - ', name) WHERE "
				+ "cpf IS NOT NULL "
				+ "AND CPF <> '00000000000' "
				+ "AND cpf_and_name IS NULL";
		int countUpdate1 = em.createNativeQuery(migration1).executeUpdate();
		
		String migration2 = "UPDATE insured set cpf_and_name = name WHERE "
				+ "(cpf IS NULL OR cpf = '00000000000') "
				+ "AND cpf_and_name IS NULL";
		
		int countUpdate2 = em.createNativeQuery(migration2).executeUpdate();
		return countUpdate1+countUpdate2;
		
	}

}
