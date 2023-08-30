package br.com.maidahealth.telemedapi.models;

public class RoomResponse {
    private Long healthInsuredId;
    private Long appointment;
    private Long insuredId;
    private Long specialtyId;

    public Long getHealthInsuredId(){
        return healthInsuredId;
    }

    public void setHealthInsuredId(Long healthInsuredId){
        this.healthInsuredId = healthInsuredId;
    }

    public Long getAppointment(){
        return appointment;
    }

    public void setAppointment(Long appointment){
        this.appointment = appointment;
    }

    public Long getInsuredId(){
        return insuredId;
    }

    public void setInsuredId(Long insuredId){
        this.insuredId = insuredId;
    }

    public Long getSpecialtyId(){
        return specialtyId;
    }

    public void setSpecialtyId(Long specialtyId){
        this.specialtyId = specialtyId;
    }
}
