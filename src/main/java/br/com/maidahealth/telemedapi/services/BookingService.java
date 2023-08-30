package br.com.maidahealth.telemedapi.services;

import java.util.Date;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.controllers.UserController;
import br.com.maidahealth.telemedapi.dto.BookingDto;
import br.com.maidahealth.telemedapi.dto.BookingErrorDto;
import br.com.maidahealth.telemedapi.dto.BookingResponseDto;
import br.com.maidahealth.telemedapi.form.ClientAddressForm;
import br.com.maidahealth.telemedapi.form.ClientBookingAttendanceForm;
import br.com.maidahealth.telemedapi.form.ClientInsuredForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.models.Client;
import br.com.maidahealth.telemedapi.models.ClientSpecialties;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.ProfessionalSpecialties;
import br.com.maidahealth.telemedapi.models.TasyIntegration;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.ClientRepository;
import br.com.maidahealth.telemedapi.repositories.ClientSpecialtiesRepository;
import br.com.maidahealth.telemedapi.repositories.InsuredRepository;
import br.com.maidahealth.telemedapi.repositories.ProfessionalRepository;
import br.com.maidahealth.telemedapi.repositories.ProfessionalsSpecialtiesRepository;
import br.com.maidahealth.telemedapi.repositories.TasyIntegrationRepository;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class BookingService {

	@Autowired
	private BookingAttendanceService bookingAttendanceService;

	@Autowired
	private BookingInsuredService insuredService;

	@Autowired
	private ProfessionalRepository professionalRepository;

	@Autowired
	private InsuredRepository insuredRepository;

	@Autowired
	private ClientRepository clientRepository;

	@Autowired
	private ClientSpecialtiesRepository clientSpecialtiesRepository;

	@Autowired
	private ProfessionalsSpecialtiesRepository professionalsSpecialtiesRepository;

	@Autowired
	private AttendanceRepository attendanceRepository;

	@Autowired
	private TasyIntegrationRepository tasyIntegrationRepository;

	@Autowired
	private TelemedClientApiContext context;

	private Logger log = LoggerFactory.getLogger(UserController.class);

	public ResponseEntity<Object> patientExistenceValidation(BookingDto bookingRequest) {
		Optional<Insured> patient = insuredRepository
				.findByHealthInsuranceNumber(bookingRequest.getPatient().getHealthInsuranceNumber());
		try {
			if (!patient.isPresent()) {
				try {
					ClientInsuredForm insuredForm = new ClientInsuredForm();
					insuredForm.setName(bookingRequest.getPatient().getName());
					insuredForm.setCpf(bookingRequest.getPatient().getCpf());
					insuredForm.setHealthInsuranceNumber(bookingRequest.getPatient().getHealthInsuranceNumber());
					insuredForm.setEmail(bookingRequest.getPatient().getEmail());
					insuredForm.setBirthdate(bookingRequest.getPatient().getBirthdate());
					insuredForm.setPhoneNumber(bookingRequest.getPatient().getLastPhoneNumber());
					insuredForm.setGender(bookingRequest.getPatient().getGender());
					insuredForm.setRg(bookingRequest.getPatient().getRegistrationNumber().toString());
					insuredForm.setRgIssuer(bookingRequest.getPatient().getRegistrationNumberIssuer());
					insuredForm.setHealthInsuranceIdentificator(bookingRequest.getClientId());
					ClientAddressForm address = new ClientAddressForm();
					address.setIbgeCode(bookingRequest.getPatient().getAddress().getIbgeCode());
					address.setStreet(bookingRequest.getPatient().getAddress().getStreet());
					address.setCity(bookingRequest.getPatient().getAddress().getCity());
					address.setNeighborhood(bookingRequest.getPatient().getAddress().getNeighborhood());
					address.setNumber(bookingRequest.getPatient().getAddress().getNumber());
					address.setPublicPlace(bookingRequest.getPatient().getAddress().getPublicPlace());
					address.setState(bookingRequest.getPatient().getAddress().getState());
					address.setZipCode(bookingRequest.getPatient().getAddress().getZipCode());
					insuredForm.setAddress(address);
					Object resp = insuredService.saveHolder(insuredForm);
					if (!(resp instanceof Insured)) {
						insertErrorOnTasyIntegration(bookingRequest,
								"Erro ao tentar cadastrar o paciente no server: "
										+ bookingRequest.getPatient().getHealthInsuranceNumber()
										+ "Entre em contado pelos canais de atendimento.");
						BookingErrorDto response = new BookingErrorDto(
								"Erro ao tentar cadastrar o paciente no server: "
										+ bookingRequest.getPatient().getHealthInsuranceNumber(),
								"Entre em contado pelos canais de atendimento.");
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
					}
				} catch (Exception e) {
					insertErrorOnTasyIntegration(bookingRequest, "Erro ao tentar cadastrar o paciente: "
							+ e.getMessage() + " Entre em contado pelos canais de atendimento.");
					BookingErrorDto response = new BookingErrorDto(
							"Erro ao tentar cadastrar o paciente: " + e.getMessage(),
							"Entre em contado pelos canais de atendimento.");

					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
				}
				patient = insuredRepository
						.findByHealthInsuranceNumber(bookingRequest.getPatient().getHealthInsuranceNumber());

				if (patient.isEmpty()) {

					insertErrorOnTasyIntegration(bookingRequest,
							"Erro ao tentar cadastrar o paciente no server: "
									+ bookingRequest.getPatient().getHealthInsuranceNumber()
									+ "Entre em contado pelos canais de atendimento.");

					BookingErrorDto response = new BookingErrorDto(
							"Erro ao tentar cadastrar o paciente no server: "
									+ bookingRequest.getPatient().getHealthInsuranceNumber(),
							"Entre em contado pelos canais de atendimento.");
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
				}
			}
		} catch (Exception e) {

			insertErrorOnTasyIntegration(bookingRequest, "Erro ao tentar recuperar o paciente: " + e.getMessage());

			BookingErrorDto response = new BookingErrorDto("Erro ao tentar recuperar o paciente: " + e.getMessage(),
					"Entre em contado pelos canais de atendimento.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
		return healthAttendanceIdValidation(bookingRequest, patient.get());
	}

	public ResponseEntity<Object> healthAttendanceIdValidation(BookingDto bookingRequest, Insured patient) {
		Optional<Attendance> healthAttendance = attendanceRepository
				.findByHealthAttendanceIdAndHealthInsuranceIdentificator(bookingRequest.getHealthAttendanceId(),
						bookingRequest.getClientId());
		try {
			if (healthAttendance.isPresent()) {

				insertErrorOnTasyIntegration(bookingRequest,
						"Já existe agendamento para esta consulta: " + bookingRequest.getHealthAttendanceId());

				BookingErrorDto response = new BookingErrorDto(
						"Já existe agendamento para esta consulta: " + bookingRequest.getHealthAttendanceId(),
						"Entre em contado pelos canais de atendimento.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}
		} catch (Exception e) {

			insertErrorOnTasyIntegration(bookingRequest, "Erro ao tentar recuperar a consulta: " + e.getMessage());

			BookingErrorDto response = new BookingErrorDto("Erro ao tentar recuperar a consulta: " + e.getMessage(),
					"Entre em contado pelos canais de atendimento.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
		return professionalClientValidation(bookingRequest, patient);
	}

	public ResponseEntity<Object> professionalClientValidation(BookingDto bookingRequest, Insured patient) {
		Optional<Client> client = clientRepository.findByAccessToken(bookingRequest.getClientId());
		try {
			if (!client.isPresent()) {

				insertErrorOnTasyIntegration(bookingRequest,
						"Erro ao tentar recuperar a consulta: " + "Operadora não encontrada no teleatendimento.");

				BookingErrorDto response = new BookingErrorDto("Operadora não encontrada no teleatendimento.",
						"Entre em contado pelos canais de atendimento.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}
		} catch (Exception e) {

			insertErrorOnTasyIntegration(bookingRequest, "Erro ao tentar recuperar operadora: " + e.getMessage());

			BookingErrorDto response = new BookingErrorDto("Erro ao tentar recuperar operadora: " + e.getMessage(),
					"Entre em contado pelos canais de atendimento.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
		log.info("Professional Id: " + bookingRequest.getProfessionalId());
		Optional<Professional> professional = professionalRepository
				.findByCpf(String.format("%011d", Long.parseLong(bookingRequest.getProfessionalId())));
		try {
			if (!professional.isPresent()) {
				insertErrorOnTasyIntegration(bookingRequest, "Profissional não encontrado no teleatendimento.");

				BookingErrorDto response = new BookingErrorDto("Profissional não encontrado no teleatendimento.",
						"Entre em contado pelos canais de atendimento.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}
		} catch (Exception e) {
			insertErrorOnTasyIntegration(bookingRequest, "Erro ao tentar recuperar profissional: " + e.getMessage());

			BookingErrorDto response = new BookingErrorDto("Erro ao tentar recuperar profissional: " + e.getMessage(),
					"Entre em contado pelos canais de atendimento.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
		return specialtyClientValidation(bookingRequest, client.get(), professional.get(), patient);
	}

	public ResponseEntity<Object> specialtyClientValidation(BookingDto bookingRequest, Client client,
			Professional professionals, Insured patient) {
		Optional<ClientSpecialties> clientSpecialties = clientSpecialtiesRepository
				.findByClientSpecialtyIdAndClientId(bookingRequest.getSpecialtyId(), client.getId());
		try {
			if (!clientSpecialties.isPresent()) {
				insertErrorOnTasyIntegration(bookingRequest, "Especialidade não encontrada nesta operadora.");
				BookingErrorDto response = new BookingErrorDto("Especialidade não encontrada nesta operadora.",
						"Entre em contado pelos canais de atendimento.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}
		} catch (Exception e) {

			insertErrorOnTasyIntegration(bookingRequest,
					"Erro ao tentar recuperar especialidade por operadora: " + e.getMessage());

			BookingErrorDto response = new BookingErrorDto(
					"Erro ao tentar recuperar especialidade por operadora: " + e.getMessage(),
					"Entre em contado pelos canais de atendimento.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
		Optional<ProfessionalSpecialties> professionalSpecialties = professionalsSpecialtiesRepository
				.findBySpecialtiesIdAndProfessionalsId(clientSpecialties.get().getSpecialty().getId(),
						professionals.getId());
		try {
			if (!professionalSpecialties.isPresent()) {
				insertErrorOnTasyIntegration(bookingRequest, "Especialidade não encontrada para este profissional.");

				BookingErrorDto response = new BookingErrorDto("Especialidade não encontrada para este profissional.",
						"Entre em contado pelos canais de atendimento.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}
		} catch (Exception e) {

			insertErrorOnTasyIntegration(bookingRequest,
					"Erro ao tentar recuperar especialidade por profissional: " + e.getMessage());

			BookingErrorDto response = new BookingErrorDto(
					"Erro ao tentar recuperar especialidade por profissional: " + e.getMessage(),
					"Entre em contado pelos canais de atendimento.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
		return createAttendance(bookingRequest, professionals, patient, clientSpecialties.get());
	}

	public ResponseEntity<Object> createAttendance(BookingDto bookingRequest, Professional professional,
			Insured patient, ClientSpecialties clientSpecialties) {
		log.info("##### createAttendance #####");

		ClientBookingAttendanceForm form = new ClientBookingAttendanceForm();
		form.setPatientId(patient.getId());
		form.setHour(bookingRequest.getHour());
		form.setPhoneNumber(bookingRequest.getPatient().getLastPhoneNumber());
		form.setProfessionalId(professional.getId());
		form.setSchedulingDate(Utils.parseReverse(bookingRequest.getSchedulingDate()));
		form.setSpecialtyId(clientSpecialties.getSpecialty().getId());
		form.setExternalId(clientSpecialties.getSpecialty().getExternalId());
		AttendanceType type = AttendanceType.URGENCY.equals(bookingRequest.getType()) ? AttendanceType.URGENCY
				: AttendanceType.ELECTIVE;
		form.setType(type);
		form.setHealthInsuranceIdentificator(bookingRequest.getClientId());
		form.setHealthAttendanceId(bookingRequest.getHealthAttendanceId());
		try {
			log.info(">>> Iniciando processo de cadastro no server");
			Attendance att = bookingAttendanceService.create(form, patient);
			BookingResponseDto responseOk = new BookingResponseDto();
			try {
				String publicToken = insuredService.generateInsuredToken(att.getInsured());
				String url = context.getApiConfiguration().getFrontWebUrl() + "/auth/" + publicToken + "?attendanceId="
						+ att.getId() + "&type=" + att.getType().name();
				att.getInsured().setPublicToken(publicToken);
				responseOk.setAttendanceRoomUrl(url);
			} catch (Exception e) {
				insertErrorOnTasyIntegration(bookingRequest, "Erro ao gerar o public token: " + e.getMessage());

				BookingErrorDto responseError = new BookingErrorDto("Erro ao gerar o public token: " + e.getMessage(),
						"Entre em contado pelos canais de atendimento.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseError);
			}
			responseOk.setAppointment(att.getId().toString());
			responseOk.setHealthAttendanceId(att.getHealthAttendanceId().toString());
			responseOk.setSpecialtyId(att.getSpecialty().getId().toString());
			responseOk.setPatientId(att.getInsured().getId().toString());
			responseOk.setStatus(att.getStatus().getDescription());
			responseOk.setPublicId(att.getDocwayId());
			return ResponseEntity.status(HttpStatus.CREATED).body(responseOk);
		} catch (Exception e) {
			insertErrorOnTasyIntegration(bookingRequest, "Entre em contado pelos canais de atendimento." + e.getMessage());

			BookingErrorDto responseError = new BookingErrorDto(e.getMessage(),
					"Entre em contado pelos canais de atendimento.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseError);
		}
	}

	private void insertErrorOnTasyIntegration(BookingDto bookingRequest, String error) {
		TasyIntegration tasyIntegration = new TasyIntegration();
		tasyIntegration.setBookingRequest(bookingRequest.toString());

		tasyIntegration.setClientId(bookingRequest.getClientId());
		tasyIntegration.setType(bookingRequest.getType().toString());
		tasyIntegration.setSpecialtyId(bookingRequest.getSpecialtyId());
		tasyIntegration.setHealthAttendanceId(bookingRequest.getHealthAttendanceId());
		tasyIntegration.setProfessionalId(bookingRequest.getProfessionalId());
		tasyIntegration.setSchedulingDate(bookingRequest.getSchedulingDate());
		tasyIntegration.setHour(bookingRequest.getHour());
		tasyIntegration.setCreatedAt(new Date());

		tasyIntegration.setError(error);
		tasyIntegrationRepository.save(tasyIntegration);
	}
}