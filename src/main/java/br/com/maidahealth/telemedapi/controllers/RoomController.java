package br.com.maidahealth.telemedapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import br.com.maidahealth.telemedapi.services.RoomService;
import br.com.maidahealth.telemedapi.services.TelemedServerService;
import br.com.maidahealth.telemedapi.models.Room;

@RestController
@RequestMapping("room")
@EnableAsync
public class RoomController {

    @Autowired
	private TelemedServerService telemedServerService;

    @Autowired
    private RoomService roomService;

    @GetMapping
    public ResponseEntity<Object> createBooking(@RequestParam(name="clientId") String clientId, @RequestParam(name="healthAttendanceId") Long healthAttendenceId, @RequestHeader("Authorization") String accessKey) {
        telemedServerService.validateServerApiAccessToken(accessKey);
        Room roomRequest = new Room();
        roomRequest.setClientId(clientId);
        roomRequest.setHealthAttendanceId(healthAttendenceId);
        return roomService.validation(roomRequest);
    } 
}
