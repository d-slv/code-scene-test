package br.com.maidahealth.telemedapi.repositories.template.ticket;

import br.com.maidahealth.telemedapi.enums.TicketDateType;
import br.com.maidahealth.telemedapi.models.Ticket;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Date;
import java.util.List;

public abstract class DateTypeTicketTemplate {
	
	public static DateTypeTicketTemplate getTemplateByDateType(TicketDateType dateType) {
		if(dateType == null) {
			return new DefaultDateTypeTemplate();
		}
		return dateType.getTemplate();
	}
	
	public void setPredicatesForNotNullStartDateAndFinishDate(CriteriaBuilder criteriaBuilder, Root<Ticket> ticketRoot, Root<Ticket> countRoot,
															  List<Predicate> ticketPredicates, List<Predicate> countPredicates, Date startDate, Date dayWithTimeAtEndOfDay) {
		Predicate andTicket = criteriaBuilder.between(ticketRoot.<Ticket>get(getDateProperty()).as(Date.class), startDate, dayWithTimeAtEndOfDay);
		Predicate andCount = criteriaBuilder.between(countRoot.<Ticket>get(getDateProperty()).as(Date.class), startDate, dayWithTimeAtEndOfDay);
		ticketPredicates.add(andTicket);
    	countPredicates.add(andCount);
	}
	
	public void setPredicatesForNotNullStartDate(CriteriaBuilder criteriaBuilder, Root<Ticket> ticketRoot, Root<Ticket> countRoot,
												 List<Predicate> ticketPredicates, List<Predicate> countPredicates, Date startDate) {
		Predicate andTicket = criteriaBuilder.greaterThanOrEqualTo(ticketRoot.<Ticket>get(getDateProperty()).as(Date.class), startDate);
    	Predicate andCount = criteriaBuilder.greaterThanOrEqualTo(countRoot.<Ticket>get(getDateProperty()).as(Date.class), startDate);
		ticketPredicates.add(andTicket);
		countPredicates.add(andCount);
	}
	
	public void setPredicatesForNotNullFinishDate(CriteriaBuilder criteriaBuilder, Root<Ticket> ticketRoot, Root<Ticket> countRoot,
												  List<Predicate> ticketPredicates, List<Predicate> countPredicates, Date dayWithTimeAtEndOfDay) {
		Predicate andTicket = criteriaBuilder.lessThanOrEqualTo(ticketRoot.<Ticket>get(getDateProperty()).as(Date.class), dayWithTimeAtEndOfDay);
    	Predicate andCount = criteriaBuilder.lessThanOrEqualTo(countRoot.<Ticket>get(getDateProperty()).as(Date.class), dayWithTimeAtEndOfDay);
		ticketPredicates.add(andTicket);
		countPredicates.add(andCount);
	}

	public abstract String getDateProperty();
}
