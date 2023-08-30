package br.com.maidahealth.telemedapi.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.dto.AttachmentDto;
import br.com.maidahealth.telemedapi.dto.AttachmentViewerDto;
import br.com.maidahealth.telemedapi.dto.AttendanceDto;
import br.com.maidahealth.telemedapi.dto.AttendanceGuestsDto;
import br.com.maidahealth.telemedapi.dto.AttendanceReasonDto;
import br.com.maidahealth.telemedapi.dto.AtttendanceStatusDto;
import br.com.maidahealth.telemedapi.dto.CancellingAttendanceReasonDto;
import br.com.maidahealth.telemedapi.dto.DateTypeDto;
import br.com.maidahealth.telemedapi.dto.GuestDto;
import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.dto.RoomDto;
import br.com.maidahealth.telemedapi.dto.VacancyDto;
import br.com.maidahealth.telemedapi.enums.AttendanceDateType;
import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.ReturnAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.form.AttachmentListForm;
import br.com.maidahealth.telemedapi.form.AttendanceForm;
import br.com.maidahealth.telemedapi.form.GuestForm;
import br.com.maidahealth.telemedapi.form.PhoneForm;
import br.com.maidahealth.telemedapi.form.SelfAttendanceForm;
import br.com.maidahealth.telemedapi.form.VacancyForm;
import br.com.maidahealth.telemedapi.models.Attachment;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.Guest;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.models.Vacancy;
import br.com.maidahealth.telemedapi.services.AttachmentService;
import br.com.maidahealth.telemedapi.services.AttendanceService;
import br.com.maidahealth.telemedapi.services.AuthenticationService;

@RestController
@RequestMapping("attendance")
public class AttendanceController {

	@Autowired
	private AttendanceService service;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private AttachmentService attachmentService;

	@GetMapping
	public Page<AttendanceDto> mine(@RequestParam("filter") Optional<String> filter,
									@PageableDefault(page = 0, size = 10) Pageable pagination) {
		String stringFilter = "";

		if (filter.isPresent())
			stringFilter = filter.get();
		return service.getMyAttendances(stringFilter, pagination);
	}

	@GetMapping("incoming")
	public List<AttendanceDto> incoming() {
		return service.getIncomingAttendances(null);
	}

	@GetMapping("/finished-history")
	public Page<AttendanceDto> finishedHistory(@RequestParam(required = false) String professionalPublicId,
											   @PageableDefault(page = 0, size = 10) Pageable pagination) {
		return service.getAttendanceHistory(professionalPublicId, pagination);
	}

	@PostMapping("/{id}/start")
	public RoomDto start(@PathVariable Long id) {
		return service.startAttendance(id);
	}

	@PostMapping("/{id}/cancel")
	public String cancel(@RequestBody(required = false) Object obj, @PathVariable Long id, BindingResult result)
			throws NoSuchMethodException, SecurityException, MethodArgumentNotValidException {
		User currentUser = authenticationService.currentUser();

		Boolean isPresent = false;

		CancellingAttendanceReasonEnum reason = CancellingAttendanceReasonEnum.CANCELED_BY_INSURED;
		if (obj != null) {
			JsonObject json = JsonParser.parseString(new Gson().toJson(obj)).getAsJsonObject();
			isPresent = json.has("cancelReason");
			if (isPresent) {
				String cancelReasonString = json.get("cancelReason").getAsString();
				reason = CancellingAttendanceReasonEnum.valueOf(cancelReasonString);
			}
		}
		if (currentUser.isSecretary() && !isPresent)
			result.addError(new ObjectError("cancelReason", "O motivo de cancelamento é obrigatório"));

		if (result.hasErrors()) {
			throw new MethodArgumentNotValidException(new MethodParameter(
					this.getClass().getDeclaredMethod("cancel", Object.class, Long.class, BindingResult.class), 0),
					result);
		}

		service.cancel(id, reason);
		return "success";
	}

	@GetMapping("{id}")
	public AttendanceDto get(
			@RequestParam(name = "viewFull", required = false, defaultValue = "false") boolean viewFull,
			@PathVariable Long id) throws Exception {
		return service.getAttendanceById(id, viewFull);
	}

	@GetMapping("/public-id/{public_id}")
	public AttendanceDto get(
			@RequestHeader("Authorization") String token,
			@RequestParam(name = "viewFull", required = false, defaultValue = "false") boolean viewFull,
			@PathVariable("public_id") String publicId) {

		return service.getAttendanceByPublicId(token, publicId, viewFull);
	}

	@PostMapping("/{id}/stop")
	public String stop(@PathVariable Long id) {
		service.stop(id);
		return "success";
	}

