package br.com.maidahealth.telemedapi.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

public class JpaOrderUtils {
	
	public static void addOrderFromPagination(Pageable pagination, CriteriaBuilder criteriaBuilder,
			CriteriaQuery<?> cq, Root<?> providerRoot) {
		String order = StringUtils.collectionToCommaDelimitedString(
	    		StreamSupport.stream(pagination.getSort().spliterator(), false)
	    		.map(o -> o.getProperty() + " " + o.getDirection())
	    		.collect(Collectors.toList()));
	    if(!StringUtils.isEmpty(order)) {
	    	List<Order> orderList = getOrderList(order, criteriaBuilder, providerRoot);
	    	cq.orderBy(orderList);
	    }
	}

	public static List<Order> getOrderList(String allOrders, CriteriaBuilder criteriaBuilder, Root<?> professionalRoot) {
		List<Order> orderList = new ArrayList<Order>();
		String[] split = allOrders.split(",");
		for (String order : split) {
			String[] orderSplit = order.split("\\s");
			String propertyOrder = orderSplit[0];
			String orderPriority = orderSplit[1];
			createAndAddOrder(propertyOrder, orderPriority, criteriaBuilder, professionalRoot, orderList);
		}
		return orderList;
	}
	
	private static void createAndAddOrder(String propertyOrder, String orderPriority, CriteriaBuilder criteriaBuilder,
			Root<?> professionalRoot, List<Order> orderList) {
		if(StringUtils.isEmpty(propertyOrder)) {
			return;
		}
		if(StringUtils.isEmpty(orderPriority) || orderPriority.toUpperCase().equals("ASC")) {
			orderList.add(criteriaBuilder.asc(professionalRoot.get(propertyOrder)));
		}else {
			orderList.add(criteriaBuilder.desc(professionalRoot.get(propertyOrder)));
		}
		
	}
}
