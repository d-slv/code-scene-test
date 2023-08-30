package br.com.maidahealth.telemedapi.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AttendanceChatListDto {

    @JsonProperty("attendance_id")    
    private String attendanceId;
    
    @JsonProperty("unread_messages_total")
    private Long unreadMessagesTotal;

    @JsonProperty("chats")
    private List<ChatDescriptionDto> chats;
    
    public AttendanceChatListDto() {
	}

	public AttendanceChatListDto(String attendanceId, long unreadMessagesTotal, List<ChatDescriptionDto> chats) {
		this.attendanceId = attendanceId;
		this.unreadMessagesTotal = unreadMessagesTotal;
		this.chats = chats;
	}

	public String getAttendanceId() {
		return attendanceId;
	}

	public void setAttendanceId(String attendanceId) {
		this.attendanceId = attendanceId;
	}

	public Long getUnreadMessagesTotal() {
		return unreadMessagesTotal;
	}

	public void setUnreadMessagesTotal(Long unreadMessagesTotal) {
		this.unreadMessagesTotal = unreadMessagesTotal;
	}

	public List<ChatDescriptionDto> getChats() {
		return chats;
	}

	public void setChats(List<ChatDescriptionDto> chats) {
		this.chats = chats;
	}

}
