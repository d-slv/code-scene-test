package br.com.maidahealth.telemedapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.maidahealth.telemedapi.models.Device;
import br.com.maidahealth.telemedapi.models.User;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {

	Optional<Device> findByDeviceId(String deviceId);
	
	Long deleteByDeviceIdAndUser(String deviceId, User user);
}
