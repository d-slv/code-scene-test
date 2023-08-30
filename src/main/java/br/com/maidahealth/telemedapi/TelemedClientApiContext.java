package br.com.maidahealth.telemedapi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.maidahealth.telemedapi.models.ApiConfiguration;
import br.com.maidahealth.telemedapi.models.SensediaConfiguration;
import br.com.maidahealth.telemedapi.repositories.ApiConfigurationRepository;
import br.com.maidahealth.telemedapi.repositories.SensediaConfigurationRepository;
import br.com.maidahealth.telemedapi.utils.Utils;

@Component
public class TelemedClientApiContext {
	
	private ApiConfiguration apiConfiguration;
	
	private SensediaConfiguration sensediaConfiguration;
	
	@Autowired
	private ApiConfigurationRepository apiConfigurationRepository;
	
	@Autowired
	private SensediaConfigurationRepository sensediaConfigurationRepository;
	
	public void load() {
		loadApiConfiguration();
	}

	private void loadApiConfiguration() {
		List<ApiConfiguration> configs = apiConfigurationRepository.findAll();
		List<SensediaConfiguration> sensediaConfigs = sensediaConfigurationRepository.findAll();
		if(configs.size() > 0) {
			apiConfiguration = configs.get(0);			
		}
		else {
			apiConfiguration = new ApiConfiguration();
			apiConfiguration.setJwtSecret(Utils.generateRandomString(200));
			apiConfiguration.setJwtExpirationInMinutes(120);
			
			apiConfigurationRepository.save(apiConfiguration);
		}
		
		if(sensediaConfigs.size() > 0) {
			sensediaConfiguration = sensediaConfigs.get(0);
		}else{
			sensediaConfiguration = new SensediaConfiguration();
			
			sensediaConfigurationRepository.save(sensediaConfiguration);
		}
		
		
		Utils.setContext(this);
	}

	public ApiConfiguration getApiConfiguration() {
		return apiConfiguration;
	}

	public SensediaConfiguration getSensediaConfiguration() {
		return sensediaConfiguration;
	}
	
}