	@PostMapping("/{id}/feedback")
	public ResponseEntity<Object> setFeedback(@RequestBody Object obj, @PathVariable("id") Long id) {
		JsonObject jsonObject = JsonParser.parseString(new Gson().toJson(obj)).getAsJsonObject();

		service.setFeedback(jsonObject, id);

		return new ResponseEntity<Object>(HttpStatus.OK);
	}

	@PostMapping("/schedule")
	public ResponseEntity<AttendanceDto> schedule(@RequestBody @Valid AttendanceForm form) throws MessagingException {
		Attendance attendance = service.schedule(form);
		return ResponseEntity.ok(AttendanceDto.convert(attendance, false, null, null, null, null));
	}

    @PostMapping("/self-schedule-vacancy")
    public ResponseEntity<VacancyDto> selfScheduleVacancy(@RequestBody @Valid SelfAttendanceForm form) throws MessagingException {
        Vacancy vacancy = service.selfScheduleVacancy(form);
        return ResponseEntity.ok(VacancyDto.convert(vacancy));
    }
    
    @PostMapping("/self-schedule")
    public ResponseEntity<AttendanceDto> selfSchedule(@RequestBody @Valid VacancyForm form) throws MessagingException {
        Attendance attendance = service.selfSchedule(form);
        return ResponseEntity.ok(AttendanceDto.convert(attendance, false, null, null, null, null));
    }

	@PostMapping("/self-reschedule/{attendanceid}")
	public ResponseEntity<AttendanceDto> selfReschedule(@RequestBody @Valid VacancyForm form, @PathVariable("attendanceid") Long id)
			throws MessagingException {
		
		service.validReschedule(form.getId(), id);
		Attendance attendance = service.selfReschedule(form, id);
		return ResponseEntity.ok(AttendanceDto.convert(attendance, false, null, null, null, null));
	}

	@GetMapping("cancelling_reasons")
	public List<CancellingAttendanceReasonDto> cancellingAttendancesReasons() {
		List<CancellingAttendanceReasonDto> reasonsDto = new ArrayList<CancellingAttendanceReasonDto>();

		for (CancellingAttendanceReasonEnum reason : CancellingAttendanceReasonEnum.getReasons()) {
			reasonsDto.add(CancellingAttendanceReasonDto.convert(reason));
		}

		return reasonsDto;
	}

	@GetMapping("/status")
	public List<AtttendanceStatusDto> list() {
		return AtttendanceStatusDto.convert(AttendanceStatus.values());
	}

