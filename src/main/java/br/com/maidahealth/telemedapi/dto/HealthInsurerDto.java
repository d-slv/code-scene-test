package br.com.maidahealth.telemedapi.dto;

import java.time.LocalTime;
import java.util.Optional;

import br.com.maidahealth.telemedapi.enums.AdminLoginTypeEnum;
import br.com.maidahealth.telemedapi.enums.LoginTypeEnum;
import br.com.maidahealth.telemedapi.enums.PaymentType;
import br.com.maidahealth.telemedapi.models.HealthInsurer;
import br.com.maidahealth.telemedapi.models.PaymentConfig;

public class HealthInsurerDto {

	private String insuredUrl;

	private String phoneNumber;

	private String cellPhoneNumber;

	private String url;

	private String Email;

	private String suportPhone;

	private Boolean makeMedicalScreening;

	private Boolean makeUrgencyCare;

	private Boolean makeElectiveCare;

	private Boolean readOnly;

	private LoginTypeEnum loginType;

	private LocalTime startUrgencyTime;

	private LocalTime finishUrgencyTime;
	
	private Boolean enabledPatientFeedback;

	private PaymentType paymentType;
	
	private Boolean allowInsuredSignUp;

	private PaymentConfig paymentConfig;

	private AdminLoginTypeEnum adminLoginType;

	private Boolean needsValidateInsuredOnClient;
	
	private Boolean canGenerateProfessionalAvailabilitySchedules;

	public HealthInsurerDto() {}


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

	public LocalTime getStartUrgencyTime() {
		return startUrgencyTime;
	}


	public void setStartUrgencyTime(LocalTime startUrgencyTime) {
		this.startUrgencyTime = startUrgencyTime;
	}


	public LocalTime getFinishUrgencyTime() {
		return finishUrgencyTime;
	}

	public Boolean getReadOnly() {
		return readOnly;
	}


	public void setReadOnly(Boolean readOnly) {
		this.readOnly = readOnly;
	}


	public void setFinishUrgencyTime(LocalTime finishUrgencyTime) {
		this.finishUrgencyTime = finishUrgencyTime;
	}

	public Boolean getEnabledPatientFeedback() {
		return enabledPatientFeedback;
	}

	public void setEnabledPatientFeedback(Boolean enabledPatientFeedback) {
		this.enabledPatientFeedback = enabledPatientFeedback;
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

	public AdminLoginTypeEnum getAdminLoginType() {
		return adminLoginType;
	}

	public void setAdminLoginType(AdminLoginTypeEnum adminLoginType) {
		this.adminLoginType = adminLoginType;
	}

	public static HealthInsurerDto convert(HealthInsurer healthInsurer) {
		if(healthInsurer == null)
			return null;

		HealthInsurerDto healthInsurerDto = new HealthInsurerDto();
		healthInsurerDto.setCellPhoneNumber(healthInsurer.getCellPhoneNumber());
		healthInsurerDto.setEmail(healthInsurer.getEmail());
		healthInsurerDto.setPhoneNumber(healthInsurer.getPhoneNumber());
		healthInsurerDto.setSuportPhone(healthInsurer.getSuportPhone());
		healthInsurerDto.setUrl(healthInsurer.getUrl());
		healthInsurerDto.setInsuredUrl(healthInsurer.getInsuredUrl());
		healthInsurerDto.setMakeMedicalScreening(healthInsurer.getMakeMedicalScreening());
		healthInsurerDto.setMakeUrgencyCare(healthInsurer.getMakeUrgencyCare());
		healthInsurerDto.setMakeElectiveCare(healthInsurer.getMakeElectiveCare());
		healthInsurerDto.setLoginType(healthInsurer.getLoginType());
		healthInsurerDto.setStartUrgencyTime(healthInsurer.getStartUrgencyTime());
		healthInsurerDto.setFinishUrgencyTime(healthInsurer.getFinishUrgencyTime());
		healthInsurerDto.setReadOnly((healthInsurer.getReadOnly() == null) ? false : healthInsurer.getReadOnly());
		healthInsurerDto.setEnabledPatientFeedback(healthInsurer.getEnabledPatientFeedback());
		healthInsurerDto.setPaymentType(healthInsurer.getPaymentType());
		healthInsurerDto.setAllowInsuredSignUp(healthInsurer.getAllowInsuredSignUp());
		healthInsurerDto.setPaymentConfig(healthInsurer.getPaymentConfig());
		healthInsurerDto.setAdminLoginType(healthInsurer.getAdminLoginTypeEnum());
		healthInsurerDto.setNeedsValidateInsuredOnClient(healthInsurer.getNeedsValidateInsuredOnClient());
		healthInsurerDto.setCanGenerateProfessionalAvailabilitySchedules(healthInsurer.getCanGenerateProfessionalAvailabilitySchedules());
		
		return healthInsurerDto;
	}

	public void setPaymentConfig(PaymentConfig paymentConfig) {
		this.paymentConfig = paymentConfig;
	}

	public Integer getMaxInstallments() {
		return Optional.ofNullable(this.paymentConfig).map(PaymentConfig::getMaxInstallments).orElse(null);
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


	public void setCanGenerateProfessionalAvailabilitySchedules(Boolean canGenerateProfessionalAvailabilitySchedules) {
		this.canGenerateProfessionalAvailabilitySchedules = canGenerateProfessionalAvailabilitySchedules;
	}

}
