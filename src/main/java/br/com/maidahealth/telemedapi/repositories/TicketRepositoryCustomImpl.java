package br.com.maidahealth.telemedapi.repositories;

import br.com.maidahealth.telemedapi.enums.TicketDateType;
import br.com.maidahealth.telemedapi.enums.TicketStatus;
import br.com.maidahealth.telemedapi.models.Ticket;
import br.com.maidahealth.telemedapi.repositories.template.ticket.DateTypeTicketTemplate;
import br.com.maidahealth.telemedapi.utils.JpaOrderUtils;
import br.com.maidahealth.telemedapi.utils.Utils;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Repository
public class TicketRepositoryCustomImpl implements TicketRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Ticket> findAll(Map<String, Object> params, Date startDate, Date finishDate, Pageable pagination) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<Long> cqCount = criteriaBuilder.createQuery(Long.class);
        CriteriaQuery<Ticket> cq = criteriaBuilder.createQuery(Ticket.class);

        Root<Ticket> countRoot = cqCount.from(Ticket.class);
        Root<Ticket> ticketRoot = cq.from(Ticket.class);

        List<Predicate> ticketsPredicates = new ArrayList<>();
        List<Predicate> countPredicates = new ArrayList<>();

        Optional.ofNullable(params.get("status"))
                .map(obj -> ((String) obj).toUpperCase())
                .ifPresent(value -> {
                    ticketsPredicates.add(criteriaBuilder.equal(ticketRoot.get("status").as(String.class), value));
                    countPredicates.add(criteriaBuilder.equal(countRoot.get("status").as(String.class), value));
                });

        Optional.ofNullable(params.get("reason"))
                .map(obj -> Long.valueOf((String) obj))
                .ifPresent(value -> {
                    ticketsPredicates.add(criteriaBuilder.equal(ticketRoot.join("reason").get("id"), value));
                    countPredicates.add(criteriaBuilder.equal(countRoot.join("reason").get("id"), value));
                });

        Optional.ofNullable(params.get("professionalId"))
                .map(obj -> Long.valueOf((String) obj))
                .ifPresent(value -> {
                    ticketsPredicates.add(criteriaBuilder.equal(ticketRoot.join("attendance").join("professional").get("id"), value));
                    countPredicates.add(criteriaBuilder.equal(countRoot.join("attendance").join("professional").get("id"), value));
                });

        Optional.ofNullable(params.get("professionalCrm"))
                .map(obj -> ((String) obj).toUpperCase())
                .map(strConcate -> "%".concat(strConcate).concat("%"))
                .ifPresent(value -> {
                    ticketsPredicates.add(criteriaBuilder.like(
                            criteriaBuilder.concat(ticketRoot.join("attendance").join("professional").get("ufCrm"),
                                    ticketRoot.join("attendance").join("professional").get("associationNumber")), value));
                    countPredicates.add(criteriaBuilder.like(
                            criteriaBuilder.concat(countRoot.join("attendance").join("professional").get("ufCrm"),
                                    countRoot.join("attendance").join("professional").get("associationNumber")), value));
                });

        Optional.ofNullable(params.get("insuredId"))
                .map(obj -> Long.valueOf((String) obj))
                .ifPresent(value -> {
                    ticketsPredicates.add(criteriaBuilder.equal(ticketRoot.join("attendance").join("insured").get("id"), value));
                    countPredicates.add(criteriaBuilder.equal(countRoot.join("attendance").join("insured").get("id"), value));
                });

        Optional.ofNullable(params.get("specialties"))
                .map(str -> ((String) str).split(","))
                .map(strIds -> Stream.of(strIds).map(String::trim).map(Long::parseLong).collect(Collectors.toList()))
                .ifPresent(longIds -> {
                    ticketsPredicates.add(ticketRoot.join("attendance").join("specialty").get("id").as(Long.class).in(longIds));
                    countPredicates.add(countRoot.join("attendance").join("specialty").get("id").as(Long.class).in(longIds));
                });

        Optional.ofNullable(params.get("insuredCpfName"))
                .map(obj -> ((String) obj).toUpperCase())
                .map(strConcate -> "%".concat(strConcate).concat("%"))
                .ifPresent(value -> {
                    ticketsPredicates.add(criteriaBuilder.like(criteriaBuilder.upper(ticketRoot.join("attendance").join("insured").get("cpfAndName")), value));
                    countPredicates.add(criteriaBuilder.like(criteriaBuilder.upper(countRoot.join("attendance").join("insured").get("cpfAndName")), value));
                });

        Optional.ofNullable(params.get("attendanceType")).map(obj -> ((String) obj).toUpperCase())
                .ifPresent(value -> {
                    ticketsPredicates.add(criteriaBuilder.equal(ticketRoot.join("attendance").get("type").as(String.class), value));
                    countPredicates.add(criteriaBuilder.equal(countRoot.join("attendance").get("type").as(String.class), value));
                });

        String defaultType = (String) Optional.ofNullable(params.get("type")).orElseGet(() -> "NOT_FINISHED");
        List<String> types = Stream.of(TicketStatus.values()).filter(status -> status.getType().equals(defaultType.toUpperCase())).map(TicketStatus::toString).collect(Collectors.toList());
        ticketsPredicates.add(ticketRoot.get("status").as(String.class).in(types));
        countPredicates.add(countRoot.get("status").as(String.class).in(types));

        Date dayWithTimeAtEndOfDay = null;
        if (finishDate != null) {
            dayWithTimeAtEndOfDay = Utils.getDayWithTimeAtEndOfDay(finishDate);
            dayWithTimeAtEndOfDay = Utils.add(dayWithTimeAtEndOfDay, Calendar.HOUR, 3);
        }
        if (startDate != null) {
            startDate = Utils.add(startDate, Calendar.HOUR, 3);
        }

        String dateType = (String) params.get("dateType");
        TicketDateType ticketDateType = EnumUtils.getEnum(TicketDateType.class, dateType);
        DateTypeTicketTemplate template = DateTypeTicketTemplate.getTemplateByDateType(ticketDateType);
        if (startDate != null && finishDate != null) {
            template.setPredicatesForNotNullStartDateAndFinishDate(criteriaBuilder, ticketRoot, countRoot, ticketsPredicates, countPredicates, startDate, dayWithTimeAtEndOfDay);
        } else if (startDate != null) {
            template.setPredicatesForNotNullStartDate(criteriaBuilder, ticketRoot, countRoot, ticketsPredicates, countPredicates, startDate);
        } else if (finishDate != null) {
            template.setPredicatesForNotNullFinishDate(criteriaBuilder, ticketRoot, countRoot, ticketsPredicates, countPredicates, dayWithTimeAtEndOfDay);
        }

        Predicate[] ticketPredArray = new Predicate[ticketsPredicates.size()];
        ticketsPredicates.toArray(ticketPredArray);
        Predicate[] countPredArray = new Predicate[countPredicates.size()];
        countPredicates.toArray(countPredArray);

        cq.where(ticketPredArray);
        cqCount.where(countPredArray);
        TypedQuery<Long> queryCount = em.createQuery(cqCount.select(criteriaBuilder.count(countRoot)));
        Long totalRows = queryCount.getSingleResult();

        JpaOrderUtils.addOrderFromPagination(pagination, criteriaBuilder, cq, ticketRoot);
        TypedQuery<Ticket> query = em.createQuery(cq);
        query.setFirstResult(pagination.getPageNumber() * pagination.getPageSize());
        query.setMaxResults(pagination.getPageSize());

        List<Ticket> resultList = query.getResultList();

        return new PageImpl<>(resultList, pagination, totalRows);
    }
}
