package br.com.maidahealth.telemedapi.validator;

import br.com.maidahealth.telemedapi.models.Room;

public class RoomValidator {

    public static boolean checkNull(Room roomRequest){ 
        if (roomRequest.getClientId() == null || roomRequest.getClientId().toString().isBlank() || roomRequest.getHealthAttendanceId() == null || roomRequest.getHealthAttendanceId().toString().isBlank()){
                return true;
        }
        return false;   
    }
}
