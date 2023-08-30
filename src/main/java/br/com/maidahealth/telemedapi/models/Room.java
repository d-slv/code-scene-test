package br.com.maidahealth.telemedapi.models;

public class Room {

    private String clientId;
    private Long healthAttendanceId;

    public String getClientId(){
        return clientId;
    }
    
    public void setClientId(String clientId){
        this.clientId = clientId;
    }

    public Long getHealthAttendanceId(){
        return healthAttendanceId;
    }
    
    public void setHealthAttendanceId(Long healthAttendanceId){
        this.healthAttendanceId = healthAttendanceId;
    }

}
