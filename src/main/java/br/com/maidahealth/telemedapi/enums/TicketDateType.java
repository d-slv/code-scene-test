package br.com.maidahealth.telemedapi.enums;

import br.com.maidahealth.telemedapi.repositories.template.ticket.CloseDateTypeTemplate;
import br.com.maidahealth.telemedapi.repositories.template.ticket.CreationDateTypeTemplate;
import br.com.maidahealth.telemedapi.repositories.template.ticket.DateTypeTicketTemplate;
import br.com.maidahealth.telemedapi.repositories.template.ticket.ExpirationDateTypeTemplate;
import org.apache.commons.lang3.StringUtils;

public enum TicketDateType {

	CREATION("createdAt", "Data da criação", new CreationDateTypeTemplate()),
	EXPIRATION("expirationDate", "Data de expiração", new ExpirationDateTypeTemplate()),
	CLOSE("closedDate", "Data de fechamento", new CloseDateTypeTemplate());

	private String property;

	private String description;

	private DateTypeTicketTemplate template;

	private TicketDateType(String property, String description, DateTypeTicketTemplate template) {
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

	public static TicketDateType getDateTypeByName(String dateTypeString) {
		if(StringUtils.isEmpty(dateTypeString)) {
			return null;
		}
		TicketDateType[] values = TicketDateType.values();
		for (TicketDateType dateType : values) {
			if(dateTypeString.equalsIgnoreCase(dateType.name())) {
				return dateType;
			}
		}
		return null;
	}

	public DateTypeTicketTemplate getTemplate() {
		return template;
	}

	public void setTemplate(DateTypeTicketTemplate template) {
		this.template = template;
	}
	
	
}
