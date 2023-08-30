package br.com.maidahealth.telemedapi.dto;

import java.util.Date;

import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.utils.Utils;

public class AttendanceSchedulerDTO {

	private Long id;

	private AttendanceType type;

	private String typeDescription;

	private String publicId;

	private InsuredDto insured;

	private SpecialtyDto specialty;

	private ProfessionalDto professional;

	private ProviderDto provider;

	private String chatbotId;

	private Date createdAt;

	private Date schedulingDate;
	
	private String prettySchedulingDate;

	private Date professionalOnlineDate;

	private Date insuredOnlineDate;

	private Date cancellingDate;

	private Date videoCallEndDate;

	private Date finishDate;

	private AttendanceStatus status;

	private String statusDescription;

	private String cancellingReasonDescription;

	private String contactNumber;

	private String urlReturn;

	private Boolean hasSickNote;

	private Boolean hasPrescription;

	private Boolean hasExamRequest;

	private String finishOtherReasonDescription;

	private String finishReason;

	public AttendanceSchedulerDTO() {
	}

	private String getPrettyDate(Date schedulingDate, AttendanceType type) {
		if (type.equals(AttendanceType.ELECTIVE)) {
			return Utils.parseToPrettyDate(schedulingDate);
		} else {
			return Utils.parseToPrettyDate(createdAt);
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public AttendanceType getType() {
		return type;
	}

	public void setType(AttendanceType type) {
		this.type = type;
	}

	public String getTypeDescription() {
		return typeDescription;
	}

	public void setTypeDescription(String typeDescription) {
		this.typeDescription = typeDescription;
	}

	public String getPublicId() {
		return publicId;
	}

	public void setPublicId(String publicId) {
		this.publicId = publicId;
	}

	public InsuredDto getInsured() {
		return insured;
	}

	public void setInsured(InsuredDto insured) {
		this.insured = insured;
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

	public String getChatbotId() {
		return chatbotId;
	}

	public void setChatbotId(String chatbotId) {
		this.chatbotId = chatbotId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getSchedulingDate() {
		return schedulingDate;
	}

	public void setSchedulingDate(Date schedulingDate) {
		this.schedulingDate = schedulingDate;
	}

	public String getPrettySchedulingDate() {
		return prettySchedulingDate;
	}

	public void setPrettySchedulingDate(String prettySchedulingDate) {
		this.prettySchedulingDate = prettySchedulingDate;
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

	public Date getCancellingDate() {
		return cancellingDate;
	}

	public void setCancellingDate(Date cancellingDate) {
		this.cancellingDate = cancellingDate;
	}

	public Date getVideoCallEndDate() {
		return videoCallEndDate;
	}

	public void setVideoCallEndDate(Date videoCallEndDate) {
		this.videoCallEndDate = videoCallEndDate;
	}

	public Date getFinishDate() {
		return finishDate;
	}

	public void setFinishDate(Date finishDate) {
		this.finishDate = finishDate;
	}

	public AttendanceStatus getStatus() {
		return status;
	}

	public void setStatus(AttendanceStatus status) {
		this.status = status;
	}

	public String getStatusDescription() {
		return statusDescription;
	}

	public void setStatusDescription(String statusDescription) {
		this.statusDescription = statusDescription;
	}

	public String getCancellingReasonDescription() {
		return cancellingReasonDescription;
	}

	public void setCancellingReasonDescription(String cancellingReasonDescription) {
		this.cancellingReasonDescription = cancellingReasonDescription;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getUrlReturn() {
		return urlReturn;
	}

	public void setUrlReturn(String urlReturn) {
		this.urlReturn = urlReturn;
	}

	public Boolean getHasSickNote() {
		return hasSickNote;
	}

	public void setHasSickNote(Boolean hasSickNote) {
		this.hasSickNote = hasSickNote;
	}

	public Boolean getHasPrescription() {
		return hasPrescription;
	}

	public void setHasPrescription(Boolean hasPrescription) {
		this.hasPrescription = hasPrescription;
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


}
