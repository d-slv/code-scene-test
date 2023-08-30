package br.com.maidahealth.telemedapi.controllers;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;

import br.com.maidahealth.telemedapi.dto.AttendanceCreatedByClientDto;
import br.com.maidahealth.telemedapi.dto.AttendanceDto;
import br.com.maidahealth.telemedapi.dto.AtttendanceStatusDto;
import br.com.maidahealth.telemedapi.dto.ClientInsuredDto;
import br.com.maidahealth.telemedapi.dto.CurrentAttendanceDto;
import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.dto.NoticeDto;
import br.com.maidahealth.telemedapi.dto.ProfessionalDto;
import br.com.maidahealth.telemedapi.dto.RoomDto;
import br.com.maidahealth.telemedapi.dto.SpecialtyDto;
import br.com.maidahealth.telemedapi.form.AttendanceInsuredStatusForm;
import br.com.maidahealth.telemedapi.form.ClientAttendanceCancelingForm;
import br.com.maidahealth.telemedapi.form.ClientAttendanceForm;
import br.com.maidahealth.telemedapi.form.ClientInsuredForm;
import br.com.maidahealth.telemedapi.form.InsuredPermissionForm;
import br.com.maidahealth.telemedapi.form.UpdateUrlReturnAttendanceForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.repositories.ProfessionalRepository;
import br.com.maidahealth.telemedapi.services.AirmedService;
import br.com.maidahealth.telemedapi.services.AttendanceService;
import br.com.maidahealth.telemedapi.services.InsuredService;
import br.com.maidahealth.telemedapi.services.NoticeService;
import br.com.maidahealth.telemedapi.services.ProfessionalService;
import br.com.maidahealth.telemedapi.services.SpecialtyService;
import br.com.maidahealth.telemedapi.services.TelemedServerService;
import br.com.maidahealth.telemedapi.utils.TelemedServerResponseUtil;

@RestController
@RequestMapping("client")
public class ClientController {

	@Autowired
	private TelemedServerService telemedServerService;

	@Autowired
	private InsuredService insuredService;

	@Autowired
	private SpecialtyService specialtyService;

	@Autowired
	private ProfessionalService professionalService;

	@Autowired
	private ProfessionalRepository professionalrepository;

	@Autowired
	private AttendanceService attendanceService;

	@Autowired
	private NoticeService noticeService;

	@Autowired
	private AirmedService airmedService;

	@PostMapping("insured")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Object> create(@RequestBody ClientInsuredForm form,
			@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		Object resp = insuredService.saveHolder(form);

		if (resp instanceof ClientInsuredDto)
			return ResponseEntity.ok(resp);

		TelemedServerResponseUtil respUtil = (TelemedServerResponseUtil) resp;

		Object list = new Gson().fromJson(respUtil.getBody(), Object.class);

		return new ResponseEntity<Object>(list, respUtil.getStatus());
	}

	@PostMapping("insured/{holderId}/dependents")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Object> create(@RequestBody @Valid ClientInsuredForm form,
			@PathVariable("holderId") Long holderId, @RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		Object resp = insuredService.saveDependent(form, holderId);

		if (resp instanceof ClientInsuredDto)
			return ResponseEntity.ok(resp);

		TelemedServerResponseUtil respUtil = (TelemedServerResponseUtil) resp;

		Object list = new Gson().fromJson(respUtil.getBody(), Object.class);

		return new ResponseEntity<Object>(list, respUtil.getStatus());
	}

	@PutMapping("insured")
	public ResponseEntity<Object> update(@RequestBody ClientInsuredForm form,
			@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		Object resp = insuredService.update(form);

		if (resp instanceof ClientInsuredDto)
			return ResponseEntity.ok(resp);

		TelemedServerResponseUtil respUtil = (TelemedServerResponseUtil) resp;

		Object list = new Gson().fromJson(respUtil.getBody(), Object.class);

		return new ResponseEntity<Object>(list, respUtil.getStatus());
	}

