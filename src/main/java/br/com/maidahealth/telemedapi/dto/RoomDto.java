package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.Attendance;

public class RoomDto {
	
	private String roomToken;
	
	private String roomName;
	
	private AttendanceDto attendance;
	
	public RoomDto(String roomToken, String roomName, Attendance att) {
		super();
		this.roomToken = roomToken;
		this.roomName = roomName;
		this.attendance = AttendanceDto.convert(att, false, null, null, null, null);
	}

	public String getRoomToken() {
		return roomToken;
	}

	public void setRoomToken(String roomToken) {
		this.roomToken = roomToken;
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public AttendanceDto getAttendance() {
		return attendance;
	}

	public void setAttendance(AttendanceDto attendance) {
		this.attendance = attendance;
	}
	
}
