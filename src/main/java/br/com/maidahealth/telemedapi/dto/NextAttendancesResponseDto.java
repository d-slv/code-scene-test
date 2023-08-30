package br.com.maidahealth.telemedapi.dto;

public class NextAttendancesResponseDto {

    private String insuredName;
    private String professionalName;
    private String specialtyName;
    private Long healthAttendanceId;
    private String healthInsuranceNumber;
    private String schedulingDate;
    private String phoneNumber;

   
    public String getInsureName() {
        return insuredName;
    }
    public void setInsuredName(String insuredName) {
        this.insuredName = insuredName;
    }
    public String getProfessionalName() {
        return professionalName;
    }
    public void setProfessionalName(String professionalName) {
        this.professionalName = professionalName;
    }

    public String getSpecialtyName() {
        return specialtyName;
    }

    public void setSpecialtyName(String specialtyName) {
        this.specialtyName = specialtyName;
    }

    public Long getHealthAttendanceId(){
        return healthAttendanceId;
    }

    public void setHealthAttendanceId(Long healthAttendanceId){
        this.healthAttendanceId = healthAttendanceId;
    }

    public String getHealthInsuranceNumber() {
        return healthInsuranceNumber;
    }

    public void setHealthInsuranceNumber(String healthInsuranceNumber) {
        this.healthInsuranceNumber = healthInsuranceNumber;
    }

    public String getSchedulingDate() {
        return schedulingDate;
    }

    public void setSchedulingDate(String schedulingDate) {
        this.schedulingDate = schedulingDate;
    }

       public String getPhoneNumber() {
        return phoneNumber;
    }

     public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
