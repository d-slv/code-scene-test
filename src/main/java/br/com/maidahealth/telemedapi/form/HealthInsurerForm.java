package br.com.maidahealth.telemedapi.form;

import java.time.LocalTime;

import br.com.maidahealth.telemedapi.enums.AdminLoginTypeEnum;
import br.com.maidahealth.telemedapi.enums.LoginTypeEnum;
import br.com.maidahealth.telemedapi.enums.PaymentType;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;

public class HealthInsurerForm {

	private String email;

	private Boolean automaticEmailEnabled;

	private String cellPhoneNumber;

	private Integer deadlineForReturnAttendance;   

	private Boolean enabledPatientFeedback;

	private LocalTime finishUrgencyTime;

	private String insuredUrl;

	private String loginType;

	private Boolean makeElectiveCare;

	private Boolean makeMedicalScreening;

	private Boolean makeUrgencyCare;

	private Integer minimumTimeForScheduling;

	private String phoneNumber;

	private Boolean readOnly;

	private LocalTime startUrgencyTime;

	private String suportPhone;

	private String tokenToCreateInsured;

	private Boolean urgencyQueueOnlyByIntegration;

	private String url;

	private String adminLoginTypeEnum;

	private Boolean allowInsuredSignUp;

	private String paymentType;

	private Boolean generateDefaultSchedules;

	private Boolean needsValidateInsuredOnClient;
	
	private Integer jwtExpirationInMinutes;

	public LoginTypeEnum getLoginTypeEnum() {
		LoginTypeEnum[] values = LoginTypeEnum.values();
		for (LoginTypeEnum loginType : values) {
			if(this.loginType.toUpperCase().equals(loginType.toString())) {
				return loginType;
			}
		}
		throw new InvalidException("LoginTypeEnum Inválido");
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getAutomaticEmailEnabled() {
		return automaticEmailEnabled;
	}

	public void setAutomaticEmailEnabled(Boolean automaticEmailEnabled) {
		this.automaticEmailEnabled = automaticEmailEnabled;
	}

	public String getCellPhoneNumber() {
		return cellPhoneNumber;
	}

	public void setCellPhoneNumber(String cellPhoneNumber) {
		this.cellPhoneNumber = cellPhoneNumber;
	}

	public Integer getDeadlineForReturnAttendance() {
		return deadlineForReturnAttendance;
	}

	public void setDeadlineForReturnAttendance(Integer deadlineForReturnAttendance) {
		this.deadlineForReturnAttendance = deadlineForReturnAttendance;
	}

	public Boolean getEnabledPatientFeedback() {
		return enabledPatientFeedback;
	}

	public void setEnabledPatientFeedback(Boolean enabledPatientFeedback) {
		this.enabledPatientFeedback = enabledPatientFeedback;
	}

	public LocalTime getFinishUrgencyTime() {
		return finishUrgencyTime;
	}

	public void setFinishUrgencyTime(LocalTime finishUrgencyTime) {
		this.finishUrgencyTime = finishUrgencyTime;
	}

	public String getInsuredUrl() {
		return insuredUrl;
	}

	public void setInsuredUrl(String insuredUrl) {
		this.insuredUrl = insuredUrl;
	}

	public String getLoginType() {
		return loginType;
	}

	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}

	public Boolean getMakeElectiveCare() {
		return makeElectiveCare;
	}

	public void setMakeElectiveCare(Boolean makeElectiveCare) {
		this.makeElectiveCare = makeElectiveCare;
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

	public Integer getMinimumTimeForScheduling() {
		return minimumTimeForScheduling;
	}

	public void setMinimumTimeForScheduling(Integer minimumTimeForScheduling) {
		this.minimumTimeForScheduling = minimumTimeForScheduling;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Boolean getReadOnly() {
		return readOnly;
	}

	public void setReadOnly(Boolean readOnly) {
		this.readOnly = readOnly;
	}

	public LocalTime getStartUrgencyTime() {
		return startUrgencyTime;
	}

	public void setStartUrgencyTime(LocalTime startUrgencyTime) {
		this.startUrgencyTime = startUrgencyTime;
	}

	public String getSuportPhone() {
		return suportPhone;
	}

	public void setSuportPhone(String suportPhone) {
		this.suportPhone = suportPhone;
	}

	public String getTokenToCreateInsured() {
		return tokenToCreateInsured;
	}

	public void setTokenToCreateInsured(String tokenToCreateInsured) {
		this.tokenToCreateInsured = tokenToCreateInsured;
	}

	public Boolean getUrgencyQueueOnlyByIntegration() {
		return urgencyQueueOnlyByIntegration;
	}

	public void setUrgencyQueueOnlyByIntegration(Boolean urgencyQueueOnlyByIntegration) {
		this.urgencyQueueOnlyByIntegration = urgencyQueueOnlyByIntegration;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getAdminLoginTypeEnum() {
		return adminLoginTypeEnum;
	}

	public void setAdminLoginTypeEnum(String adminLoginTypeEnum) {
		this.adminLoginTypeEnum = adminLoginTypeEnum;
	}

	public AdminLoginTypeEnum getAdminLoginType() {
		AdminLoginTypeEnum[] values = AdminLoginTypeEnum.values();
		for (AdminLoginTypeEnum adminLoginType : values) {
			if(this.adminLoginTypeEnum.toUpperCase().equals(adminLoginType.toString())) {
				return adminLoginType;
			}
		}
		throw new InvalidException("AdminLoginTypeEnum Inválido");
	}

	public Boolean getAllowInsuredSignUp() {
		return allowInsuredSignUp;
	}

	public void setAllowInsuredSignUp(Boolean allowInsuredSignUp) {
		this.allowInsuredSignUp = allowInsuredSignUp;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public PaymentType getPaymentTypeEnum() {
		PaymentType[] values = PaymentType.values();
		for (PaymentType paymentType : values) {
			if(this.paymentType.toUpperCase().equals(paymentType.toString())) {
				return paymentType;
			}
		}

		throw new InvalidException("PaymentType Inválido");
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

	public Integer getJwtExpirationInMinutes() {
		return jwtExpirationInMinutes;
	}

	public void setJwtExpirationInMinutes(Integer jwtExpirationInMinutes) {
		this.jwtExpirationInMinutes = jwtExpirationInMinutes;
	}
	
}
