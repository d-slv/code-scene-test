package br.com.maidahealth.telemedapi.models;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.ReturnAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.VideoCallFinishReasonEnum;
import br.com.maidahealth.telemedapi.utils.Utils;



@Entity
@Table(indexes = { @Index(name = "attendance_idx_chatbot_id", columnList = "chatbotId"),
		@Index(name = "attendance_idx_docway_id", columnList = "docwayId"),
		@Index(name = "attendance_idx_scheduling_date", columnList = "schedulingDate"),
		@Index(name = "attendance_idx_status", columnList = "status"),
		@Index(name = "attendance_idx_insured_id", columnList = "insured_id"),
		@Index(name = "attendance_idx_professional_id", columnList = "professional_id"),
		@Index(name = "attendance_idx_provider_id", columnList = "provider_id"),
		@Index(name = "attendance_idx_requester_insured_id", columnList = "requester_insured_id"),
		@Index(name = "attendance_idx_specialty_id", columnList = "specialty_id"),
		@Index(name = "attendance_idx_hash", columnList = "hash") })

public class Attendance implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String erpId;

	private String chatbotId;

	private String docwayId;

	@Enumerated(EnumType.STRING)
	private AttendanceStatus status;

	@Enumerated(EnumType.STRING)
	private AttendanceType type;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	private Date schedulingDate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date professionalOnlineDate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date insuredOnlineDate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date cancellingDate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date videoCallEndDate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date finishDate;

	@Enumerated(EnumType.STRING)
	private CancellingAttendanceReasonEnum cancellingReason;

	private String contactNumber;

	private String urlReturn;

	@ManyToOne
	@JoinColumn(name = "insured_id")
	private Insured insured;

	@ManyToOne
	@JoinColumn(name = "requester_insured_id")
	private Insured requesterInsured;

	@ManyToOne
	@JoinColumn(name = "provider_id")
	private Provider provider;

	@ManyToOne
	@JoinColumn(name = "professional_id")
	private Professional professional;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "specialty_id")
	private Specialty specialty;

	private Boolean hasPrescription;

	private Boolean hasSickNote;

	@Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
	private Boolean hasExamRequest;

	@Enumerated(EnumType.STRING)
	private SchedulingType schedulingType;

	private Boolean enabledMedia;

	@Enumerated(EnumType.STRING)
	private VideoCallFinishReasonEnum finishReason;

	@Enumerated(EnumType.STRING)
	private ReturnAttendanceReasonEnum returnReason;

	private String finishOtherReasonDescription;

	@Temporal(TemporalType.TIMESTAMP)
	private Date enabledMediaDate;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "payment_details_id")
	private AttendancePaymentDetails paymentDetails;

	@OneToMany(mappedBy = "attendance")
	private Set<PaymentTransaction> paymentTransactions;

	@OneToMany(mappedBy = "attendance")
	private Set<Ticket> tickets;

	@Column(unique = true)
	private Long vacancyId;

	@Column(unique = true)
	private String hash;

	@ManyToMany()
	private Set<Attachment> attachments = new HashSet<>();

	private String inviteCode;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "guest_id")
	private Set<Guest> guests = new HashSet<>();
	
	private String healthInsuranceIdentificator;
	
	@Column(name="health_attendance_id")
	private Long healthAttendanceId;

	public Long getHealthAttendanceId(){
		return healthAttendanceId;
	}

	public void setHealthAttendanceId(Long healthAttendanceId){
		this.healthAttendanceId = healthAttendanceId;
	}

	public String getHealthInsuranceIdentificator() {
		return healthInsuranceIdentificator;
	}

	public void setHealthInsuranceIdentificator(String healthInsuranceIdentificator) {
		this.healthInsuranceIdentificator = healthInsuranceIdentificator;
	}

	public Long getId() {
		return id;
	}

	public String getErpId() {
		return erpId;
	}

	public String getDocwayId() {
		return docwayId;
	}

	public AttendanceStatus getStatus() {
		return status;
	}

	public Insured getInsured() {
		return insured;
	}

	public Insured getRequesterInsured() {
		return requesterInsured;
	}

	public void setRequesterInsured(Insured requesterInsured) {
		this.requesterInsured = requesterInsured;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public Provider getProvider() {
		return provider;
	}

	public Professional getProfessional() {
		return professional;
	}

	public Specialty getSpecialty() {
		return specialty;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setErpId(String erpId) {
		this.erpId = erpId;
	}

	public void setDocwayId(String docwayId) {
		this.docwayId = docwayId;
	}

	public void setStatus(AttendanceStatus status) {
		this.status = status;
	}

	public void setInsured(Insured insured) {
		this.insured = insured;
	}

	public void setProvider(Provider provider) {
		this.provider = provider;
	}

	public void setProfessional(Professional professional) {
		this.professional = professional;
	}

	public void setSpecialty(Specialty specialty) {
		this.specialty = specialty;
	}

	public synchronized AttendanceType getType() {
		return type;
	}

	public synchronized void setType(AttendanceType type) {
		this.type = type;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public CancellingAttendanceReasonEnum getCancellingReason() {
		return cancellingReason;
	}

	public void setCancellingReason(CancellingAttendanceReasonEnum cancellingReason) {
		this.cancellingReason = cancellingReason;
	}

	public String getChatbotId() {
		return chatbotId;
	}

	public void setChatbotId(String chatbotId) {
		this.chatbotId = chatbotId;
	}

	@PrePersist
	void setDataOnCreate() {
		this.createdAt = new Date();
		this.generateHash();
	}

	public SchedulingType getSchedulingType() {
		return schedulingType;
	}

	public void setSchedulingType(SchedulingType schedulingType) {
		this.schedulingType = schedulingType;
	}

	public Boolean getHasPrescription() {
		return hasPrescription;
	}

	public void setHasPrescription(Boolean hasPrescription) {
		this.hasPrescription = hasPrescription;
	}

	public Boolean getHasSickNote() {
		return hasSickNote;
	}

	public void setHasSickNote(Boolean hasSickNote) {
		this.hasSickNote = hasSickNote;
	}

	public String getUrlReturn() {
		return urlReturn;
	}

	public void setUrlReturn(String urlReturn) {
		this.urlReturn = urlReturn;
	}

	public Boolean getHasExamRequest() {
		return hasExamRequest;
	}

	public void setHasExamRequest(Boolean hasExamRequest) {
		this.hasExamRequest = hasExamRequest;
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

	public VideoCallFinishReasonEnum getFinishReason() {
		return finishReason;
	}

	public void setFinishReason(VideoCallFinishReasonEnum finishReason) {
		this.finishReason = finishReason;
	}

	public ReturnAttendanceReasonEnum getReturnReason() {
		return returnReason;
	}

	public void setReturnReason(ReturnAttendanceReasonEnum returnReason) {
		this.returnReason = returnReason;
	}

	public String getFinishOtherReasonDescription() {
		return finishOtherReasonDescription;
	}

	public void setFinishOtherReasonDescription(String finishOtherReasonDescription) {
		this.finishOtherReasonDescription = finishOtherReasonDescription;
	}

	public Long getVacancyId() {
		return vacancyId;
	}

	public void setVacancyId(Long vacancyId) {
		this.vacancyId = vacancyId;
	}

	public AttendancePaymentDetails getPaymentDetails() {
		return paymentDetails;
	}

	public void setPaymentDetails(AttendancePaymentDetails paymentDetails) {
		this.paymentDetails = paymentDetails;
	}

	public Set<PaymentTransaction> getPaymentTransactions() {
		return paymentTransactions;
	}

	public Set<Ticket> getTickets() {
		return tickets;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public void generateHash() {
		String professionalStrToHash = (this.professional == null) ? "" : this.professional.getId().toString();

		this.hash = "" + professionalStrToHash + "_" + this.insured.getId() + "_" + this.specialty.getId() + "_"
				+ this.type + "_" + Utils.format(this.createdAt, "yyyyMMddHHmmssSS");
	}

	public Set<Attachment> getAttachments() {
		return attachments;
	}

	public void setAttachments(Set<Attachment> attachments) {
		this.attachments = attachments;
	}

	public String getInviteCode() {
		return inviteCode;
	}

	public void setInviteCode(String inviteCode) {
		this.inviteCode = inviteCode;
	}

	public Set<Guest> getGuests() {
		return guests;
	}

	public void setGuests(Set<Guest> guests) {
		this.guests = guests;
	}

}
