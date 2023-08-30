package br.com.maidahealth.telemedapi.services;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.controllers.UserController;
import br.com.maidahealth.telemedapi.dto.RoomErrorDto;
import br.com.maidahealth.telemedapi.dto.RoomResponseDto;

import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Room;

import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.InsuredRepository;

import br.com.maidahealth.telemedapi.validator.RoomValidator;

@Service
public class RoomService {

    @Autowired
    private InsuredRepository insuredRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;
    
    private Logger log = LoggerFactory.getLogger(UserController.class);

    public RoomService(InsuredRepository insuredRepository, AttendanceRepository attendanceRepository) {
        this.insuredRepository = insuredRepository;        
        this.attendanceRepository = attendanceRepository;
    }

    public ResponseEntity<Object> validation(Room roomRequest){
        log.info("========================================");
        log.info(">>> RoomService.validation <<<");
        
        if(RoomValidator.checkNull(roomRequest)){
            log.info(">>> Existem campos nulos ou vazios,  verifique:");
            log.info("ClientId: " + roomRequest.getClientId());
            log.info("HealthAttendanceId: " + roomRequest.getHealthAttendanceId());
            log.info("========================================");
            RoomErrorDto response = new RoomErrorDto("Existem campos não preenchidos.", "Entre em contado pelos canais de atendimento.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        
        log.info(">>> Ok <<<");
        log.info("========================================");
        return getAttendanceData(roomRequest);
    }

    public ResponseEntity<Object> getAttendanceData(Room roomRequest){
        log.info("========================================");
        log.info(">>> RoomService.getAttendanceData <<<");

        Optional<Attendance> attendance = attendanceRepository.findByHealthInsuranceIdentificatorAndHealthAttendanceId(roomRequest.getClientId(), roomRequest.getHealthAttendanceId()); 

        try{
            if(!attendance.isPresent()){
                log.info(">>> Consulta não encontrada nesta operadora.");
                log.info("Operadora " + attendance.get().getHealthInsuranceIdentificator());
                log.info("Attendance Id " + attendance.get().getId());
                log.info("========================================"); 
                RoomErrorDto response = new RoomErrorDto("Operadora não encontrada.", "Entre em contado pelos canais de atendimento.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }catch(Exception e){
            log.info(">>> " + e.getMessage());
            log.info("========================================"); 
            RoomErrorDto response = new RoomErrorDto("Erro ao tentar recuperar a consulta", "Entre em contado pelos canais de atendimento.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        log.info(">>> Ok <<<");
        log.info("========================================");
        return getInsuredData(roomRequest, attendance.get());
    }

    public ResponseEntity<Object> getInsuredData(Room roomRequest, Attendance attendance){
        log.info("========================================");
        log.info(">>> RoomService.getInsuredData <<<");

        Optional<Insured> insured = insuredRepository.findById(attendance.getInsured().getId()); 

        try{
            if(!insured.isPresent()){
                log.info(">>> Beneficiário não encontrado.");
                log.info("Beneficiário " + insured.get().getCpf());
                log.info("========================================"); 
                RoomErrorDto response = new RoomErrorDto("Beneficiário não encontrado.", "Entre em contado pelos canais de atendimento.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }catch(Exception e){
            log.info(">>> " + e.getMessage());
            log.info("========================================"); 
            RoomErrorDto response = new RoomErrorDto("Erro ao tentar recuperar beneficiário", "Entre em contado pelos canais de atendimento.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        log.info(">>> Ok <<<");
        log.info("========================================");
        return responseData(roomRequest, attendance, insured.get().getHealthInsuranceNumber());
    }

    public ResponseEntity<Object> responseData(Room roomRequest, Attendance attendance, String healthInsuredId){
        log.info("========================================");
        log.info(">>> RoomService.responseData <<<");

        RoomResponseDto roomResponse = new RoomResponseDto();
        roomResponse.setHealthInsuredId(healthInsuredId);
        roomResponse.setAppointment(attendance.getId());
        roomResponse.setInsuredId(attendance.getInsured().getId());
        roomResponse.setSpecialtyId(attendance.getSpecialty().getId());

        log.info(">>> Ok <<<");
        log.info("========================================");
        return ResponseEntity.status(HttpStatus.OK).body(roomResponse);
    }
}
