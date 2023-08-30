package br.com.maidahealth.telemedapi.dto;

public class RoomResponseDto {
    private String healthInsuredId;
    private long appointment;
    private long insuredId;
    private long specialtyId;

    public String getHealthInsuredId(){
        return healthInsuredId;
    }

    public void setHealthInsuredId(String healthInsuredId){
        this.healthInsuredId = healthInsuredId;
    }

    public long getAppointment(){
        return appointment;
    }

    public void setAppointment(long appointment){
        this.appointment = appointment;
    }

    public long getInsuredId(){
        return insuredId;
    }

    public void setInsuredId(long insuredId){
        this.insuredId = insuredId;
    }

    public long getSpecialtyId(){
        return specialtyId;
    }

    public void setSpecialtyId(long specialtyId){
        this.specialtyId = specialtyId;
    }
}
