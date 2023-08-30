package br.com.maidahealth.telemedapi.services;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.form.DeviceForm;
import br.com.maidahealth.telemedapi.models.Device;
import br.com.maidahealth.telemedapi.repositories.DeviceRepository;

@Service
@Transactional
public class DeviceService {

	@Autowired
	private DeviceRepository repository;
	
	@Autowired
	private AuthenticationService authenticationService;
	
	public void create(@Valid DeviceForm deviceForm) {
		
		if(repository.findByDeviceId(deviceForm.getDeviceId()).isPresent())
			return;
		
		Device d = new Device();
		d.setDeviceId(deviceForm.getDeviceId());
		d.setUser(authenticationService.currentUser());
		
		repository.save(d);
	}

	public void deleteDevice(String deviceId) {
		repository.deleteByDeviceIdAndUser(deviceId, authenticationService.currentUser());
	}

}
