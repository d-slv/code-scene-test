package br.com.maidahealth.telemedapi.repositories;

import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.utils.JpaOrderUtils;
import br.com.maidahealth.telemedapi.utils.Utils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import reactor.util.CollectionUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Repository
@Transactional(readOnly = true)
public class ProfessionalRepositoryCustomImpl implements ProfessionalRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Page<Professional> find(String name, Set<Long> providerIds, Long specialtyId, Pageable pagination) {
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<Long> cqCount = criteriaBuilder.createQuery(Long.class);
		CriteriaQuery<Professional> cq = criteriaBuilder.createQuery(Professional.class);
		
		Root<Professional> countRoot = cqCount.from(Professional.class);
	    Root<Professional> professionalRoot = cq.from(Professional.class);
	    
	    List<Predicate> predicatesProfessional = new ArrayList<Predicate>();
	    List<Predicate> predicatesCount = new ArrayList<Predicate>();

	    if (!StringUtils.isEmpty(name)) {
	        predicatesProfessional.add(criteriaBuilder.like(criteriaBuilder.upper(professionalRoot.<String>get("name").as(String.class)), "%" + name.toUpperCase() + "%"));
	        predicatesCount.add(criteriaBuilder.like(criteriaBuilder.upper(countRoot.<String>get("name").as(String.class)), "%" + name.toUpperCase() + "%"));
  
	    }
	    
	    if(!CollectionUtils.isEmpty(providerIds)) {
	    	predicatesProfessional.add(professionalRoot.join("providers").<Provider>get("id").as(Long.class).in(providerIds));
	    	predicatesCount.add(countRoot.join("providers").<Provider>get("id").as(Long.class).in(providerIds));
	    }

	    if(specialtyId != null) {
	    	predicatesProfessional.add(
	    			criteriaBuilder.equal(
	    					professionalRoot.join("specialties").<Specialty>get("id").as(Long.class), specialtyId
	    					)
	    			);
	    	predicatesCount.add(
	    			criteriaBuilder.equal(
	    					countRoot.join("specialties").<Specialty>get("id").as(Long.class), specialtyId
	    					)
	    			);
	    }
	    
	    Predicate[] professionalPredArray = new Predicate[predicatesProfessional.size()];
	    predicatesProfessional.toArray(professionalPredArray);
	    
	    Predicate[] countPredArray = new Predicate[predicatesCount.size()];
	    predicatesCount.toArray(countPredArray);

	    
	    cq.where(professionalPredArray);
	    cqCount.where(countPredArray);
	    TypedQuery<Long> queryCount = em.createQuery(cqCount.select(criteriaBuilder.count(countRoot)));
	    Long totalRows = queryCount.getSingleResult();
	    
	    JpaOrderUtils.addOrderFromPagination(pagination, criteriaBuilder, cq, professionalRoot);
	    TypedQuery<Professional> query = em.createQuery(cq);
	    query.setFirstResult(pagination.getPageNumber() * pagination.getPageSize());
	    query.setMaxResults(pagination.getPageSize());
	    
	    
		List<Professional> resultList = query.getResultList();
		
