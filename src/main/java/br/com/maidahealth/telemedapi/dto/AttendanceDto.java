package br.com.maidahealth.telemedapi.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;

import com.fasterxml.jackson.databind.JsonNode;

import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.ReturnAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.models.SchedulingType;
import br.com.maidahealth.telemedapi.repositories.vo.AttendanceSchedulerIntegrationView;
import br.com.maidahealth.telemedapi.utils.Utils;

public class AttendanceDto {

	private Long id;

	private String publicId;

	private Date createdAt;

	private String createdAtFormatted;

	private Date schedulingDate;

	private String prettySchedulingDate;

	private Date professionalOnlineDate;

	private String professionalOnlineDateFormatted;

	private Date insuredOnlineDate;

	private String insuredOnlineDateFormatted;

	private Date cancellingDate;

	private String cancellingDateFormatted;

	private Date videoCallEndDate;

	private String videoCallEndDateFormatted;

	private Date finishDate;

	private String finishDateFormatted;

	private AttendanceStatus status;

	private String statusDescription;

	private AttendanceType type;

	private String typeDescription;

	private InsuredDto insured;

	private SpecialtyDto specialty;

	private ProfessionalDto professional;

	private ProviderDto provider;

	private CancellingAttendanceReasonEnum cancellingReason;

	private String cancellingReasonDescription;

	private String contactNumber;

	private String chatbotId;

	private String urlReturn;

	private Boolean hasSicknote;

	private Boolean hasPrescription;

	private Boolean hasExamRequest;
	
	private Boolean hasDocuments;

	private String finishOtherReasonDescription;

	private String finishReason;

	private Set<TicketDto> tickets;

	private AttendancePaymentDetailsDto paymentDetails;

	/////////////////////////////////////////////////

	private SchedulingType schedulingType;

	private ReturnAttendanceReasonEnum returnReason;

	private Boolean enabledMedia;

	private Date enabledMediaDate;

	private Set<PaymentTransactionDto> paymentTransactions;

	private Long vacancyId;

	private JsonNode medicalRecord;

	private String prescription;

	private String exam;

	private String sickNote;

	private String inviteToken;
	private Set<AttachmentDto> attachments;

