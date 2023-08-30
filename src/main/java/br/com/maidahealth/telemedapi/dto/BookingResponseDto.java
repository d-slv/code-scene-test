package br.com.maidahealth.telemedapi.dto;

public class BookingResponseDto {
    private String attendanceRoomUrl;
    private String appointment;
    private String healthAttendanceId;
    private String publicId;
    private String specialtyId;
    private String patientId;
    private String status;

    public String getAttendanceRoomUrl() {
        return attendanceRoomUrl;
    }

    public void setAttendanceRoomUrl(String attendanceRoomUrl) {
        this.attendanceRoomUrl = attendanceRoomUrl;
    }

    public String getAppointment() {
        return appointment;
    }

    public void setAppointment(String appointment) {
        this.appointment = appointment;
    }

    public String getHealthAttendanceId() {
        return healthAttendanceId;
    }

    public void setHealthAttendanceId(String healthAttendanceId) {
        this.healthAttendanceId = healthAttendanceId;
    }

    public String getSpecialtyId() {
        return specialtyId;
    }

    public void setSpecialtyId(String specialtyId) {
        this.specialtyId = specialtyId;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }
}