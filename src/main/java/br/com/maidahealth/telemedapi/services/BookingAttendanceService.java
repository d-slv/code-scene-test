package br.com.maidahealth.telemedapi.services;

import static br.com.maidahealth.telemedapi.models.AttendanceStatus.SCHEDULED;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.VIDEOCALL_IN_PROGRESS;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.WAITING_INSURED;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.WAITING_IN_QUEUE;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;
import java.util.UUID;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.VideoCallFinishReasonEnum;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.ClientBookingAttendanceForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.InsuredRepository;
import br.com.maidahealth.telemedapi.repositories.ProfessionalRepository;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class BookingAttendanceService {

	private static final Logger LOG = LoggerFactory.getLogger(AttendanceService.class);

	@Autowired
	private AttendanceRepository repository;

	@Autowired
	private SpecialtyService specialtyService = new SpecialtyService();

	@Autowired
	private InsuredRepository insuredRepository;

	@Autowired
	private TelemedServerService telemedServerService = new TelemedServerService();

	@Autowired
	private InsuredService insuredService;

	@Autowired
	private ProfessionalRepository professionalRepository;

	@Autowired
	private ProfessionalService professionalService = new ProfessionalService();

	@Autowired
	private TelemedClientApiContext context;

	@Autowired
	@Qualifier("cieloService")
	private PaymentService paymentService;

	@Autowired
	private MessagingService messagingService = new MessagingService();

	// private ApiService getApiService() {
	// 	return telemedServerService;
	// }

	private Attendance createAttendanceOnMaidaServer(Attendance newAttendance, String reason,
			String healthInsuranceIdentificator) {
		LOG.info(">>> createAttendanceOnMaidaServer <<<");
		try{
			telemedServerService.createAttendance(newAttendance, reason, healthInsuranceIdentificator);
			LOG.info(">>> Success <<<");
			LOG.info("----------------------------------------");
			return newAttendance;
		}catch(Exception e){
			LOG.info(" Except.: " + e.getMessage());
			LOG.info("========================================");
			throw new InvalidException(e.getMessage());
		}		
	}

	public Attendance saveElectiveForClientInsured(ClientBookingAttendanceForm form, Insured insured, Specialty specialty, String healthInsuranceIdentificator, Long healthAttendanceId) {
		LOG.info(">>> saveElectiveForClient <<<");			
		Date scheduledDate = Utils.formatDataWithHour(form.getSchedulingDate(), form.getHour(),
				TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		Optional<Attendance> optional = repository
				.findByInsuredIdAndProfessionalIdAndSpecialtyIdAndSchedulingDateAndStatus(form.getPatientId(),
						form.getProfessionalId(), form.getSpecialtyId(), scheduledDate, AttendanceStatus.SCHEDULED);
		if (optional.isPresent()) {
			LOG.info(" Atendimento já existe na base do client");
			LOG.info("----------------------------------------");
			return optional.get();
		}
		Attendance att = new Attendance();
		Optional<Professional> prof = professionalRepository.findById(form.getProfessionalId());
		if (!prof.isPresent()){
			LOG.info("Except.: Profissional não encontrado na base do client <<<");
			LOG.info("========================================");
			throw new InvalidException("Profissional inválido");
		}
		att.setInsured(insured);
		att.setProfessional(prof.get());
		att.setSpecialty(specialty);
		att.setSchedulingDate(scheduledDate);
		att.setType(AttendanceType.ELECTIVE);
		att.setStatus(SCHEDULED);
		att.setHealthInsuranceIdentificator(healthInsuranceIdentificator);
		att.setHealthAttendanceId(healthAttendanceId);
		try{				
			att = createAttendanceOnMaidaServer(att, "Agendamento de consulta eletiva", form.getHealthInsuranceIdentificator());
			repository.save(att);
			LOG.info(">>> Create attendance on maida success <<<");
			LOG.info("----------------------------------------");
			return att;
		}catch(Exception e){
			LOG.info("Except.: " + e.getMessage());
			LOG.info("========================================");
			throw new InvalidException(e.getMessage());
		}		
	}

	private boolean isActiveOnServerAPI(Attendance attendance) {
		List<AttendanceStatus> status = Arrays.asList(AttendanceStatus.VIDEOCALL_IN_PROGRESS,
				AttendanceStatus.WAITING_INSURED);

		if (status.contains(attendance.getStatus())) {
			Attendance attendanceOnServer = professionalService
					.getCurrentAttendance(attendance.getProfessional().getId());
			if (attendanceOnServer == null || !attendanceOnServer.getId().equals(attendance.getId()))
				return false;
		}

		return true;
	}

	public void syncWithServerAPI(Attendance attendance) {
		JsonNode serverAttendance = telemedServerService.getDocwayAttendance(attendance);

		String status = !serverAttendance.get("status").isNull() ? serverAttendance.get("status").asText() : null;
		String finishReason = !serverAttendance.get("finishReason").isNull()
				? serverAttendance.get("finishReason").asText()
				: null;
		String finishOtherReasonDescription = !serverAttendance.get("finishOtherReasonDescription").isNull()
				? serverAttendance.get("finishOtherReasonDescription").asText()
				: null;

		AttendanceStatus attStatus = AttendanceStatus.getStatusByName(status);
		if (attStatus != null
				&& (attStatus.equals(AttendanceStatus.FINISHED) || attStatus.equals(AttendanceStatus.CANCELED))) {
			attendance.setStatus(attStatus);
			attendance.setFinishReason(VideoCallFinishReasonEnum.getReasonByName(finishReason));
			attendance.setFinishOtherReasonDescription(finishOtherReasonDescription);

			if (attStatus.equals(AttendanceStatus.FINISHED)) {
				attendance.setFinishDate(new Date());
			} else {
				attendance.setCancellingDate(new Date());
				attendance.setCancellingReason(CancellingAttendanceReasonEnum.CANCELLATION_REQUESTED_BY_PROFESSIONAL);
			}

			repository.save(attendance);
		}
	}

	public void generateInviteCode(Attendance attendance) {
		MessageDigest salt;
		try {
			salt = MessageDigest.getInstance("SHA-256");
			salt.update(UUID.randomUUID().toString().getBytes("UTF-8"));
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			throw new InvalidException("Erro de Geração do Invite Code. Por favor, tente novamente.");
		}

		char[] hexArray = "0123456789ABCDEFGHIJKLMNOPQRSTUVXYWZ".toCharArray();
		byte[] bytes = salt.digest();
		char[] hexChars = new char[bytes.length * 2];
		for (int j = 0; j < bytes.length; j++) {
			int v = bytes[j] & 0xFF;
			hexChars[j * 2] = hexArray[v >>> 4];
			hexChars[j * 2 + 1] = hexArray[v & 0x0F];
		}
		attendance.setInviteCode(new String(hexChars));
	}

	private Attendance createAttendance(Insured insured, String chatbotId, AttendanceType attendanceType,
			AttendanceStatus status, String phoneNumber, Specialty specialty, Insured requesterInsured,
			boolean enabledMedia, String healthInsuranceIdentificator, Long healthInsuredId) {

		if (AttendanceType.URGENCY.equals(attendanceType)
				&& !specialtyService.availableForUrgency(null).contains(specialty)) {
			throw new InvalidException("Especialidade informada não está disponível para atendimentos de urgência");
		}

		if (!insuredService.isEligible(insured))
			throw new InvalidException("Segurado inelegível para novos atendimentos.");

		if (!insured.isAbleToCreateAttendance())
			throw new InvalidException("Paciente não apto para criar novos atendimentos");

		Attendance newAttendance = new Attendance();
		newAttendance.setType(attendanceType);
		newAttendance.setStatus(status);
		newAttendance.setChatbotId(chatbotId);

		newAttendance.setInsured(insured);
		newAttendance.setContactNumber(phoneNumber);

		newAttendance.setSpecialty(specialty);

		newAttendance.setRequesterInsured(requesterInsured);
		newAttendance.setEnabledMedia(enabledMedia);
		newAttendance.setHealthInsuranceIdentificator(healthInsuranceIdentificator);
		newAttendance.setHealthAttendanceId(healthInsuredId);

		generateInviteCode(newAttendance);

		if (enabledMedia)
			newAttendance.setEnabledMediaDate(new Date());

		return newAttendance;
	}

	public Attendance saveUrgencyForClientInsured(Long insuredId, Long specialtyId, boolean enabledMedia, String healthInsuranceIdentificator, Long healthInsuredId) {
		Specialty specialty = specialtyService.find(specialtyId);
		Insured insured = insuredService.find(insuredId);

		List<AttendanceStatus> status = new ArrayList<AttendanceStatus>();
		status.add(SCHEDULED);
		status.add(WAITING_IN_QUEUE);
		status.add(WAITING_INSURED);
		status.add(VIDEOCALL_IN_PROGRESS);

		List<Attendance> attendances = repository.findByInsuredInAndStatusInAndTypeIn(Arrays.asList(insured), status,
				Arrays.asList(AttendanceType.URGENCY));

		for (Attendance attendance : attendances) {
			if (attendance.getSpecialty().equals(specialty)) {
				if (isActiveOnServerAPI(attendance)) {
					return attendance;
				} else {
					syncWithServerAPI(attendance);
				}
			}
		}

		Attendance att = createAttendance(insured, null, AttendanceType.URGENCY, WAITING_IN_QUEUE,
				insured.getLastPhoneNumber(), specialty, insured, enabledMedia, healthInsuranceIdentificator, healthInsuredId);

		try{
			att = createAttendanceOnMaidaServer(att, "Consulta de Urgência", healthInsuranceIdentificator);
			return repository.save(att);
		}
		catch(Exception e){
			throw new InvalidException(e.getMessage());
		}		
	}

	public Attendance create(@Valid ClientBookingAttendanceForm form, Insured insured) {
		LOG.info("==================== Booking Attendance Service ====================");
		LOG.info(">>> create <<<");
		Specialty specialty = specialtyService.find(form.getSpecialtyId());
		insured.setLastPhoneNumber(form.getPhoneNumber());
		insuredRepository.save(insured);
		if (form.getType().equals(AttendanceType.URGENCY)) {
			LOG.info(">>> Request Urgency <<<");			
			Attendance attendance = saveUrgencyForClientInsured(insured.getId(), specialty.getId(), false, form.getHealthInsuranceIdentificator(), form.getHealthAttendanceId());
			messagingService.sendAttendanceQueuePositions(specialty.getId());
			LOG.info(">>> ok <<<");
			LOG.info("==================== Return to Booking Service ====================");
			return attendance;
		} else if (form.getType().equals(AttendanceType.ELECTIVE)) {
			Attendance attendance = saveElectiveForClientInsured(form, insured, specialty, form.getHealthInsuranceIdentificator(), form.getHealthAttendanceId());
			LOG.info(">>> ok <<<");
			LOG.info("==================== Return to Booking Service ====================");
			return attendance;
		}
		LOG.info(">>> AttendanceType Null <<<");
		LOG.info("==================== Return to Booking Service ====================");
		return null;
	}
}