	@PostMapping("attendance")
	public ResponseEntity<Object> create(@RequestBody @Valid ClientAttendanceForm form,
			@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		Attendance att = attendanceService.create(form);

		AttendanceCreatedByClientDto dto = att == null ? insuredService.generateDtoWhenAttendanceNull(form)
				: insuredService.generateAttendanceCreatedByClientDto(att);

		return ResponseEntity.ok(dto);
	}

	@PutMapping("attendance/{id}/patient-online")
	public ResponseEntity<MessageDto> patientOnline(@PathVariable("id") Long attId,
			@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		telemedServerService.setPatientOnline(attId);

		return ResponseEntity.ok(new MessageDto("Notificação enviada"));
	}

	@PutMapping("/attendance/{id}/change-patient-status")
	public ResponseEntity<?> changePatientStatus(@PathVariable("id") Long attId,
			@RequestBody @Valid AttendanceInsuredStatusForm form, @RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
		TelemedServerResponseUtil resp = telemedServerService.changePatientStatus(attId, form);
		Object list = new Gson().fromJson(resp.getBody(), Object.class);
		if (resp.getStatus().is2xxSuccessful()) {
			return ResponseEntity.ok(new MessageDto("Notificação enviada"));
		}

		return new ResponseEntity<Object>(list, resp.getStatus());
	}

	@PostMapping("attendance/{id}/cancel")
	public ResponseEntity<Object> cancelAttendance(@PathVariable("id") String attId,
			@RequestBody @Valid ClientAttendanceCancelingForm form, @RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		ResponseEntity<Object> responseEntity = attendanceService.cancelClientAttendance(attId, form);

		return responseEntity;
	}



	@Deprecated
	@GetMapping("attendance/{id}")
	public AttendanceDto getAttendance(@PathVariable Long id, @RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		return attendanceService.getClientAttendanceById(id);
	}

	@GetMapping("/routines/attendance/{id}")
	public AttendanceDto getAttendanceForRoutines(@PathVariable Long id,
			@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
			
		return attendanceService.getAttendanceForRoutines(id);

	}

