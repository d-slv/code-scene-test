package br.com.maidahealth.telemedapi.repositories;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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

import br.com.maidahealth.telemedapi.enums.AttendanceDateType;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.repositories.template.DateTypeTemplate;
import br.com.maidahealth.telemedapi.utils.JpaOrderUtils;
import br.com.maidahealth.telemedapi.utils.Utils;
import reactor.util.CollectionUtils;
@Repository
@Transactional(readOnly = true)
public class AttendanceRepositoryCustomImpl implements AttendanceRepositoryCustom {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public Page<Attendance> findSecretaryAttendances(String filter, Long insuredId, Set<Long> providerIds,
			Long speciatyId, Long professionalId, List<AttendanceStatus> status, Date startDate, Date finishDate, String type, AttendanceDateType dateType,
			Boolean hasDocuments, Date schedulingDate, String schedulingHour, Pageable pagination) {
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<Long> cqCount = criteriaBuilder.createQuery(Long.class);
		CriteriaQuery<Attendance> cq = criteriaBuilder.createQuery(Attendance.class);
		
		Root<Attendance> countRoot = cqCount.from(Attendance.class);
	    Root<Attendance> attendanceRoot = cq.from(Attendance.class);
	    
	    List<Predicate> attendancePredicates = new ArrayList<Predicate>();
	    List<Predicate> countPredicates = new ArrayList<Predicate>();
	    if (!StringUtils.isEmpty(filter)) {
	    	
	    	String normalizedFilter = Utils.normalizeToQuery(filter);
	    	Predicate professionalNameAttendance = criteriaBuilder.like(criteriaBuilder.upper(attendanceRoot.join("professional").<Professional>get("searchQuery").as(String.class)), "%" + normalizedFilter + "%");
	    	Predicate professionalNameCount = criteriaBuilder.like(criteriaBuilder.upper(countRoot.join("professional").<Professional>get("searchQuery").as(String.class)), "%" + normalizedFilter + "%");

	    	Predicate insuredNameAttendance = criteriaBuilder.like(criteriaBuilder.upper(attendanceRoot.join("insured").<Provider>get("searchQuery").as(String.class)), "%" + normalizedFilter + "%");
	    	Predicate insuredNameCount = criteriaBuilder.like(criteriaBuilder.upper(countRoot.join("insured").<Provider>get("searchQuery").as(String.class)), "%" + normalizedFilter + "%");
	    	
	    	attendancePredicates.add(criteriaBuilder.or(professionalNameAttendance, insuredNameAttendance));
	    	countPredicates.add(criteriaBuilder.or(professionalNameCount, insuredNameCount));
	    }	
	    
	    if(!CollectionUtils.isEmpty(providerIds)) {
	    	attendancePredicates.add(attendanceRoot.join("provider").<Provider>get("id").as(Long.class).in(providerIds));
	    	countPredicates.add(countRoot.join("provider").<Provider>get("id").as(Long.class).in(providerIds));
	    }
	    
	    if(insuredId != null) {
	    	attendancePredicates.add(criteriaBuilder.equal(
						attendanceRoot.join("insured").<Insured>get("id").as(Long.class), insuredId
					));
	    	countPredicates.add(criteriaBuilder.equal(
						countRoot.join("insured").<Insured>get("id").as(Long.class), insuredId
					));
	    }
	    
	    if(speciatyId != null) {
	    	attendancePredicates.add(criteriaBuilder.equal(
						attendanceRoot.join("specialty").<Specialty>get("id").as(Long.class), speciatyId
					));
	    	countPredicates.add(criteriaBuilder.equal(
						countRoot.join("specialty").<Specialty>get("id").as(Long.class), speciatyId
					));
	    }
	    
	    if(professionalId != null) {
	    	attendancePredicates.add(criteriaBuilder.equal(
						attendanceRoot.join("professional").<Specialty>get("id").as(Long.class), professionalId
					));
	    	countPredicates.add(criteriaBuilder.equal(
						countRoot.join("professional").<Specialty>get("id").as(Long.class), professionalId
					));
	    }
		
	    if(!CollectionUtils.isEmpty(status)) {
		    	attendancePredicates.add(
								attendanceRoot.<Attendance>get("status").as(AttendanceStatus.class).in(status)
							);
		    	countPredicates.add(
							countRoot.<Attendance>get("status").as(AttendanceStatus.class).in(status)
						);
	    }
	    
	    if(!StringUtils.isEmpty(type)) {
	    	attendancePredicates.add(criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), type));
	    	countPredicates.add(criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), type));
	    }
	    
	    Predicate attendanceOr = null;
	    Predicate countOr = null;
	    
	    if (hasDocuments != null) {
	    	Predicate attendancePrescription = criteriaBuilder.equal(attendanceRoot.get("hasPrescription"), hasDocuments);
	    	Predicate attendanceSickNote = criteriaBuilder.equal(attendanceRoot.get("hasSickNote"), hasDocuments);
	    	Predicate attendanceExamRequest = criteriaBuilder.equal(attendanceRoot.get("hasExamRequest"), hasDocuments);
	    	
	    	Predicate countPrescription = criteriaBuilder.equal(countRoot.get("hasPrescription"), hasDocuments);
	    	Predicate countSickNote = criteriaBuilder.equal(countRoot.get("hasSickNote"), hasDocuments);
	    	Predicate countExamRequest = criteriaBuilder.equal(countRoot.get("hasExamRequest"), hasDocuments);
	    	
	    	attendanceOr = criteriaBuilder.or(attendancePrescription, attendanceSickNote, attendanceExamRequest);
	    	countOr = criteriaBuilder.or(countPrescription, countSickNote, countExamRequest);

	        attendancePredicates.add(attendanceOr);
	        countPredicates.add(countOr);
		}
	    
	    Date dayWithTimeAtEndOfDay = null;
	    
	    if(finishDate != null) {
	    	dayWithTimeAtEndOfDay = Utils.getDayWithTimeAtEndOfDay(finishDate);
	    	dayWithTimeAtEndOfDay = Utils.add(dayWithTimeAtEndOfDay, Calendar.HOUR, 3);
	    }
    	
	    if(startDate != null) {
	    	startDate = Utils.add(startDate, Calendar.HOUR, 3);
	    }
	    
	    DateTypeTemplate templateScheduling = DateTypeTemplate.getTemplateByDateType(AttendanceDateType.SCHEDULING);

	    if(schedulingDate != null) {
	    	if (schedulingHour != null) {
	        	String[] hour = schedulingHour.split(":");
	    		schedulingDate = Utils.add(schedulingDate, Calendar.HOUR, Integer.parseInt(hour[0]));
	    		schedulingDate = Utils.add(schedulingDate, Calendar.MINUTE, Integer.parseInt(hour[1]));
	    		schedulingDate = Utils.add(schedulingDate, Calendar.HOUR, 3);
				templateScheduling.setPredicatesForNotNullSchedulingHour(criteriaBuilder, attendanceRoot, countRoot, attendancePredicates, countPredicates, schedulingDate);	
			} else {
				schedulingDate = Utils.add(schedulingDate, Calendar.HOUR, 3);
				templateScheduling.setPredicatesForNotNullSchedulingDate(criteriaBuilder, attendanceRoot, countRoot, attendancePredicates, countPredicates, schedulingDate);
			}
	    }
	    
	    DateTypeTemplate template = DateTypeTemplate.getTemplateByDateType(dateType);
	    
	    if(startDate != null && finishDate != null) {
			template.setPredicatesForNotNullStartDateAndFinishDate(criteriaBuilder, attendanceRoot, countRoot, attendancePredicates, countPredicates, startDate, dayWithTimeAtEndOfDay);
	    }else if(startDate != null) {
	    	template.setPredicatesForNotNullStartDate(criteriaBuilder, attendanceRoot, countRoot, attendancePredicates, countPredicates, startDate);
	    	
	    }else if(finishDate != null) {
	    	template.setPredicatesForNotNullFinishDate(criteriaBuilder, attendanceRoot, countRoot, attendancePredicates, countPredicates, dayWithTimeAtEndOfDay);
	    }
	    
	    Predicate[] attendancePredArray = new Predicate[attendancePredicates.size()];
	    attendancePredicates.toArray(attendancePredArray);
	    
	    Predicate[] countPredArray = new Predicate[countPredicates.size()];
	    countPredicates.toArray(countPredArray);

	    
	    cq.where(attendancePredArray);
	    cqCount.where(countPredArray);
	    TypedQuery<Long> queryCount = em.createQuery(cqCount.select(criteriaBuilder.count(countRoot)));
	    Long totalRows = queryCount.getSingleResult();
	    
	    JpaOrderUtils.addOrderFromPagination(pagination, criteriaBuilder, cq, attendanceRoot);
	    TypedQuery<Attendance> query = em.createQuery(cq);
	    query.setFirstResult(pagination.getPageNumber() * pagination.getPageSize());
	    query.setMaxResults(pagination.getPageSize());
	    
		List<Attendance> resultList = query.getResultList();
		
		Page<Attendance> result = new PageImpl<Attendance>(resultList, pagination, totalRows);
	    return result;
	    
	    
	}

	@Override
	public Page<Attendance> findSecretaryAttendances(String filter, Long insuredId, Set<Long> providerId,
			Long specialtyId, Long professionalId, List<AttendanceStatus> status, Date startDate, Date finishDate,
			String type, AttendanceDateType dateType, Date schedulingDate, String schedulingHour, Pageable pagination) {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
