package br.com.maidahealth.telemedapi.dto;

import java.util.List;

public class QueuePositionMessageDto {

	private Long specialtyId;
    private List<AttendancePositionDto> attendances;

    public QueuePositionMessageDto() {
    }

    public QueuePositionMessageDto(Long specialtyId, List<AttendancePositionDto> attendances) {
        this.specialtyId = specialtyId;
        this.attendances = attendances;
    }

    public Long getSpecialtyId() {
        return specialtyId;
    }

    public void setSpecialtyId(Long specialtyId) {
        this.specialtyId = specialtyId;
    }

    public List<AttendancePositionDto> getAttendances() {
        return attendances;
    }

    public void setAttendances(List<AttendancePositionDto> attendances) {
        this.attendances = attendances;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        QueuePositionMessageDto that = (QueuePositionMessageDto) o;

        return specialtyId.equals(that.specialtyId);
    }

    @Override
    public int hashCode() {
        return specialtyId.hashCode();
    }

}
