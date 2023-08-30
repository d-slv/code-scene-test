package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.Attendance;

public class QueuePositionDto {

	private Integer position;

	private String averageWaitingTime;

	private AttendanceDto attendance;

	public QueuePositionDto(Integer position, AttendanceDto attendanceDto, String remainingWaitingTime) {
		super();
		this.position = position;
		this.attendance = attendanceDto;
		this.averageWaitingTime = remainingWaitingTime;
	}

	public synchronized Integer getPosition() {
		return position;
	}

	public synchronized void setPosition(Integer position) {
		this.position = position;
	}

	public synchronized AttendanceDto getAttendance() {
		return attendance;
	}

	public synchronized void setAttendance(AttendanceDto attendance) {
		this.attendance = attendance;
	}

	public static QueuePositionDto convert(Integer position, Attendance attendance, String remainingWaitingTime) {
		return new QueuePositionDto(position, AttendanceDto.convert(attendance, false, null, null, null, null),
				remainingWaitingTime);
	}

	public String getAverageWaitingTime() {
		return averageWaitingTime;
	}

	public void setAverageWaitingTime(String averageWaitingTime) {
		this.averageWaitingTime = averageWaitingTime;
	}

}
