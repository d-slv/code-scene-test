package br.com.maidahealth.telemedapi.models;

import java.time.LocalTime;

import javax.persistence.*;

import br.com.maidahealth.telemedapi.enums.AdminLoginTypeEnum;
import br.com.maidahealth.telemedapi.enums.LoginTypeEnum;
import br.com.maidahealth.telemedapi.enums.PaymentType;

@Entity
public class HealthInsurer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String insuredUrl;

	private String phoneNumber;

	private String cellPhoneNumber;

	private String url;

	private String Email;

	private String suportPhone;

	private Boolean makeMedicalScreening;

	private Boolean makeUrgencyCare;

	private Boolean makeElectiveCare;
	
	private LocalTime startUrgencyTime;
	
	private LocalTime finishUrgencyTime;

	private String tokenToCreateInsured;

	@Enumerated(EnumType.STRING)
	private LoginTypeEnum loginType;
	
	private Integer deadlineForReturnAttendance;
	
	private Integer minimumTimeForScheduling;

	private Boolean automaticEmailEnabled;

	private Boolean readOnly;

	private Boolean allowInsuredSignUp;

	@Column(columnDefinition = "BOOLEAN DEFAULT TRUE")
	private Boolean enabledPatientFeedback;
	
	@Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
	private Boolean urgencyQueueOnlyByIntegration;

	@Enumerated(EnumType.STRING)
	private PaymentType paymentType;

	@OneToOne(cascade = CascadeType.ALL)
	private PaymentConfig paymentConfig;

	@Enumerated(EnumType.STRING)
	private AdminLoginTypeEnum adminLoginTypeEnum;

	@Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
	private Boolean generateDefaultSchedules = Boolean.FALSE;

	@Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
	private Boolean needsValidateInsuredOnClient = Boolean.FALSE;
	
	@Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
	private Boolean canGenerateProfessionalAvailabilitySchedules = Boolean.FALSE;

	@Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
	private Boolean confirmValidateInsuredOnClient = Boolean.FALSE;

	public String getInsuredUrl() {
		return insuredUrl;
	}

	public void setInsuredUrl(String insuredUrl) {
		this.insuredUrl = insuredUrl;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getCellPhoneNumber() {
		return cellPhoneNumber;
	}

	public void setCellPhoneNumber(String cellPhoneNumber) {
		this.cellPhoneNumber = cellPhoneNumber;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public String getSuportPhone() {
		return suportPhone;
	}

	public void setSuportPhone(String suportPhone) {
		this.suportPhone = suportPhone;
	}

	public Boolean getMakeMedicalScreening() {
		return makeMedicalScreening;
	}

	public void setMakeMedicalScreening(Boolean makeMedicalScreening) {
		this.makeMedicalScreening = makeMedicalScreening;
	}

	public Boolean getMakeUrgencyCare() {
		return makeUrgencyCare;
	}

	public void setMakeUrgencyCare(Boolean makeUrgencyCare) {
		this.makeUrgencyCare = makeUrgencyCare;
	}

	public Boolean getMakeElectiveCare() {
		return makeElectiveCare;
	}

	public void setMakeElectiveCare(Boolean makeElectiveCare) {
		this.makeElectiveCare = makeElectiveCare;
	}

	public LoginTypeEnum getLoginType() {
		return loginType;
	}

	public void setLoginType(LoginTypeEnum loginType) {
		this.loginType = loginType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalTime getStartUrgencyTime() {
		return startUrgencyTime;
	}

	public void setStartUrgencyTime(LocalTime startUrgencyTime) {
		this.startUrgencyTime = startUrgencyTime;
	}

	public LocalTime getFinishUrgencyTime() {
		return finishUrgencyTime;
	}

	public void setFinishUrgencyTime(LocalTime finishUrgencyTime) {
		this.finishUrgencyTime = finishUrgencyTime;
	}

	public Integer getDeadlineForReturnAttendance() {
		return deadlineForReturnAttendance;
	}

	public void setDeadlineForReturnAttendance(Integer deadlineForReturnAttendance) {
		this.deadlineForReturnAttendance = deadlineForReturnAttendance;
	}

	public Integer getMinimumTimeForScheduling() {
		return minimumTimeForScheduling;
	}

	public void setMinimumTimeForScheduling(Integer minimumTimeForScheduling) {
		this.minimumTimeForScheduling = minimumTimeForScheduling;
	}

	public synchronized String getTokenToCreateInsured() {
		return tokenToCreateInsured;
	}

	public synchronized void setTokenToCreateInsured(String tokenToCreateInsured) {
		this.tokenToCreateInsured = tokenToCreateInsured;
	}

	public Boolean getAutomaticEmailEnabled() {
		return automaticEmailEnabled;
	}

	public void setAutomaticEmailEnabled(Boolean automaticEmailEnabled) {
		this.automaticEmailEnabled = automaticEmailEnabled;
	}

	public Boolean getReadOnly() {
		return readOnly;
	}

	public void setReadOnly(Boolean readOnly) {
		this.readOnly = readOnly;
	}

	public Boolean getEnabledPatientFeedback() {
		return enabledPatientFeedback;
	}

	public void setEnabledPatientFeedback(Boolean enabledPatientFeedback) {
		this.enabledPatientFeedback = enabledPatientFeedback;
	}

	public Boolean getUrgencyQueueOnlyByIntegration() {
		return urgencyQueueOnlyByIntegration;
	}

	public void setUrgencyQueueOnlyByIntegration(Boolean urgencyQueueOnlyByIntegration) {
		this.urgencyQueueOnlyByIntegration = urgencyQueueOnlyByIntegration;
	}
	
	public PaymentType getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(PaymentType paymentType) {
		this.paymentType = paymentType;
	}

	public Boolean getAllowInsuredSignUp() {
		return allowInsuredSignUp;
	}

	public void setAllowInsuredSignUp(Boolean allowInsuredSignUp) {
		this.allowInsuredSignUp = allowInsuredSignUp;
	}

	public PaymentConfig getPaymentConfig() {
		return paymentConfig;
	}

	public void setPaymentConfig(PaymentConfig paymentConfig) {
		this.paymentConfig = paymentConfig;
	}

	public AdminLoginTypeEnum getAdminLoginTypeEnum() {
		return adminLoginTypeEnum;
	}

	public void setAdminLoginTypeEnum(AdminLoginTypeEnum adminLoginTypeEnum) {
		this.adminLoginTypeEnum = adminLoginTypeEnum;
	}
	
	public Boolean getGenerateDefaultSchedules() {
		return generateDefaultSchedules;
	}

	public void setGenerateDefaultSchedules(Boolean generateDefaultSchedules) {
		this.generateDefaultSchedules = generateDefaultSchedules;
	}

	public Boolean getNeedsValidateInsuredOnClient() {
		return needsValidateInsuredOnClient;
	}

	public void setNeedsValidateInsuredOnClient(Boolean needsValidateInsuredOnClient) {
		this.needsValidateInsuredOnClient = needsValidateInsuredOnClient;
	}

	public Boolean getCanGenerateProfessionalAvailabilitySchedules() {
		return canGenerateProfessionalAvailabilitySchedules;
	}

	public void setCanGenerateProfessionalAvailabilitySchedules(Boolean generateProfessionalAvailabilitySchedules) {
		this.canGenerateProfessionalAvailabilitySchedules = generateProfessionalAvailabilitySchedules;
	}

	public Boolean getConfirmValidateInsuredOnClient() {
		return confirmValidateInsuredOnClient;
	}

	public void setConfirmValidateInsuredOnClient(Boolean confirmValidateInsuredOnClient) {
		this.confirmValidateInsuredOnClient = confirmValidateInsuredOnClient;
	}	

}
