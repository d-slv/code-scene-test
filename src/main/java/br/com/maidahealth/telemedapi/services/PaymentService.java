package br.com.maidahealth.telemedapi.services;

import br.com.maidahealth.telemedapi.dto.CardBinDto;
import br.com.maidahealth.telemedapi.models.Attendance;

public interface PaymentService {

    Attendance authorize(Attendance attendance, Object paymentOrderForm);

    Attendance cancel(Attendance attendance);

    Attendance capture(Attendance attendance);

    CardBinDto getCardInfo(String number);

}