	public AttendanceDto(Attendance attendance, SpecialtyDto specialty, boolean viewFull, JsonNode medicalRecord,
			String prescription, String exam, String sickNote) {
		super();
		this.id = attendance.getId();
		this.publicId = attendance.getDocwayId();
		this.createdAt = attendance.getCreatedAt();
		this.schedulingDate = attendance.getSchedulingDate();
		this.insuredOnlineDate = attendance.getInsuredOnlineDate();
		this.cancellingDate = attendance.getCancellingDate();
		this.professionalOnlineDate = attendance.getProfessionalOnlineDate();
		this.videoCallEndDate = attendance.getVideoCallEndDate();
		this.finishDate = attendance.getFinishDate();
		this.status = attendance.getStatus();
		this.statusDescription = attendance.getStatus().getDescription();
		this.type = attendance.getType();
		this.typeDescription = attendance.getType().getDescription();
		this.insured = InsuredDto.convert(attendance.getInsured());
		this.professional = ProfessionalDto.convert(attendance.getProfessional());
		this.provider = ProviderDto.convert(attendance.getProvider());
		this.specialty = specialty;
		this.cancellingReason = attendance.getCancellingReason();
		this.contactNumber = attendance.getContactNumber();
		this.prettySchedulingDate = getPrettyDate(this.schedulingDate, this.type);
		this.chatbotId = attendance.getChatbotId();
		this.urlReturn = attendance.getUrlReturn();
		this.hasPrescription = Optional.ofNullable(attendance.getHasPrescription()).orElse(false);
		this.hasSicknote = Optional.ofNullable(attendance.getHasSickNote()).orElse(false);
		this.hasExamRequest = Optional.ofNullable(attendance.getHasExamRequest()).orElse(false);
		this.schedulingType = attendance.getSchedulingType();
		this.returnReason = attendance.getReturnReason();
		this.inviteToken = attendance.getInviteCode();

		if (this.cancellingReason != null) {
			this.cancellingReasonDescription = this.cancellingReason.getDescription();
		}

		this.tickets = TicketDto.convert(attendance.getTickets());
		this.paymentDetails = AttendancePaymentDetailsDto.convert(attendance);

		this.createdAtFormatted = Utils.parseToPrettyDate(attendance.getCreatedAt());
		this.professionalOnlineDateFormatted = Utils.parseToPrettyDate(attendance.getProfessionalOnlineDate());
		this.insuredOnlineDateFormatted = Utils.parseToPrettyDate(attendance.getInsuredOnlineDate());
		this.cancellingDateFormatted = Utils.parseToPrettyDate(attendance.getCancellingDate());
		this.videoCallEndDateFormatted = Utils.parseToPrettyDate(attendance.getVideoCallEndDate());
		this.finishDateFormatted = Utils.parseToPrettyDate(attendance.getFinishDate());
		this.finishReason = attendance.getFinishReason() != null ? attendance.getFinishReason().name() : null;
		this.finishOtherReasonDescription = attendance.getFinishOtherReasonDescription();

		this.paymentTransactions = new HashSet<PaymentTransactionDto>();

		this.attachments = AttachmentDto.convert(attendance.getAttachments());

		if (viewFull) {
			this.enabledMedia = attendance.getEnabledMedia();
			this.enabledMediaDate = attendance.getEnabledMediaDate();
			this.paymentTransactions = PaymentTransactionDto.convert(attendance.getPaymentTransactions());
			this.vacancyId = attendance.getVacancyId();
			this.medicalRecord = medicalRecord;
			this.prescription = prescription;
			this.exam = exam;
			this.sickNote = sickNote;
		}
	}

	public AttendanceDto(AttendanceSchedulerIntegrationView attendance) {
		super();

		SpecialtyDto specialtyDto = new SpecialtyDto();
		ProfessionalDto professionalDto = new ProfessionalDto();

		this.id = attendance.getId();
		this.publicId = attendance.getDocwayId();
		this.createdAt = attendance.getCreatedAt();
		this.schedulingDate = attendance.getSchedulingDate();
		this.professionalOnlineDate = attendance.getProfessionalOnlineDate();
		this.insuredOnlineDate = attendance.getInsuredOnlineDate();
		this.cancellingDate = attendance.getCancellingDate();
		if (cancellingDate != null)
			this.cancellingDateFormatted = Utils.parseToPrettyDate(attendance.getCancellingDate());
		this.videoCallEndDate = attendance.getVideoCallEndDate();
		this.finishDate = attendance.getFinishDate();
		this.contactNumber = attendance.getContactNumber();
		this.chatbotId = attendance.getChatbotId();
		this.urlReturn = attendance.getUrlReturn();
		this.hasPrescription = Optional.ofNullable(attendance.getHasPrescription()).orElse(false);
		this.hasSicknote = Optional.ofNullable(attendance.getHasSickNote()).orElse(false);
		this.hasExamRequest = Optional.ofNullable(attendance.getHasExamRequest()).orElse(false);

		if (attendance.getSpecialty() != null) {
			specialtyDto.setId(attendance.getSpecialty().getId());
			specialtyDto.setName(attendance.getSpecialty().getName());
			specialtyDto.setCode(attendance.getSpecialty().getCode());
			this.specialty = specialtyDto;
		}

		if (attendance.getProfessional() != null) {
			professionalDto.setId(attendance.getProfessional().getId());
			professionalDto.setName(attendance.getProfessional().getName());
			professionalDto.setAssociation(attendance.getProfessional().getAssociation());
			professionalDto.setAssociationNumber(attendance.getProfessional().getAssociationNumber());
			professionalDto.setUfCrm(attendance.getProfessional().getUfCrm());
			professionalDto.setCpf(attendance.getProfessional().getCpf());
			this.professional = professionalDto;
		}

		this.type = attendance.getType();
		this.typeDescription = attendance.getType().getDescription();
		this.status = attendance.getStatus();
		this.statusDescription = attendance.getStatus().getDescription();
		this.cancellingReason = attendance.getCancellingReason();
		if (this.cancellingReason != null) {
			this.cancellingReasonDescription = this.cancellingReason.getDescription();
		}

	}

