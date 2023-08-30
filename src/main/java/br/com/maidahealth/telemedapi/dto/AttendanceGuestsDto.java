package br.com.maidahealth.telemedapi.dto;

import java.util.Set;

public class AttendanceGuestsDto {
	
	private String publicId;
	
	private Set<GuestDto> guests;
	
	public AttendanceGuestsDto() {
	}
	
	public AttendanceGuestsDto(String publicId, Set<GuestDto> guests) {
		this.publicId = publicId;
		this.guests = guests;
	}

	public String getPublicId() {
		return publicId;
	}

	public void setPublicId(String publicId) {
		this.publicId = publicId;
	}

	public Set<GuestDto> getGuests() {
		return guests;
	}

	public void setGuests(Set<GuestDto> guests) {
		this.guests = guests;
	}
	
}