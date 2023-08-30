package br.com.maidahealth.telemedapi.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.maidahealth.telemedapi.models.Client;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.SpecialtyAppointmentValue;

@Repository
public interface SpecialtyAppointmentValueRepository extends JpaRepository<SpecialtyAppointmentValue, Long> {	
	List<SpecialtyAppointmentValue> findBySpecialtyAndClientOrderByIdDesc(Specialty specialty, Client client);
}