	public JsonNode getMedicalRecord() {
		return medicalRecord;
	}

	public void setMedicalRecord(JsonNode medicalRecord) {
		this.medicalRecord = medicalRecord;
	}

	public String getPrescription() {
		return prescription;
	}

	public void setPrescription(String prescription) {
		this.prescription = prescription;
	}

	public String getExam() {
		return exam;
	}

	public void setExam(String exam) {
		this.exam = exam;
	}

	public String getSickNote() {
		return sickNote;
	}

	public void setSickNote(String sickNote) {
		this.sickNote = sickNote;
	}

	public synchronized Long getId() {
		return id;
	}

	public synchronized void setId(Long id) {
		this.id = id;
	}

	public synchronized Date getCreatedAt() {
		return createdAt;
	}

	public synchronized void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public synchronized AttendanceStatus getStatus() {
		return status;
	}

	public synchronized void setStatus(AttendanceStatus status) {
		this.status = status;
	}

	public String getStatusDescription() {
		return statusDescription;
	}

	public void setStatusDescription(String statusDescription) {
		this.statusDescription = statusDescription;
	}

	public String getTypeDescription() {
		return typeDescription;
	}

	public void setTypeDescription(String typeDescription) {
		this.typeDescription = typeDescription;
	}

	public synchronized AttendanceType getType() {
		return type;
	}

	public synchronized void setType(AttendanceType type) {
		this.type = type;
	}

	public synchronized InsuredDto getInsured() {
		return insured;
	}

	public synchronized void setInsured(InsuredDto insured) {
		this.insured = insured;
	}

	public static AttendanceDto convert(Attendance attendance, boolean viewFull, JsonNode medicalRecord,
			String prescription, String exam, String sickNote) {
		if (attendance == null)
			return null;
		return new AttendanceDto(attendance, SpecialtyDto.convert(attendance.getSpecialty()), viewFull, medicalRecord,
				prescription, exam, sickNote);
	}

	public static AttendanceDto convert(Attendance attendance, JsonNode serverAttendance, boolean viewFull,
			JsonNode medicalRecord, String prescription, String exam, String sickNote) {
		AttendanceDto attendanceDto = convert(attendance, viewFull, medicalRecord, prescription, exam, sickNote);
		if (attendanceDto == null) {
			return null;
		}

		String finishReason = !serverAttendance.get("finishReason").isNull()
				? serverAttendance.get("finishReason").asText()
				: null;
		String finishOtherReasonDescription = !serverAttendance.get("finishOtherReasonDescription").isNull()
				? serverAttendance.get("finishOtherReasonDescription").asText()
				: null;

		attendanceDto.setFinishReason(finishReason);
		attendanceDto.setFinishOtherReasonDescription(finishOtherReasonDescription);

		return attendanceDto;
	}

	public SpecialtyDto getSpecialty() {
		return specialty;
	}

	public void setSpecialty(SpecialtyDto specialty) {
		this.specialty = specialty;
	}

	public ProfessionalDto getProfessional() {
		return professional;
	}

	public void setProfessional(ProfessionalDto professional) {
		this.professional = professional;
	}

	public ProviderDto getProvider() {
		return provider;
	}

	public void setProvider(ProviderDto provider) {
		this.provider = provider;
	}

	public Date getSchedulingDate() {
		return schedulingDate;
	}

