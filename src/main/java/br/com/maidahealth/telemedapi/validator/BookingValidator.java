package br.com.maidahealth.telemedapi.validator;

import java.util.Date;
import java.util.TimeZone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.dto.BookingDto;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class BookingValidator {
    
    @Autowired
    private TelemedClientApiContext context;

    public Object[] check(BookingDto bookingRequest){
        Object[] validationResponse = new Object[2];
        validationResponse[0] = false;
        validationResponse[1] = "";
   
        if(bookingRequest.getType().equals(AttendanceType.URGENCY)){
            if(bookingRequest.getPatient().getName() == null || bookingRequest.getPatient().getName().isBlank()) {
                validationResponse[0] = true;
                validationResponse[1] = "Name";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getCpf() == null || bookingRequest.getPatient().getCpf().isBlank()) {
                validationResponse[0] = true;
                validationResponse[1] = "CPF";
                return validationResponse;
            }

            if(bookingRequest.getClientId() == null || bookingRequest.getClientId().isBlank()) {
                validationResponse[0] = true;
                validationResponse[1] = "ClientId";
                return validationResponse;
            }

            if(bookingRequest.getSpecialtyId() == null || (bookingRequest.getSpecialtyId().toString()).isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "SpecialtyId";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getLastPhoneNumber() == null || bookingRequest.getPatient().getLastPhoneNumber().isEmpty()){
                validationResponse[0] = true;
                validationResponse[1] = "LastPhoneNumber";
                return validationResponse;
            }   

            if(!bookingRequest.getPatient().getBirthdate().matches("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|3[01])$")){
                validationResponse[0] = true;
                validationResponse[1] = "Birthdate";
                return validationResponse;
            }  

            if(bookingRequest.getPatient().getMotherName() == null || bookingRequest.getPatient().getMotherName().isEmpty()){
                validationResponse[0] = true;
                validationResponse[1] = "MotherName";
                return validationResponse;
            }

            if(!bookingRequest.getSchedulingDate().matches("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|3[01])$")){
                validationResponse[0] = true;
                validationResponse[1] = "Schedulingdate";
                return validationResponse;
            } 

            if(bookingRequest.getHour() == null || bookingRequest.getHour().isEmpty() && bookingRequest.getHour().matches("^([01]?[0-9]|2[0-3]):[0-5][0-9]$")){
                validationResponse[0] = true;
                validationResponse[1] = "Hour";
                return validationResponse;
            }

            if(validateSchedulingDatePassed(bookingRequest.getSchedulingDate(), bookingRequest.getHour()) == true){
                validationResponse[0] = true;
                validationResponse[1] = "A data da consulta deve ser futura";
                return validationResponse;
            }
            
            if(bookingRequest.getPatient().getHealthInsuranceNumber() == null || (bookingRequest.getPatient().getHealthInsuranceNumber().toString()).isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "HealthInsuranceNumber";
                return validationResponse;
            }

            // >>> Address>>>
            if(bookingRequest.getPatient().getAddress().getIbgeCode() == null || (bookingRequest.getPatient().getAddress().getIbgeCode().toString()).isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "IbgeCode";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getAddress().getStreet() == null || bookingRequest.getPatient().getAddress().getStreet().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "Street";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getAddress().getNumber() == null || bookingRequest.getPatient().getAddress().getNumber().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "Number";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getAddress().getCity() == null || bookingRequest.getPatient().getAddress().getCity().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "City";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getAddress().getZipCode() == null || bookingRequest.getPatient().getAddress().getZipCode().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "ZipCode";
                return validationResponse;
            }
                if(bookingRequest.getPatient().getAddress().getNeighborhood() == null || bookingRequest.getPatient().getAddress().getNeighborhood().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "Neighborhood";
                return validationResponse;
            }
                if(bookingRequest.getPatient().getAddress().getPublicPlace() == null || bookingRequest.getPatient().getAddress().getPublicPlace().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "PublicPlace";
                return validationResponse;
            }
                if(bookingRequest.getPatient().getAddress().getState() == null || bookingRequest.getPatient().getAddress().getState().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "State";
                return validationResponse;
            }
                if(bookingRequest.getPatient().getAddress().getFullAddress() == null || bookingRequest.getPatient().getAddress().getFullAddress().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "FullAddress";
                return validationResponse;
            }
                if(bookingRequest.getPatient().getAddress().getComplement() == null || bookingRequest.getPatient().getAddress().getComplement().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "Complement";
                return validationResponse;
            }

        }else if(bookingRequest.getType().equals(AttendanceType.ELECTIVE)) {
            if(bookingRequest.getPatient().getName().isBlank() || bookingRequest.getPatient().getName() == null) {
                validationResponse[0] = true;
                validationResponse[1] = "Name";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getCpf() == null || bookingRequest.getPatient().getCpf().isBlank()) {
                validationResponse[0] = true;
                validationResponse[1] = "CPF";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getEmail() == null || bookingRequest.getPatient().getEmail().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "Email";
                return validationResponse;
            }

            if(bookingRequest.getClientId() == null || bookingRequest.getClientId().isBlank()) {
                validationResponse[0] = true;
                validationResponse[1] = "ClientId";
                return validationResponse;
            }

            if(bookingRequest.getSpecialtyId() == null){
                validationResponse[0] = true;
                validationResponse[1] = "SpecialtyId";
                return validationResponse;
            }

            if( bookingRequest.getProfessionalId() == null){
                validationResponse[0] = true;
                validationResponse[1] = "ProfessionalId";
                return validationResponse;
            }

            if(bookingRequest.getSchedulingDate() == null || bookingRequest.getSchedulingDate().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "SchedulingDate";
                return validationResponse;
            }

            if(!bookingRequest.getSchedulingDate().matches("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|3[01])$")){
                validationResponse[0] = true;
                validationResponse[1] = "SchedulingDate";
                return validationResponse;
            }  

            if(bookingRequest.getHour() == null || bookingRequest.getHour().isEmpty() && bookingRequest.getHour().matches("^([01]?[0-9]|2[0-3]):[0-5][0-9]$")){
                validationResponse[0] = true;
                validationResponse[1] = "Hour";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getLastPhoneNumber() == null || bookingRequest.getPatient().getLastPhoneNumber().isEmpty()){
                validationResponse[0] = true;
                validationResponse[1] = "LastPhoneNumber";
                return validationResponse;
            }

            if(bookingRequest.getHealthAttendanceId() == null){
                validationResponse[0] = true;
                validationResponse[1] = "HealthAttendacneId";
                return validationResponse;
            }

            if(!bookingRequest.getPatient().getBirthdate().matches("^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\\d|3[01])$")){
                validationResponse[0] = true;
                validationResponse[1] = "Birthdate";
                return validationResponse;
            }  

            if(bookingRequest.getPatient().getMotherName() == null || bookingRequest.getPatient().getMotherName().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "MotherName";
                return validationResponse;
            }

            if(validateSchedulingDatePassed(bookingRequest.getSchedulingDate(), bookingRequest.getHour()) == true){
                validationResponse[0] = true;
                validationResponse[1] = "A data da consulta deve ser futura";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getHealthInsuranceNumber() == null || (bookingRequest.getPatient().getHealthInsuranceNumber().toString()).isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "HealthInsuranceNumber";
                return validationResponse;
            }

            // >>> Address>>>
            if(bookingRequest.getPatient().getAddress().getIbgeCode() == null || (bookingRequest.getPatient().getAddress().getIbgeCode().toString()).isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "IbgeCode";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getAddress().getStreet() == null || bookingRequest.getPatient().getAddress().getStreet().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "Street";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getAddress().getNumber() == null || bookingRequest.getPatient().getAddress().getNumber().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "Number";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getAddress().getCity() == null || bookingRequest.getPatient().getAddress().getCity().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "City";
                return validationResponse;
            }

            if(bookingRequest.getPatient().getAddress().getZipCode() == null || bookingRequest.getPatient().getAddress().getZipCode().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "ZipCode";
                return validationResponse;
            }
                if(bookingRequest.getPatient().getAddress().getNeighborhood() == null || bookingRequest.getPatient().getAddress().getNeighborhood().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "Neighborhood";
                return validationResponse;
            }
                if(bookingRequest.getPatient().getAddress().getPublicPlace() == null || bookingRequest.getPatient().getAddress().getPublicPlace().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "PublicPlace";
                return validationResponse;
            }
                if(bookingRequest.getPatient().getAddress().getState() == null || bookingRequest.getPatient().getAddress().getState().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "State";
                return validationResponse;
            }
                if(bookingRequest.getPatient().getAddress().getFullAddress() == null || bookingRequest.getPatient().getAddress().getFullAddress().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "FullAddress";
                return validationResponse;
            }
                if(bookingRequest.getPatient().getAddress().getComplement() == null || bookingRequest.getPatient().getAddress().getComplement().isBlank()){
                validationResponse[0] = true;
                validationResponse[1] = "Complement";
                return validationResponse;
            }
        }
        return validationResponse;
    }

    public Boolean validateSchedulingDatePassed(String date, String hour) {        
        Date currentDate = Utils.getCurrentDate(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
        Date schedulingDate = Utils.formatDataWithHour(Utils.parseReverse(date), hour, TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
        if (schedulingDate.before(currentDate)) {
            return true;
        }
        return false;
	}
} 



        