	@GetMapping("/list")
	public Page<AttendanceDto> listAttendance(@RequestParam(name = "filter", required = false) String filter,
			@RequestParam(name = "insured", required = false) Long insuredId,
			@RequestParam(name = "provider", required = false) Long providerId,
			@RequestParam(name = "specialty", required = false) Long specialtyId,
			@RequestParam(name = "professional", required = false) Long professionalId,
			@RequestParam(name = "status", required = false) String status,
			@RequestParam(name = "statusList", required = false) List<String> statusList,
			@RequestParam(name = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
			@RequestParam(name = "finishDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date finishDate,
			@RequestParam(name = "type", required = false) String type,
			@RequestParam(name = "dateType", required = false) String dateType,
			@RequestParam(name = "hasDocuments", required = false) Boolean hasDocuments,
			@PageableDefault(page = 0, size = 10) Pageable pagination) {

		Page<Attendance> attendances = service.getAttendances(filter, insuredId, providerId, specialtyId,
				professionalId, status, statusList, startDate, finishDate, type, dateType, hasDocuments, pagination);
		return AttendanceDto.convert(attendances, false, null, null, null, null);
	}

	@GetMapping("/{id}/{index}/{document}/download")
	public ResponseEntity<Resource> downloadSicknotePrescription(@PathVariable Long id, @PathVariable String document,
			@PathVariable Integer index) throws IOException {
		Resource resource = service.downloadDocument(id, index, document);

		return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
				.header(HttpHeaders.CONTENT_DISPOSITION,
						"attachment; filename=\"" + resource.getFile().getName().toLowerCase() + "\"")
				.body(resource);
	}

	@GetMapping("/{id}/medical-record")
	public ResponseEntity<?> getMedicalRecord(@PathVariable Long id) {
		JsonNode response = service.findMedicalRecord(id);

		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/{cpf}/prescription/cpf")
	public ResponseEntity<?> getPrescriptionsByCpf(@PathVariable String cpf) throws Exception {
		JsonNode response = service.findPrescriptionsByCpf(cpf);

		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/{id}/{document}/publicId")
	public ResponseEntity<?> getPrescriptionsByPublicId(@PathVariable String id, @PathVariable String document) throws Exception {
		JsonNode response = service.findPrescriptionsByPublicId(id, document);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}/{document}/old")
	public ResponseEntity<?> getPrescriptionSicknoteExam(@PathVariable Long id, @PathVariable String document) throws Exception {
		JsonNode response = service.findPrescriptionSicknoteExam(id, document);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}/{document}")
	public ResponseEntity<?> getPrescriptionSicknoteExamAsync(@PathVariable Long id, @PathVariable String document) throws Exception {
		JsonNode response = service.findPrescriptionSicknoteExamAsync(id, document);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/date-types")
	public ResponseEntity<?> getAttendanceDateTypes() {
		return ResponseEntity.ok(DateTypeDto.convert(AttendanceDateType.values()));
	}

	@GetMapping("/attendance-reason")
	public List<AttendanceReasonDto> getReason() {
		List<AttendanceReasonDto> reasonsDto = new ArrayList<AttendanceReasonDto>();
		for (ReturnAttendanceReasonEnum reason : ReturnAttendanceReasonEnum.getReasons()) {
			reasonsDto.add(AttendanceReasonDto.convert(reason));
		}
    
		return reasonsDto;
	}

	@PostMapping("/{id}/invite/{invite_code}")
    public ResponseEntity<?> registerGuest(@PathVariable("id") Long id, @PathVariable("invite_code") String inviteCode, @RequestBody @Valid GuestForm form) {
        return service.registerGuest(id, inviteCode, form);
    }

	@PutMapping("/{id}/phone-number")
	public ResponseEntity<?> updatePhoneNumber(@PathVariable String id, @RequestBody PhoneForm form,
			@RequestHeader("Authorization") String token) {
		service.updatePhoneNumber(id, form, token);
		return ResponseEntity.ok(new MessageDto("Telefone atualizado com sucesso"));
	}

	@GetMapping("/{id}/invite/{invite_code}")
	public ResponseEntity<?> checkInviteCode(@PathVariable("id") Long id,
			@PathVariable("invite_code") String inviteCode) {
		return service.checkInviteCode(id, inviteCode);
	}

	@GetMapping("/test-room")
	public ResponseEntity<Object> createTestRoom() {
		JsonNode jsonResponse = service.createTestRoom();

		return ResponseEntity.ok(jsonResponse);
	}

	@PostMapping("/{id}/attachment-file")
	@Transactional
	public ResponseEntity<AttachmentDto> sendDocument(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
		Attachment attachment = attachmentService.sendFIleToIly(id, file);
		attachmentService.viewAttachment(attachment.getKey());
		return ResponseEntity.ok(new AttachmentDto(attachment, new Date(), true));
	}

	@GetMapping("/check-return-right")
	public ResponseEntity<?> checkReturnRight(@RequestParam(required = true) Long insuredId,
			@RequestParam(required = true) Long specialtyId) {
		return service.checkReturnRight(insuredId, specialtyId);
	}

	@GetMapping("/attachment")
	public ResponseEntity<?> findByKey(@RequestParam("key") String key) {
		Attachment attachment = attachmentService.findByKey(key);
		AttachmentDto attachmentDto = attachmentService.generateAttachmentDto(attachment);
		return ResponseEntity.ok(attachmentDto);
	}

	@PostMapping("/{id}/attachment-form")
	@Transactional
	public ResponseEntity<?> addAttachmenttoAttendance(@RequestBody @Valid AttachmentListForm form,
			@PathVariable Long id, @RequestParam(name = "sync", required = false, defaultValue = "true") boolean sync) {
		Attendance attendance = attachmentService.addAttachmentToAttendance(form, id, sync);
		return ResponseEntity.ok(AttendanceDto.convert(attendance, true, null, null, null, null));
	}

	@GetMapping("/{id}/attachments")
	public ResponseEntity<Set<AttachmentDto>> findAttachmenttoAttendance(@PathVariable Long id) {

		Set<Attachment> list = attachmentService.findAttendanceAttachments(id);
		Set<AttachmentDto> attachmentDtos = attachmentService.generateAttachmentDto(list);

		return ResponseEntity.ok(attachmentDtos);
	}
	
	@PutMapping("/view-attachment/{key}")
	public ResponseEntity<AttachmentViewerDto> viewAttachment(@PathVariable String key) {

		AttachmentViewerDto viewDto = attachmentService.viewAttachment(key);
		return ResponseEntity.ok(viewDto);
	}

	@GetMapping("/guests/{id}")
	public ResponseEntity<?> getAttendanceGuests(@PathVariable String id, @RequestHeader("accessToken") String token) {
		Set<Guest> guests = service.getAttendanceGuests(id, token);
		return ResponseEntity.ok(new AttendanceGuestsDto(id, GuestDto.convert(guests)));
	}
}