	public void setSchedulingDate(Date schedulingDate) {
		this.schedulingDate = schedulingDate;
	}

	public void setPrettySchedulingDate(String prettySchedulingDate) {
		this.prettySchedulingDate = prettySchedulingDate;
	}

	public String getPrettySchedulingDate() {
		return prettySchedulingDate;
	}

	public Date getCancellingDate() {
		return cancellingDate;
	}

	public void setCancellingDate(Date cancellingDate) {
		this.cancellingDate = cancellingDate;
	}

	public Date getFinishDate() {
		return finishDate;
	}

	public void setFinishDate(Date finishDate) {
		this.finishDate = finishDate;
	}

	public Date getProfessionalOnlineDate() {
		return professionalOnlineDate;
	}

	public void setProfessionalOnlineDate(Date professionalOnlineDate) {
		this.professionalOnlineDate = professionalOnlineDate;
	}

	public Date getInsuredOnlineDate() {
		return insuredOnlineDate;
	}

	public void setInsuredOnlineDate(Date insuredOnlineDate) {
		this.insuredOnlineDate = insuredOnlineDate;
	}

	public Date getVideoCallEndDate() {
		return videoCallEndDate;
	}

	public void setVideoCallEndDate(Date videoCallEndDate) {
		this.videoCallEndDate = videoCallEndDate;
	}

	public CancellingAttendanceReasonEnum getCancellingReason() {
		return cancellingReason;
	}

	public void setCancellingReason(CancellingAttendanceReasonEnum cancellingReason) {
		this.cancellingReason = cancellingReason;
	}

	public String getCancellingReasonDescription() {
		return cancellingReasonDescription;
	}

	public void setCancellingReasonDescription(String cancellingReasonDescription) {
		this.cancellingReasonDescription = cancellingReasonDescription;
	}

	public synchronized String getContactNumber() {
		return contactNumber;
	}

	public synchronized void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getChatbotId() {
		return chatbotId;
	}

	public void setChatbotId(String chatbotId) {
		this.chatbotId = chatbotId;
	}

	public static Page<AttendanceDto> convert(Page<Attendance> attendances, boolean viewFull,
			Map<Long, JsonNode> medicalRecords, Map<Long, String> prescriptions, Map<Long, String> exams,
			Map<Long, String> sickNotes) {
		if (attendances != null) {
			if (medicalRecords != null) {
				return attendances.map(a -> new AttendanceDto(a, SpecialtyDto.convert(a.getSpecialty()), viewFull,
						medicalRecords.get(a.getId()), prescriptions.get(a.getId()), exams.get(a.getId()),
						sickNotes.get(a.getId())));
			}
			return attendances.map(a -> new AttendanceDto(a, SpecialtyDto.convert(a.getSpecialty()), viewFull, null,
					null, null, null));
		}
		return null;
	}

	private String getPrettyDate(Date schedulingDate, AttendanceType type) {
		if (type.equals(AttendanceType.ELECTIVE)) {
			return Utils.parseToPrettyDate(schedulingDate);
		} else {
			return Utils.parseToPrettyDate(createdAt);
		}
	}

	public Boolean getHasSicknote() {
		return hasSicknote;
	}

	public void setHasSicknote(Boolean hasSicknote) {
		this.hasSicknote = hasSicknote;
	}

	public Boolean getHasPrescription() {
		return hasPrescription;
	}

	public void setHasPrescription(Boolean hasPrescription) {
		this.hasPrescription = hasPrescription;
	}

	public String getUrlReturn() {
		return urlReturn;
	}

	public void setUrlReturn(String urlReturn) {
		this.urlReturn = urlReturn;
	}

	public String getPublicId() {
		return publicId;
	}

	public void setPublicId(String publicId) {
		this.publicId = publicId;
	}

	public Boolean getHasExamRequest() {
		return hasExamRequest;
	}