		Page<Professional> result = new PageImpl<Professional>(resultList, pagination, totalRows);
	    return result;
	}

    // filter: { ID, NAME, CPF, CRM(UF+NUMBER), SPECIALTIES, PROVIDER, SPECIALTY }
    @Override
    public Page<Professional> find(Map<String, String> filter, Pageable pagination) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();

        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        CriteriaQuery<Professional> professionalQuery = criteriaBuilder.createQuery(Professional.class);

        Root<Professional> countSelect = countQuery.from(Professional.class);
        Root<Professional> professionalSelect = professionalQuery.from(Professional.class);

        List<Predicate> professionalPreds = new ArrayList<>();
        List<Predicate> countPreds = new ArrayList<>();

		Optional.ofNullable(filter.get("id"))
				.filter(str -> !StringUtils.isEmpty(str))
				.map(Long::parseLong)
				.ifPresent(id -> {
					professionalPreds.add(criteriaBuilder.equal(professionalSelect.get("id"), id));
					countPreds.add(criteriaBuilder.equal(countSelect.get("id"), id));
				});

		Optional.ofNullable(filter.get("name"))
				.filter(str -> !StringUtils.isEmpty(str))
				.ifPresent(nameValue -> {
					professionalPreds.add(criteriaBuilder.like(criteriaBuilder.upper(professionalSelect.get("name")), "%" + nameValue.toUpperCase() + "%"));
					countPreds.add(criteriaBuilder.like(criteriaBuilder.upper(countSelect.get("name")), "%" + nameValue.toUpperCase() + "%"));
				});

		Optional.ofNullable(filter.get("crm"))
				.filter(str -> !StringUtils.isEmpty(str))
				.map(String::toUpperCase) // transforma em maíusculas
				.ifPresent(crmValue -> {
					professionalPreds.add(criteriaBuilder.like(criteriaBuilder.concat(professionalSelect.get("ufCrm"), professionalSelect.get("associationNumber")), "%".concat(crmValue).concat("%")));
					countPreds.add(criteriaBuilder.like(criteriaBuilder.concat(countSelect.get("ufCrm"), countSelect.get("associationNumber")), "%".concat(crmValue).concat("%")));
				});

		Optional.ofNullable(filter.get("cpf"))
				.filter(str -> !StringUtils.isEmpty(str))
				.map(cpfString -> "%".concat(cpfString).concat("%"))
				.ifPresent(cpfLike -> {
					professionalPreds.add(criteriaBuilder.like(professionalSelect.get("cpf"), cpfLike));
					countPreds.add(criteriaBuilder.like(countSelect.get("cpf"), cpfLike));
				});

		Optional.ofNullable(filter.get("specialties"))
				.filter(str -> !StringUtils.isEmpty(str))
				.map(str -> str.split(",")) // converte a String separada por vírgula para um array de String
				.map(strIds -> Stream.of(strIds).map(String::trim).map(Long::parseLong).collect(Collectors.toList())) // retira espaços em branco e retorna uma lista de ids (long)
				.ifPresent(longIds -> {
					professionalPreds.add(professionalSelect.join("specialties").get("id").as(Long.class).in(longIds));
					countPreds.add(countSelect.join("specialties").get("id").as(Long.class).in(longIds));
				});

		Optional.ofNullable(filter.get("filter"))
				.filter(str -> !StringUtils.isEmpty(str))
				.map(Utils::normalizeToQuery)// normaliza o filtro, ignorando acentos, espaços etc
				.ifPresent(concatValue -> {
					professionalPreds.add(criteriaBuilder.like(criteriaBuilder.upper(professionalSelect.get("searchQuery")), "%" + concatValue + "%"));
					countPreds.add(criteriaBuilder.like(criteriaBuilder.upper(countSelect.get("searchQuery")), "%" + concatValue + "%"));
				});

		Optional.ofNullable(filter.get("providers"))
				.filter(str -> !StringUtils.isEmpty(str))
				.map(str -> str.split(","))
				.map(strIds -> Stream.of(strIds).map(String::trim).map(Long::parseLong).collect(Collectors.toList()))
				.ifPresent(longIds -> {
					professionalPreds.add(professionalSelect.join("providers").get("id").as(Long.class).in(longIds));
					countPreds.add(countSelect.join("providers").get("id").as(Long.class).in(longIds));
				});

		Optional.ofNullable(filter.get("specialty"))
				.filter(str -> !StringUtils.isEmpty(str))
				.filter(org.apache.commons.lang3.StringUtils::isNumeric) // verifica se o valor passado é numérico
				.ifPresent(id -> {
					professionalPreds.add(criteriaBuilder.equal(professionalSelect.join("specialties").get("id").as(Long.class), id));
					countPreds.add(criteriaBuilder.equal(countSelect.join("specialties").get("id").as(Long.class), id));
				});

        Predicate[] countPredArray = new Predicate[countPreds.size()];
        countPreds.toArray(countPredArray);
        Predicate[] professionalPredArray = new Predicate[professionalPreds.size()];
        professionalPreds.toArray(professionalPredArray);

        professionalQuery.where(professionalPredArray);
        countQuery.where(countPredArray);

        TypedQuery<Long> queryCount = em.createQuery(countQuery.select(criteriaBuilder.count(countSelect)));
        Long totalRows = queryCount.getSingleResult();

        JpaOrderUtils.addOrderFromPagination(pagination, criteriaBuilder, professionalQuery, professionalSelect);
        TypedQuery<Professional> query = em.createQuery(professionalQuery);
        query.setFirstResult(pagination.getPageNumber() * pagination.getPageSize());
        query.setMaxResults(pagination.getPageSize());

        List<Professional> resultList = query.getResultList();

        return new PageImpl<>(resultList, pagination, totalRows);
    }

	@Override
	public int migrateCpfAndName() {
		String migration1 = "UPDATE professional set cpf_and_name = concat(cpf, ' - ', name) WHERE "
				+ "cpf IS NOT NULL "
				+ "AND cpf <> '00000000000' "
				+ "AND cpf_and_name IS NULL";
		int countUpdate1 = em.createNativeQuery(migration1).executeUpdate();

		String migration2 = "UPDATE professional set cpf_and_name = name WHERE "
				+ "(cpf IS NULL OR cpf = '00000000000') "
				+ "AND cpf_and_name IS NULL";

		int countUpdate2 = em.createNativeQuery(migration2).executeUpdate();

		return countUpdate1 + countUpdate2;
	}
}
