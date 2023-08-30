package br.com.maidahealth.telemedapi.repositories.template.ticket;

import br.com.maidahealth.telemedapi.enums.TicketDateType;

public class ExpirationDateTypeTemplate extends DateTypeTicketTemplate {

    @Override
    public String getDateProperty() {
        return TicketDateType.EXPIRATION.getProperty();
    }

}
