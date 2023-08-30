package br.com.maidahealth.telemedapi.repositories.template;

import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import br.com.maidahealth.telemedapi.enums.AttendanceDateType;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceType;

public abstract class DateTypeTemplate {
	
	public static DateTypeTemplate getTemplateByDateType(AttendanceDateType dateType) {
		if(dateType == null) {
			return new DefaultDateTypeTemplate();
		}
		return dateType.getTemplate();
	}
	
	public void setPredicatesForNotNullStartDateAndFinishDate(CriteriaBuilder criteriaBuilder, Root<Attendance> attendanceRoot, Root<Attendance> countRoot, List<Predicate> attendancePredicates, List<Predicate> countPredicates, Date startDate, Date dayWithTimeAtEndOfDay) {
		Predicate andElectiveAttendance = criteriaBuilder.and(
				criteriaBuilder.between(attendanceRoot.<Attendance>get(getElectiveDate()).as(Date.class), startDate, dayWithTimeAtEndOfDay), 
				criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), AttendanceType.ELECTIVE.name())
				);
		Predicate andUrgencyAttendance = criteriaBuilder.and(
				criteriaBuilder.between(attendanceRoot.<Attendance>get(getUrgencyDate()).as(Date.class), startDate, dayWithTimeAtEndOfDay), 
				criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), AttendanceType.URGENCY.name())
				);
		
		Predicate andElectiveCount = criteriaBuilder.and(
				criteriaBuilder.between(countRoot.<Attendance>get(getElectiveDate()).as(Date.class), startDate, dayWithTimeAtEndOfDay), 
				criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), AttendanceType.ELECTIVE.name())
				);
		Predicate andUrgencyCount = criteriaBuilder.and(
				criteriaBuilder.between(countRoot.<Attendance>get(getUrgencyDate()).as(Date.class), startDate, dayWithTimeAtEndOfDay), 
				criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), AttendanceType.URGENCY.name())
				);
		attendancePredicates.add(
				criteriaBuilder.or(
						andElectiveAttendance,
						andUrgencyAttendance
				)
			);
    	countPredicates.add(
    			criteriaBuilder.or(
    					andElectiveCount,
						andUrgencyCount
				)
			);
	}

	
	public void setPredicatesForNotNullStartDate(CriteriaBuilder criteriaBuilder, Root<Attendance> attendanceRoot, Root<Attendance> countRoot, List<Predicate> attendancePredicates, List<Predicate> countPredicates, Date startDate) {
		Predicate andElectiveAttendance = criteriaBuilder.and(
				criteriaBuilder.greaterThanOrEqualTo(attendanceRoot.<Attendance>get(getElectiveDate()).as(Date.class), startDate), 
				criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), AttendanceType.ELECTIVE.name())
				);
		Predicate andUrgencyAttendance = criteriaBuilder.and(
				criteriaBuilder.greaterThanOrEqualTo(attendanceRoot.<Attendance>get(getUrgencyDate()).as(Date.class), startDate), 
				criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), AttendanceType.URGENCY.name())
				);
    	
    	attendancePredicates.add(
	    			criteriaBuilder.or(
							andElectiveAttendance,
							andUrgencyAttendance
					)
    			);
    	Predicate andElectiveCount = criteriaBuilder.and(
				criteriaBuilder.greaterThanOrEqualTo(countRoot.<Attendance>get(getElectiveDate()).as(Date.class), startDate), 
				criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), AttendanceType.ELECTIVE.name())
				);
		Predicate andUrgencyCount = criteriaBuilder.and(
				criteriaBuilder.greaterThanOrEqualTo(countRoot.<Attendance>get(getUrgencyDate()).as(Date.class), startDate), 
				criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), AttendanceType.URGENCY.name())
				);
		
    	countPredicates.add(
    			criteriaBuilder.or(
    					andElectiveCount,
						andUrgencyCount
				)
			);
	}
	
	public void setPredicatesForNotNullFinishDate(CriteriaBuilder criteriaBuilder, Root<Attendance> attendanceRoot, Root<Attendance> countRoot, List<Predicate> attendancePredicates, List<Predicate> countPredicates, Date dayWithTimeAtEndOfDay) {
		Predicate andElectiveAttendance = criteriaBuilder.and(
				criteriaBuilder.lessThanOrEqualTo(attendanceRoot.<Attendance>get(getElectiveDate()).as(Date.class), dayWithTimeAtEndOfDay), 
				criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), AttendanceType.ELECTIVE.name())
				);
		Predicate andUrgencyAttendance = criteriaBuilder.and(
				criteriaBuilder.lessThanOrEqualTo(attendanceRoot.<Attendance>get(getUrgencyDate()).as(Date.class), dayWithTimeAtEndOfDay), 
				criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), AttendanceType.URGENCY.name())
				);
    	
    	attendancePredicates.add(
	    			criteriaBuilder.or(
							andElectiveAttendance,
							andUrgencyAttendance
					)
    			);
    	Predicate andElectiveCount = criteriaBuilder.and(
				criteriaBuilder.lessThanOrEqualTo(countRoot.<Attendance>get(getElectiveDate()).as(Date.class), dayWithTimeAtEndOfDay), 
				criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), AttendanceType.ELECTIVE.name())
				);
		Predicate andUrgencyCount = criteriaBuilder.and(
				criteriaBuilder.lessThanOrEqualTo(countRoot.<Attendance>get(getUrgencyDate()).as(Date.class), dayWithTimeAtEndOfDay), 
				criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), AttendanceType.URGENCY.name())
				);
		
    	countPredicates.add(
    			criteriaBuilder.or(
    					andElectiveCount,
						andUrgencyCount
				)
			);
	}
	
	public void setPredicatesForNotNullSchedulingDate(CriteriaBuilder criteriaBuilder, Root<Attendance> attendanceRoot, Root<Attendance> countRoot, List<Predicate> attendancePredicates, List<Predicate> countPredicates, Date schedulingdate) {
		Predicate andElectiveAttendance = criteriaBuilder.and(
				criteriaBuilder.greaterThanOrEqualTo(attendanceRoot.<Attendance>get(getElectiveDate()).as(Date.class), schedulingdate), 
				criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), AttendanceType.ELECTIVE.name())
				);
		Predicate andUrgencyAttendance = criteriaBuilder.and(
				criteriaBuilder.greaterThanOrEqualTo(attendanceRoot.<Attendance>get(getUrgencyDate()).as(Date.class), schedulingdate), 
				criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), AttendanceType.URGENCY.name())
				);
    	
    	attendancePredicates.add(
	    			criteriaBuilder.or(
							andElectiveAttendance,
							andUrgencyAttendance
					)
    			);
    	Predicate andElectiveCount = criteriaBuilder.and(
				criteriaBuilder.greaterThanOrEqualTo(countRoot.<Attendance>get(getElectiveDate()).as(Date.class), schedulingdate), 
				criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), AttendanceType.ELECTIVE.name())
				);
		Predicate andUrgencyCount = criteriaBuilder.and(
				criteriaBuilder.greaterThanOrEqualTo(countRoot.<Attendance>get(getUrgencyDate()).as(Date.class), schedulingdate), 
				criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), AttendanceType.URGENCY.name())
				);
		
    	countPredicates.add(
    			criteriaBuilder.or(
    					andElectiveCount,
						andUrgencyCount
				)
			);
	}

	public void setPredicatesForNotNullSchedulingHour(CriteriaBuilder criteriaBuilder, Root<Attendance> attendanceRoot, Root<Attendance> countRoot, List<Predicate> attendancePredicates, List<Predicate> countPredicates, Date schedulingdate) {
		Predicate andElectiveAttendance = criteriaBuilder.and(
				criteriaBuilder.equal(attendanceRoot.<Attendance>get(getElectiveDate()).as(Date.class), schedulingdate), 
				criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), AttendanceType.ELECTIVE.name())
				);
		Predicate andUrgencyAttendance = criteriaBuilder.and(
				criteriaBuilder.equal(attendanceRoot.<Attendance>get(getUrgencyDate()).as(Date.class), schedulingdate), 
				criteriaBuilder.equal(attendanceRoot.<Attendance>get("type").as(String.class), AttendanceType.URGENCY.name())
				);
    	
    	attendancePredicates.add(
	    			criteriaBuilder.or(
							andElectiveAttendance,
							andUrgencyAttendance
					)
    			);
    	Predicate andElectiveCount = criteriaBuilder.and(
				criteriaBuilder.equal(countRoot.<Attendance>get(getElectiveDate()).as(Date.class), schedulingdate), 
				criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), AttendanceType.ELECTIVE.name())
				);
		Predicate andUrgencyCount = criteriaBuilder.and(
				criteriaBuilder.equal(countRoot.<Attendance>get(getUrgencyDate()).as(Date.class), schedulingdate), 
				criteriaBuilder.equal(countRoot.<Attendance>get("type").as(String.class), AttendanceType.URGENCY.name())
				);
		
    	countPredicates.add(
    			criteriaBuilder.or(
    					andElectiveCount,
						andUrgencyCount
				)
			);
	}

	
	public abstract String getElectiveDate();
	
	public abstract String getUrgencyDate();

}
