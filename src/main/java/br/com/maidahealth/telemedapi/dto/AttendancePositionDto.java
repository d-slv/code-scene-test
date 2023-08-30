package br.com.maidahealth.telemedapi.dto;

public class AttendancePositionDto {

	private Long id;
    private Long position;

    public AttendancePositionDto() {
    }

    public AttendancePositionDto(Long id, Long position) {
        this.id = id;
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPosition() {
        return position;
    }

    public void setPosition(Long position) {
        this.position = position;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AttendancePositionDto that = (AttendancePositionDto) o;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}
