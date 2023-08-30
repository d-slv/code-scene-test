package br.com.maidahealth.telemedapi.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import br.com.maidahealth.telemedapi.dto.AttachmentDto;
import br.com.maidahealth.telemedapi.dto.AttachmentViewerDto;
import br.com.maidahealth.telemedapi.enums.ParticipantType;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.AttachmentForm;
import br.com.maidahealth.telemedapi.form.AttachmentListForm;
import br.com.maidahealth.telemedapi.form.AttachmentViewerForm;
import br.com.maidahealth.telemedapi.models.Attachment;
import br.com.maidahealth.telemedapi.models.AttachmentViewer;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.AttachmentRepository;
import br.com.maidahealth.telemedapi.repositories.AttachmentViewerRepository;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;

@Service
public class AttachmentService {

	@Autowired
	private IlyDocumentService ilyDocumentService;

	@Autowired
	private TelemedServerService telemedServerService;

	@Autowired
	private AttachmentRepository repository;

	@Autowired
	private AttachmentViewerRepository attachmentViewerRepository;

	@Autowired
	private AttendanceRepository attendanceRepository;

	@Autowired
	private AuthenticationService authenticationService;

	public Attachment sendFIleToIly(Long id, MultipartFile file) {

		Attendance attendance = attendanceRepository.findById(id)
				.orElseThrow(() -> new InvalidException("Atendimento inválido"));

		String ilyKey = ilyDocumentService.sendFileToIly(file);

		Attachment attachment = new Attachment();

		attachment.setKey(ilyKey);
		attachment.setName(file.getOriginalFilename());

		attendance.getAttachments().add(attachment);

		syncAttendanceWithServer(attendance);

		repository.saveAll(attendance.getAttachments());
		attendanceRepository.save(attendance);

		retrieveS3Link(attachment);
		return attachment;
	}

	public Attachment findByKey(String key) {
		Attachment attachment = repository.findByKey(key).orElseThrow(() -> new InvalidException("Chave inválida"));

		retrieveS3Link(attachment);

		return attachment;
	}

	public Attendance addAttachmentToAttendance(@Valid AttachmentListForm listForm, Long id, boolean sync) {

		Attendance attendance = attendanceRepository.findById(id)
				.orElseThrow(() -> new InvalidException("Atendimento inválido"));

		return attachtoAttendance(listForm, sync, attendance);
	}

	public Attendance addAttachmentToAttendance(@Valid AttachmentListForm listForm, String id, boolean sync) {

		Attendance attendance = attendanceRepository.findByDocwayId(id)
				.orElseThrow(() -> new InvalidException("Atendimento inválido"));

		return attachtoAttendance(listForm, sync, attendance);
	}

	private Attendance attachtoAttendance(AttachmentListForm listForm, boolean sync, Attendance attendance) {
		for (AttachmentForm form : listForm.getAttachmentList()) {

			if (!attachmentListConteisns(form.getKey(), attendance.getAttachments())) {

				Attachment attachment = repository.findByKey(form.getKey()).orElse(form.toAttachment());

				attendance.getAttachments().add(attachment);

			}
		}

		if (sync)
			syncAttendanceWithServer(attendance);

		repository.saveAll(attendance.getAttachments());
		attendanceRepository.save(attendance);

		return attendance;
	}

	public Set<Attachment> findAttendanceAttachments(Long id) {
		Attendance attendance = attendanceRepository.findById(id)
				.orElseThrow(() -> new InvalidException("Atendimento inválido"));

		for (Attachment anexo : attendance.getAttachments()) {
			retrieveS3Link(anexo);
		}

		return attendance.getAttachments();
	}

	private void syncAttendanceWithServer(Attendance attendance) {

		List<AttachmentForm> list = new ArrayList<>();

		for (Attachment attachment : attendance.getAttachments()) {
			AttachmentForm form = new AttachmentForm(attachment);
			list.add(form);
		}
		AttachmentListForm listForm = new AttachmentListForm(list);

		telemedServerService.syncAttendanceWithServer(listForm, attendance.getDocwayId());
	}

	private boolean attachmentListConteisns(String key, Set<Attachment> set) {
		for (Attachment form : set) {
			if (form.getKey().equals(key)) {
				return true;
			}
		}
		return false;
	}

	private void retrieveS3Link(Attachment attachment) {
		attachment.setLastUrl(ilyDocumentService.recoverS3Link(attachment.getKey()));

		repository.save(attachment);
	}

	public AttachmentDto generateAttachmentDto(Attachment attachment) {

		String publicId = null;
		ParticipantType type = ParticipantType.PATIENT;

		if(currentUser().isInsured()) {
			publicId = currentUser().getInsured().getDocwayId();
		} else if(currentUser().isGuest()) {
			publicId = currentUser().getGuest().getPublicId();
		}

		Optional<AttachmentViewer> optionalViewer = attachmentViewerRepository.findByKeyAndPublicIdAndType(attachment.getKey(), publicId, type);
		if(optionalViewer.isPresent()) {
			return new AttachmentDto(attachment, optionalViewer.get().getCreatedAt(),true);
		}

		return new AttachmentDto(attachment, true);
	}

	public Set<AttachmentDto> generateAttachmentDto(Set<Attachment> attachments) {

		return attachments.stream().map(this::generateAttachmentDto).collect(Collectors.toSet());
	}

	@Transactional
	public AttachmentViewerDto viewAttachment(String key) {

		if(checkIfAttachmentIsViewed(key)) {
			throw new InvalidException("Anexo já foi lido");
		}

		AttachmentViewer viewer = null;

		if(currentUser().isInsured()) {
			viewer = new AttachmentViewer(key, currentUser().getInsured());
		} else if(currentUser().isGuest()){
			viewer = new AttachmentViewer(key, currentUser().getGuest());
		} else {
			throw new InvalidException("Tipo de Usuário não válido ou não identificado.");
		}
		attachmentViewerRepository.save(viewer);

		AttachmentViewerForm form = new AttachmentViewerForm(viewer);
		telemedServerService.syncAttachmentViewWithServer(form);

		return new AttachmentViewerDto(viewer);
	}

	public AttachmentViewerDto syncAttachmentView(AttachmentViewerForm form) {

		AttachmentViewer viewer = AttachmentViewerForm.convert(form);
		attachmentViewerRepository.save(viewer);
		return new AttachmentViewerDto(viewer);
	}

	private Boolean checkIfAttachmentIsViewed(String key) {

		String publicId = null;
		ParticipantType type = ParticipantType.PATIENT;

		if(currentUser().isInsured()) {
			publicId = currentUser().getInsured().getDocwayId();
		} else if(currentUser().isGuest()) {
			publicId = currentUser().getGuest().getPublicId();
		}

		Optional<AttachmentViewer> optinalViewer = attachmentViewerRepository.findByKeyAndPublicIdAndType(key, publicId, type);
		if(optinalViewer.isPresent()) {
			return true;
		}

		return false;
	}

	private User currentUser() {
		return authenticationService.currentUser();
	}

}
