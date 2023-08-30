package br.com.maidahealth.telemedapi.services;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.enums.LoginTypeEnum;
import br.com.maidahealth.telemedapi.form.HealthInsurerForm;
import br.com.maidahealth.telemedapi.models.ApiConfiguration;
import br.com.maidahealth.telemedapi.models.HealthInsurer;
import br.com.maidahealth.telemedapi.repositories.ApiConfigurationRepository;
import br.com.maidahealth.telemedapi.repositories.HealthInsurerRepository;

@Service
public class HealthInsurerService {
	
	@Autowired
	private HealthInsurerRepository repository;

	@Autowired
	private TelemedClientApiContext context;

	@Autowired
	private ApiConfigurationRepository apiConfigurationRepository;

	public HealthInsurer getHealthInsurer() {
		
		if(repository.count() == 0) {
			HealthInsurer healthInsurer = new HealthInsurer();
			healthInsurer.setCellPhoneNumber("+5586999999999");
			healthInsurer.setEmail("contato@ipmt.com");
			healthInsurer.setPhoneNumber("+558633333333");
			healthInsurer.setSuportPhone("+5586999999999");
			healthInsurer.setUrl("www.ipmt.com");
			healthInsurer.setInsuredUrl("https://portal.beneficiario.ipmt.com");
			healthInsurer.setMakeMedicalScreening(true);
			healthInsurer.setMakeUrgencyCare(true);
			healthInsurer.setMakeElectiveCare(false);
			healthInsurer.setLoginType(LoginTypeEnum.CPF_HEALTHINSURANCENUMBER_REGISTRATIONNUMBER_BIRTHDATE);
			healthInsurer.setStartUrgencyTime(LocalTime.of(8, 0, 0));
			healthInsurer.setFinishUrgencyTime(LocalTime.of(17, 0, 0));
			healthInsurer.setAutomaticEmailEnabled(true);
			
			repository.save(healthInsurer);
		}
		
		Optional<HealthInsurer> optionalHealthInsurer = repository.findTop1ByIdGreaterThan(0L);
		return optionalHealthInsurer.isPresent() ? optionalHealthInsurer.get() : null;
	}

	public HealthInsurer updateHealthInsurer(@Valid HealthInsurerForm form) {
		HealthInsurer healthInsurer = getHealthInsurer();
		
		if(form.getEmail() != null) 
			healthInsurer.setEmail(form.getEmail());
		
		if(form.getAutomaticEmailEnabled() != null) 
			healthInsurer.setAutomaticEmailEnabled(form.getAutomaticEmailEnabled());
		
		if(form.getCellPhoneNumber() != null) 
			healthInsurer.setCellPhoneNumber(form.getCellPhoneNumber());

		if(form.getDeadlineForReturnAttendance() != null) 
			healthInsurer.setDeadlineForReturnAttendance(form.getDeadlineForReturnAttendance());

		if(form.getEnabledPatientFeedback() != null) 
			healthInsurer.setEnabledPatientFeedback(form.getEnabledPatientFeedback());
		
		if(form.getFinishUrgencyTime() != null) 
			healthInsurer.setFinishUrgencyTime(form.getFinishUrgencyTime());
		
		if(form.getInsuredUrl() != null) 
			healthInsurer.setInsuredUrl(form.getInsuredUrl());
		
		if(form.getLoginType() != null) 
			healthInsurer.setLoginType(form.getLoginTypeEnum());
		
		if(form.getMakeElectiveCare() != null) 
			healthInsurer.setMakeElectiveCare(form.getMakeElectiveCare());
		
		if(form.getMakeMedicalScreening() != null) 
			healthInsurer.setMakeMedicalScreening(form.getMakeMedicalScreening());
		
		if(form.getMakeUrgencyCare() != null) 
			healthInsurer.setMakeUrgencyCare(form.getMakeUrgencyCare());
		
		if(form.getMinimumTimeForScheduling() != null) 
			healthInsurer.setMinimumTimeForScheduling(form.getMinimumTimeForScheduling());
		
		if(form.getPhoneNumber() != null) 
			healthInsurer.setPhoneNumber(form.getPhoneNumber());
		
		if(form.getReadOnly() != null) 
			healthInsurer.setReadOnly(form.getReadOnly());
		
		if(form.getStartUrgencyTime() != null) 
			healthInsurer.setStartUrgencyTime(form.getStartUrgencyTime());
		
		if(form.getSuportPhone() != null) 
			healthInsurer.setSuportPhone(form.getSuportPhone());
		
		if(form.getTokenToCreateInsured() != null) 
			healthInsurer.setTokenToCreateInsured(form.getTokenToCreateInsured());
		
		if(form.getUrgencyQueueOnlyByIntegration() != null) 
			healthInsurer.setUrgencyQueueOnlyByIntegration(form.getUrgencyQueueOnlyByIntegration());
		
		if(form.getUrl() != null) 
			healthInsurer.setUrl(form.getUrl());
		
		if(form.getAdminLoginTypeEnum() != null) 
			healthInsurer.setAdminLoginTypeEnum(form.getAdminLoginType());
		
		if(form.getAllowInsuredSignUp() != null) 
			healthInsurer.setAllowInsuredSignUp(form.getAllowInsuredSignUp());
		
		if(form.getPaymentType() != null) 
			healthInsurer.setPaymentType(form.getPaymentTypeEnum());
		
		if(form.getGenerateDefaultSchedules() != null) 
			healthInsurer.setGenerateDefaultSchedules(form.getGenerateDefaultSchedules());
		
		if(form.getNeedsValidateInsuredOnClient() != null) 
			healthInsurer.setNeedsValidateInsuredOnClient(form.getNeedsValidateInsuredOnClient());
		
		repository.save(healthInsurer);
		
		if(form.getJwtExpirationInMinutes() != null) {
			
			ApiConfiguration config = new ApiConfiguration();
			List<ApiConfiguration> apiConfigs = apiConfigurationRepository.findAll();
			if(apiConfigs.size() > 0) config = apiConfigs.get(0);
		
			config.setJwtExpirationInMinutes(form.getJwtExpirationInMinutes());
			apiConfigurationRepository.save(config);
			context.load();
		} 
		
		return healthInsurer;
	}
	
	public boolean canGenerateProfessionalAvailabilitySchedules(){
		return this.getHealthInsurer() != null && 
				(this.getHealthInsurer().getCanGenerateProfessionalAvailabilitySchedules() == true);
	}

}
