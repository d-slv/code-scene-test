package br.com.maidahealth.telemedapi.enums;

import org.apache.commons.lang3.StringUtils;

import br.com.maidahealth.telemedapi.repositories.template.CancelationDateTypeTemplate;
import br.com.maidahealth.telemedapi.repositories.template.ConclusionDateTypeTemplate;
import br.com.maidahealth.telemedapi.repositories.template.CreationDateTypeTemplate;
import br.com.maidahealth.telemedapi.repositories.template.DateTypeTemplate;
import br.com.maidahealth.telemedapi.repositories.template.SchedulingDateTypeTemplate;

public enum AttendanceDateType {

	CREATION("createdAt", "Data da criação", new CreationDateTypeTemplate()), 
	CANCELATION("cancellingDate", "Data de cancelamento", new CancelationDateTypeTemplate()), 
	SCHEDULING("schedulingDate", "Data de agendamento", new SchedulingDateTypeTemplate()), 
//	CHARGEBACK("paymentDetails.status", "Data de estorno"), 
	CONCLUSION("finishDate", "Data do atendimento", new ConclusionDateTypeTemplate()); 
	
	private String property;
	
	private String description;
	
	private DateTypeTemplate template;

	private AttendanceDateType(String property, String description, DateTypeTemplate template) {
		this.property = property;
		this.description = description;
		this.template = template;
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static AttendanceDateType getDateTypeByName(String dateTypeString) {
		if(StringUtils.isEmpty(dateTypeString)) {
			return null;
		}
		AttendanceDateType[] values = AttendanceDateType.values();
		for (AttendanceDateType dateType : values) {
			if(dateTypeString.equalsIgnoreCase(dateType.name())) {
				return dateType;
			}
		}
		return null;
	}

	public DateTypeTemplate getTemplate() {
		return template;
	}

	public void setTemplate(DateTypeTemplate template) {
		this.template = template;
	}
	
	
}
