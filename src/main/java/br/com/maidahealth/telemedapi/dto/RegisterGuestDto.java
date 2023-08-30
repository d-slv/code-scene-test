package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.Guest;

public class RegisterGuestDto {
    
    private String guestName;

    private String guestCpf;

    private String guestPublicId;

    private RoomDto roomData;

    private TokenDto tokenData;

    public RegisterGuestDto(Guest guest, RoomDto roomDto, TokenDto tokenDto) {
        this.guestName = guest.getName();
        this.guestCpf = guest.getCpf();
        this.guestPublicId = guest.getPublicId();
        this.roomData = roomDto;
        this.tokenData = tokenDto;
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getGuestCpf() {
        return guestCpf;
    }

    public void setGuestCpf(String guestCpf) {
        this.guestCpf = guestCpf;
    }

    public String getGuestPublicId() {
        return guestPublicId;
    }

    public void setGuestPublicId(String guestPublicId) {
        this.guestPublicId = guestPublicId;
    }

    public RoomDto getRoomData() {
        return roomData;
    }

    public void setRoomData(RoomDto roomData) {
        this.roomData = roomData;
    }

    public TokenDto getTokenData() {
        return tokenData;
    }

    public void setTokenData(TokenDto tokenData) {
        this.tokenData = tokenData;
    }
}