	@GetMapping("/attendance")
	public Page<AttendanceDto> listAttendance(@RequestParam(name = "filter", required = false) String filter,
			@RequestParam(name = "insured", required = false) Long insuredId,
			@RequestParam(name = "specialty", required = false) Long specialtyId,
			@RequestParam(name = "professional", required = false) Long professionalId,
			@RequestParam(name = "status", required = false) String status,
			@RequestParam(name = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
			@RequestParam(name = "finishDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date finishDate,
			@RequestParam(name = "type", required = false) String type,
			@RequestParam(name = "schedulingDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date schedulingDate,
			@RequestParam(name = "schedulingHour", required = false) String schedulingHour,
			@RequestParam(name = "viewFull", required = false, defaultValue = "false") boolean viewFull,
			@PageableDefault(page = 0, size = 10) Pageable pagination, @RequestHeader("Authorization") String accessKey)
			throws Exception {
		telemedServerService.validateServerApiAccessToken(accessKey);
		return attendanceService.getClientAttendances(filter, insuredId, specialtyId, professionalId, status, startDate,
				finishDate, type, schedulingDate, schedulingHour, pagination, viewFull);
	}

	@GetMapping("/attendance/status")
	public List<AtttendanceStatusDto> listStatus(@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
		return AtttendanceStatusDto.convert(AttendanceStatus.values());
	}

	@GetMapping("/specialty")
	public List<SpecialtyDto> listSpecialties(@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
		List<Specialty> specialties = specialtyService.findAll();
		return SpecialtyDto.convert(specialties);
	}

	@GetMapping("/professionals")
	public Page<ProfessionalDto> list(@RequestParam Map<String, String> filter,
			@PageableDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pagination,
			@RequestHeader("Authorization") String accessKey) {

		telemedServerService.validateServerApiAccessToken(accessKey);

		Page<Professional> professionals = professionalrepository.find(filter, pagination);

		return ProfessionalDto.convert(professionals);
	}

	@GetMapping("/attendance/{id}/medical-record")
	public ResponseEntity<?> getMedicalRecord(@PathVariable Long id, @RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		JsonNode response = attendanceService.findMedicalRecord(id);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/attendance/{id}/{document}/old")
	public ResponseEntity<?> getPrescriptionSicknote(@PathVariable Long id, @PathVariable String document,
			@RequestHeader("Authorization") String accessKey) throws Exception {
		telemedServerService.validateServerApiAccessToken(accessKey);

		JsonNode response = attendanceService.findPrescriptionSicknoteExam(id, document);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/attendance/{id}/{document}")
	public ResponseEntity<?> getPrescriptionSicknoteAsync(@PathVariable Long id, @PathVariable String document,
			@RequestHeader("Authorization") String accessKey) throws Exception {
		telemedServerService.validateServerApiAccessToken(accessKey);

		JsonNode response = attendanceService.findPrescriptionSicknoteExamAsync(id, document);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/attendance/{id}/room")
	public RoomDto start(@PathVariable Long id, @RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
		return attendanceService.getClientRoomAttendance(id);
	}

	@PostMapping(value = "/chatbot", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> chatbot(@RequestHeader("Authorization") String accessKey,
			@RequestBody Object jsonValues) {
		Object resp = telemedServerService.sendChatbotToServerApi(accessKey, jsonValues);

		TelemedServerResponseUtil respUtil = (TelemedServerResponseUtil) resp;
		Object list = new Gson().fromJson(respUtil.getBody(), Object.class);
		return new ResponseEntity<Object>(list, respUtil.getStatus());
	}

	@PutMapping("/attendance/{id}/url-return")
	public ResponseEntity<?> refreshUrlReturn(@Valid @RequestBody UpdateUrlReturnAttendanceForm body,
			@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
		return attendanceService.updateUrlReturn(id, body);
	}

	@GetMapping("insured/{id}")
	public ResponseEntity<Object> getInsured(@PathVariable Long id, @RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		Object resp = insuredService.getInsured(id);

		return ResponseEntity.ok(resp);
	}

	@GetMapping("/test-room")
	public ResponseEntity<Object> createTestRoom(@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		JsonNode jsonResponse = telemedServerService.createTestRoom();

		return ResponseEntity.ok(jsonResponse);
	}

	@GetMapping("professional/{professionalId}/current-attendance")
	public ResponseEntity<Object> getCurrentAttendance(@PathVariable Long professionalId,
			@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
		Attendance currentAttendance = professionalService.getCurrentAttendance(professionalId);
		return ResponseEntity.ok(new CurrentAttendanceDto(currentAttendance));
	}

	@GetMapping("/notice/{token}")
	public NoticeDto notice(@PathVariable String token, @RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
		Insured insured = insuredService.findByPublicToken(token);
		return noticeService.getNotice(insured);
	}

	@GetMapping("/notice/airmed/{token}")
	public JsonNode airmedNotice(@PathVariable String token, @RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
		Insured insured = insuredService.findByPublicToken(token);
		return airmedService.getNotice(insured);
	}

	@GetMapping("/attendance/incoming/{token}")
	public List<AttendanceDto> incoming(@PathVariable String token, @RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);
		Insured insured = insuredService.findByPublicToken(token);
		return attendanceService.getIncomingAttendances(insured);
	}

	@PostMapping("/insured/permission")
	public ResponseEntity<Object> setAbleToCreateAttendance(@RequestBody @Valid InsuredPermissionForm form,
			@RequestHeader("Authorization") String accessKey) {
		telemedServerService.validateServerApiAccessToken(accessKey);

		insuredService.setAbleToCreateAttendance(form);

		return ResponseEntity.ok().build();
	}

	@GetMapping("next-attendances")
	public ResponseEntity<Object> listNextAttendances(@RequestHeader("Authorization") String accessKey, @RequestParam("clientId") String healhInsuranceIdentificator, @RequestParam("minutes") Integer nextTMinutes) throws Exception {
		telemedServerService.validateServerApiAccessToken(accessKey);		
		return attendanceService.listNextAttendances(healhInsuranceIdentificator, nextTMinutes);
	}
}