	public void setHasExamRequest(Boolean hasExamRequest) {
		this.hasExamRequest = hasExamRequest;
	}

	public String getFinishOtherReasonDescription() {
		return finishOtherReasonDescription;
	}

	public void setFinishOtherReasonDescription(String finishOtherReasonDescription) {
		this.finishOtherReasonDescription = finishOtherReasonDescription;
	}

	public String getFinishReason() {
		return finishReason;
	}

	public void setFinishReason(String finishReason) {
		this.finishReason = finishReason;
	}

	public AttendancePaymentDetailsDto getPaymentDetails() {
		return paymentDetails;
	}

	public void setPaymentDetails(AttendancePaymentDetailsDto paymentDetails) {
		this.paymentDetails = paymentDetails;
	}

	public String getCreatedAtFormatted() {
		return createdAtFormatted;
	}

	public void setCreatedAtFormatted(String createdAtFormatted) {
		this.createdAtFormatted = createdAtFormatted;
	}

	public String getProfessionalOnlineDateFormatted() {
		return professionalOnlineDateFormatted;
	}

	public void setProfessionalOnlineDateFormatted(String professionalOnlineDateFormatted) {
		this.professionalOnlineDateFormatted = professionalOnlineDateFormatted;
	}

	public String getInsuredOnlineDateFormatted() {
		return insuredOnlineDateFormatted;
	}

	public void setInsuredOnlineDateFormatted(String insuredOnlineDateFormatted) {
		this.insuredOnlineDateFormatted = insuredOnlineDateFormatted;
	}

	public String getCancellingDateFormatted() {
		return cancellingDateFormatted;
	}

	public void setCancellingDateFormatted(String cancellingDateFormatted) {
		this.cancellingDateFormatted = cancellingDateFormatted;
	}

	public String getVideoCallEndDateFormatted() {
		return videoCallEndDateFormatted;
	}

	public void setVideoCallEndDateFormatted(String videoCallEndDateFormatted) {
		this.videoCallEndDateFormatted = videoCallEndDateFormatted;
	}

	public String getFinishDateFormatted() {
		return finishDateFormatted;
	}

	public void setFinishDateFormatted(String finishDateFormatted) {
		this.finishDateFormatted = finishDateFormatted;
	}

	public Set<TicketDto> getTickets() {
		return tickets;
	}

	public SchedulingType getSchedulingType() {
		return schedulingType;
	}

	public void setSchedulingType(SchedulingType schedulingType) {
		this.schedulingType = schedulingType;
	}

	public ReturnAttendanceReasonEnum getReturnReason() {
		return returnReason;
	}

	public void setReturnReason(ReturnAttendanceReasonEnum returnReason) {
		this.returnReason = returnReason;
	}

	public Boolean getEnabledMedia() {
		return enabledMedia;
	}

	public void setEnabledMedia(Boolean enabledMedia) {
		this.enabledMedia = enabledMedia;
	}

	public Date getEnabledMediaDate() {
		return enabledMediaDate;
	}

	public void setEnabledMediaDate(Date enabledMediaDate) {
		this.enabledMediaDate = enabledMediaDate;
	}

	public Long getVacancyId() {
		return vacancyId;
	}

	public void setVacancyId(Long vacancyId) {
		this.vacancyId = vacancyId;
	}

	public Set<PaymentTransactionDto> getPaymentTransactions() {
		return paymentTransactions;
	}

	public void setInviteToken(String inviteToken) {
		this.inviteToken = inviteToken;
	}

	public String getInviteToken() {
		return inviteToken;
	}

	public Set<AttachmentDto> getAttachments() {
		return attachments;
	}

	public void setAttachments(Set<AttachmentDto> attachments) {
		this.attachments = attachments;
	}

	public Boolean getHasDocuments() {
		return hasDocuments;
	}

	public void setHasDocuments(Boolean hasDocuments) {
		this.hasDocuments = hasDocuments;
	}
}