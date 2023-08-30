package br.com.maidahealth.telemedapi.services;

import static br.com.maidahealth.telemedapi.models.AttendanceStatus.CANCELED;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.FINISHED;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.PAYMENT_APPROVED;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.SCHEDULED;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.VIDEOCALL_ENDED;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.VIDEOCALL_IN_PROGRESS;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.WAITING_INSURED;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.WAITING_IN_QUEUE;
import static br.com.maidahealth.telemedapi.models.AttendanceStatus.WAITING_PAYMENT;
import static java.nio.file.StandardOpenOption.CREATE_NEW;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.TimeZone;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.dto.AttendanceDto;
import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.dto.NextAttendancesResponseDto;
import br.com.maidahealth.telemedapi.dto.RegisterGuestDto;
import br.com.maidahealth.telemedapi.dto.RoomDto;
import br.com.maidahealth.telemedapi.dto.TokenDto;
import br.com.maidahealth.telemedapi.enums.AttendanceDateType;
import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.CardTokenType;
import br.com.maidahealth.telemedapi.enums.PaymentDetailsStatusEnum;
import br.com.maidahealth.telemedapi.enums.PaymentType;
import br.com.maidahealth.telemedapi.enums.ReturnAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.enums.TypeActionEnum;
import br.com.maidahealth.telemedapi.enums.VacancyStatus;
import br.com.maidahealth.telemedapi.enums.VideoCallFinishReasonEnum;
import br.com.maidahealth.telemedapi.exceptions.ForbiddenOperationException;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.exceptions.InvalidUserException;
import br.com.maidahealth.telemedapi.exceptions.NotAuthorizedException;
import br.com.maidahealth.telemedapi.form.AttendanceForm;
import br.com.maidahealth.telemedapi.form.ClientAttendanceCancelingForm;
import br.com.maidahealth.telemedapi.form.ClientAttendanceForm;
import br.com.maidahealth.telemedapi.form.GuestForm;
import br.com.maidahealth.telemedapi.form.PaymentOrderForm;
import br.com.maidahealth.telemedapi.form.PhoneForm;
import br.com.maidahealth.telemedapi.form.QueuePositionForm;
import br.com.maidahealth.telemedapi.form.SelfAttendanceForm;
import br.com.maidahealth.telemedapi.form.UpdateUrlReturnAttendanceForm;
import br.com.maidahealth.telemedapi.form.VacancyForm;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendancePaymentDetails;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.models.Feedback;
import br.com.maidahealth.telemedapi.models.Guest;
import br.com.maidahealth.telemedapi.models.HealthInsurer;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Profile;
import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.models.SchedulingType;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.TelemedNotification;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.models.UserType;
import br.com.maidahealth.telemedapi.models.Vacancy;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.FeedbackRepository;
import br.com.maidahealth.telemedapi.repositories.GuestRepository;
import br.com.maidahealth.telemedapi.repositories.InsuredRepository;
import br.com.maidahealth.telemedapi.repositories.ProfessionalRepository;
import br.com.maidahealth.telemedapi.repositories.ProfileRepository;
import br.com.maidahealth.telemedapi.repositories.UserRepository;
import br.com.maidahealth.telemedapi.repositories.VacancyRepository;
import br.com.maidahealth.telemedapi.repositories.vo.AttendanceSchedulerIntegrationView;
import br.com.maidahealth.telemedapi.utils.ProfileUtils;
import br.com.maidahealth.telemedapi.utils.TelemedServerResponseUtil;
import br.com.maidahealth.telemedapi.utils.Utils;
import br.com.maidahealth.telemedapi.validator.AppointmentSchedulingValidator;
import br.com.maidahealth.telemedapi.validator.AppointmentSelfSchedulingValidator;
import clover.org.apache.commons.lang.time.DateFormatUtils;
import reactor.core.publisher.Flux;
import reactor.util.CollectionUtils;

@Service
public class AttendanceService {

	private static final Logger LOG = LoggerFactory.getLogger(AttendanceService.class);

	private static final String ATTENDANCE_INSURED_LABEL = "attendanceInsured";
	private static final String REQUESTER_INSURED_LABEL = "requesterInsured";

	@Autowired
	private AttendanceRepository repository;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private SpecialtyService specialtyService;

	@Autowired
	private InsuredRepository insuredRepository;

	@Autowired
	private TelemedServerService telemedServerService;

	@Autowired
	private AsyncTelemedServerService asyncTelemedServerService;

	@Autowired
	private FeedbackRepository feedbackRepository;

	@Autowired
	private InsuredService insuredService;

	@Autowired
	private ProfessionalRepository professionalRepository;

	@Autowired
	private HealthInsurerService healthInsurerService;

	@Autowired
	private TelemedNotificationService notificationService;

	@Autowired
	private ProviderService providerService;

	@Autowired
	private ProfessionalService professionalService;

	@Autowired
	private AppointmentSchedulingValidator schedulingValidator;

	@Autowired
	private AppointmentSelfSchedulingValidator selfSchedulingValidator;

	@Autowired
	private EmailService emailService;

	@Autowired
	private TelemedClientApiContext context;

	@Autowired
	private VacancyRepository vacancyRepository;

	@Autowired
	private GuestRepository guestRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	@Qualifier("cieloService")
	private PaymentService paymentService;

	@Autowired
	private MessagingService messagingService;

	@Autowired
	private TokenService tokenService;

	private Map<String, Insured> validateUrgencyRules(QueuePositionForm form,
			boolean isRequesterInsuredEqualsToAttendanceInsured) {
		Long insuredId = Optional.ofNullable(form).map(QueuePositionForm::getInsuredId).orElse(null);
		String chatbotId = Optional.ofNullable(form).map(QueuePositionForm::getChatbotId).orElse(null);
		Long specialtyId = Optional.ofNullable(form).map(QueuePositionForm::getSpecialtyId).orElse(null);

		form = new QueuePositionForm();
		form.setInsuredId(insuredId);
		form.setChatbotId(chatbotId);
		form.setSpecialtyId(specialtyId);

		if (!canGetUrgencyAttendance()) {
			throw new InvalidException("Horário de atendimento encerrado.");
		}

		User currentUser = authenticationService.currentUser();
		if (!currentUser.isInsured()) {
			throw new InvalidException("Apenas beneficiários podem entrar ou solicitar entrada na Fila de Urgência");
		}

		Insured requesterInsured = currentUser.getInsured();
		Insured attendanceInsured = null;
		if (form.getInsuredId() != null) {
			attendanceInsured = requesterInsured.verifyIfInsuredIsDependent(form.getInsuredId());

			if (attendanceInsured == null && !form.getInsuredId().equals(requesterInsured.getId()))
				throw new InvalidException("Segurado inválido para entrar na fila");
			else if (attendanceInsured != null && !form.getInsuredId().equals(requesterInsured.getId()))
				isRequesterInsuredEqualsToAttendanceInsured = false;
		}

		if (isRequesterInsuredEqualsToAttendanceInsured) {
			attendanceInsured = requesterInsured;
		}

		Map<String, Insured> insuredsMap = new HashMap<>();
		insuredsMap.put(ATTENDANCE_INSURED_LABEL, attendanceInsured);
		insuredsMap.put(REQUESTER_INSURED_LABEL, requesterInsured);

		return insuredsMap;
	}

	public Attendance saveUrgency(QueuePositionForm form, boolean enabledMedia) {
		boolean isRequesterInsuredEqualsToAttendanceInsured = true;

		Map<String, Insured> insuredsMap = validateUrgencyRules(form, isRequesterInsuredEqualsToAttendanceInsured);
		Insured requesterInsured = insuredsMap.get(REQUESTER_INSURED_LABEL);
		Insured attendanceInsured = insuredsMap.get(ATTENDANCE_INSURED_LABEL);

		List<Insured> insureds = retrieveInsureds(requesterInsured, isRequesterInsuredEqualsToAttendanceInsured);

		PaymentType paymentType = healthInsurerService.getHealthInsurer().getPaymentType();
		boolean needPayment = PaymentType.CURRENCY.equals(paymentType);

		Specialty specialty = getUrgencySpecialty(form);
		Attendance previousAttendance = checkPreviousAttendance(insureds, specialty, needPayment);
		if (previousAttendance != null) {
			return previousAttendance;
		}

		checkIfCanQueueOnlyByIntegration(requesterInsured);

		AttendanceStatus attendanceStatus = (needPayment ? WAITING_PAYMENT : WAITING_IN_QUEUE);
		Attendance newAttendance = createAttendance(attendanceInsured, form.getChatbotId(), AttendanceType.URGENCY,
				attendanceStatus, requesterInsured.getLastPhoneNumber(), specialty, requesterInsured, enabledMedia,
				attendanceInsured.getHealthInsuranceIdentificator() != null
						? attendanceInsured.getHealthInsuranceIdentificator()
						: requesterInsured.getHealthInsuranceIdentificator());

		if (needPayment) {
			newAttendance.setPaymentDetails(new AttendancePaymentDetails());
			createPaymentOrder(newAttendance, form.getPayment());
		} else {
			createAttendanceOnDocway(newAttendance, "Consulta de Urgência");
			// WebSocket de envio das posiçôes na fila
			repository.save(newAttendance);
			messagingService.sendAttendanceQueuePositions(specialty.getId());
		}

		return repository.save(newAttendance);
	}

	private List<Insured> retrieveInsureds(Insured requesterInsured,
			boolean isRequesterInsuredEqualsToAttendanceInsured) {
		List<Insured> insureds = new ArrayList<>();
		insureds.add(requesterInsured);

		if (!isRequesterInsuredEqualsToAttendanceInsured || !requesterInsured.hasDependentWithUser()) {
			insureds.addAll(requesterInsured.getDependents());
		}

		return insureds;
	}

	private Attendance checkPreviousAttendance(List<Insured> insureds, Specialty specialty, boolean needPayment) {
		List<AttendanceStatus> statuses = getUrgencyAvailableStatuses();
		List<Attendance> attendances = repository.findByInsuredInAndStatusInAndTypeIn(insureds, statuses,
				Arrays.asList(AttendanceType.URGENCY));

		for (Attendance attendance : attendances) {
			if (attendance.getSpecialty().equals(specialty)) {
				if (needPayment && PAYMENT_APPROVED.equals(attendance.getStatus())) {
					attendance = createAttendanceOnDocway(attendance, "Consulta de Urgência");
					attendance.setStatus(WAITING_IN_QUEUE);
				} else {
					if (isActiveOnServerAPI(attendance)) {
						boolean response = telemedServerService.updateMediaAndPhoneNumber(attendance);
						if (!response) {
							throw new InvalidException(
									"Ocorreu um erro ao entrar na fila. Tente novamente. Midia não habilitada.");
						}
						attendance.setEnabledMedia(true);
						attendance.setEnabledMediaDate(new Date());
						repository.save(attendance);
						return attendance;
					} else {
						syncWithServerAPI(attendance);
						return null;
					}
				}
			}
		}

		if (!attendances.isEmpty()) {
			throw new InvalidException("Já existe atendimento em andamento com outra especialidade");
		}

		return null;
	}

	private Specialty getUrgencySpecialty(QueuePositionForm form) {
		return form.getSpecialtyId() != null ? specialtyService.find(form.getSpecialtyId())
				: specialtyService.findDefaultSpecialty();
	}

	private List<AttendanceStatus> getUrgencyAvailableStatuses() {
		return Arrays.asList(SCHEDULED, VIDEOCALL_IN_PROGRESS, WAITING_INSURED, WAITING_IN_QUEUE, WAITING_PAYMENT,
				PAYMENT_APPROVED);
	}

	private void createPaymentOrder(Attendance newAttendance, PaymentOrderForm payment) {
		paymentService.authorize(newAttendance, payment);
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

	private void checkIfCanQueueOnlyByIntegration(Insured insured) {
		HealthInsurer hi = healthInsurerService.getHealthInsurer();
		if (healthInsurerService.getHealthInsurer().getUrgencyQueueOnlyByIntegration()) {
			String url = repository.findUrlByInsuredIdOrderByIdDesc(insured.getId());
			if (url == null) {
				url = hi.getUrl();
			}
			throw new ForbiddenOperationException(url);
		}
	}

	private Attendance createAttendance(Insured insured, String chatbotId, AttendanceType attendanceType,
			AttendanceStatus status, String phoneNumber, Specialty specialty, Insured requesterInsured,
			boolean enabledMedia, String healthInsuranceIdentificator) {

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

		generateInviteCode(newAttendance);

		if (enabledMedia)
			newAttendance.setEnabledMediaDate(new Date());

		return newAttendance;
	}

	private Attendance createAttendanceOnDocway(Attendance newAttendance, String reason) {
		telemedServerService.createAttendance(newAttendance, reason, null);
		return newAttendance;
	}

	private Attendance createAttendanceOnMaidaServer(Attendance newAttendance, String reason,
			String healthInsuranceIdentificator) {
		telemedServerService.createAttendance(newAttendance, reason, healthInsuranceIdentificator);
		return newAttendance;
	}

	public Integer getPositionInQueue(Attendance attendance) {
		Integer position = -1;

		if (attendance == null || AttendanceStatus.PAYMENT_APPROVED.equals(attendance.getStatus()))
			return position;

		if (attendance.getStatus() == VIDEOCALL_IN_PROGRESS || attendance.getStatus() == WAITING_INSURED) {
			position = 0;
		} else if (attendance.getStatus() == WAITING_IN_QUEUE) {

			if (!attendance.getEnabledMedia())
				return position;

			List<AttendanceStatus> status = Arrays.asList(WAITING_IN_QUEUE);
			position = repository.countByStatusInAndEnabledMediaDateLessThanAndTypeAndEnabledMedia(status,
					attendance.getEnabledMediaDate(), AttendanceType.URGENCY, true) + 1;
		}

		return position;
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

	public Attendance getLastUrgencyAttendance() {
		Insured insured = authenticationService.currentUser().getInsured();
		List<AttendanceStatus> status = new ArrayList<AttendanceStatus>();
		status.add(WAITING_IN_QUEUE);
		status.add(WAITING_INSURED);
		status.add(VIDEOCALL_IN_PROGRESS);
		status.add(PAYMENT_APPROVED);

		List<Attendance> attendances = repository.findByRequesterInsuredAndStatusInAndTypeInAndEnabledMedia(insured,
				status, Arrays.asList(AttendanceType.URGENCY), true);
		return attendances.size() > 0 ? attendances.get(0) : null;
	}

	public List<Attendance> getAttendancesByRequesterInsuredAndStatusInAndTypeIn(Insured insured,
			List<AttendanceStatus> status, List<AttendanceType> types) {
		return repository.findByRequesterInsuredAndStatusInAndTypeInAndEnabledMedia(insured, status, types, true);
	}

	public Page<AttendanceDto> getMyAttendances(String filter, Pageable pageable) {
		User currentUser = authenticationService.currentUser();
		Page<Attendance> attendances = null;
		if (currentUser.isInsured()) {
			Insured currentInsured = currentUser.getInsured();

			List<Long> insuredsIds = new ArrayList<Long>();
			insuredsIds.add(currentInsured.getId());

			for (Insured d : currentInsured.getDependents()) {
				insuredsIds.add(d.getId());
			}

			attendances = repository.getAttendancesByInsuredAndDependentsIdsAndFilter(insuredsIds, filter.toLowerCase(),
					pageable);
		} else if (currentUser.isAdmin()) {
			attendances = repository.findAll(pageable);
		}

		return AttendanceDto.convert(attendances, false, null, null, null, null);

	}

	public AttendanceDto getAttendanceById(Long id, boolean viewFull) throws Exception {

		Optional<Attendance> optionalAttendance = repository.findById(id);

		if (!optionalAttendance.isPresent())
			throw new InvalidException("Atendimento inválido");

		Attendance att = optionalAttendance.get();

		User currentUser = authenticationService.currentUser();
		if (!userCanSeeAttendance(currentUser)) {
			throw new InvalidException("Usuário não possui permissão para acessar o atendimento");
		}

		if (currentUser.isGuest()
				&& !repository.findByIdAndGuestsId(att.getId(), currentUser.getGuest().getId()).isPresent()) {
			throw new InvalidException("Usuário não possui permissão para acessar o atendimento");
		}

		if (currentUser.isInsured()) {
			Insured insured = currentUser.getInsured();
			if (!att.getInsured().equals(insured)
					&& insured.verifyIfInsuredIsDependent(att.getInsured().getId()) == null)
				throw new InvalidException("Atendimento inválido");
		}

		if (viewFull) {
			String prescription = null;
			String exam = null;
			String sickNote = null;
			JsonNode medicalRecord = this.getMedicalRecordSafely(att.getId());

			if (att.getHasPrescription() != null && att.getHasPrescription()) {
				prescription = this.getPrescriptionSafely(att.getId());
			}
			if (att.getHasExamRequest() != null && att.getHasExamRequest()) {
				exam = this.getExamSafely(att.getId());
			}
			if (att.getHasSickNote() != null && att.getHasSickNote()) {
				sickNote = this.getSickNoteSafely(att.getId());
			}

			return AttendanceDto.convert(att, viewFull, medicalRecord, prescription, exam, sickNote);
		}

		return AttendanceDto.convert(att, viewFull, null, null, null, null);
	}

	public AttendanceDto getAttendanceByPublicId(String token, String publicId, boolean viewFull) {

		token = token.replace("Bearer", "").replaceAll(" ", "");
		if (!insuredService.isTokenCreateInsuredValid(token))
			throw new InvalidUserException("Token inválido");

		Optional<Attendance> optionalAttendance = repository.findByDocwayId(publicId);

		if (!optionalAttendance.isPresent())
			throw new InvalidException("Atendimento inválido");

		Attendance att = optionalAttendance.get();

		return AttendanceDto.convert(att, viewFull, null, null, null, null);
	}

	public AttendanceDto getClientAttendanceById(Long id) {
		Optional<Attendance> optionalAttendance = repository.findById(id);

		if (!optionalAttendance.isPresent()) {
			throw new InvalidException("Atendimento inválido");
		}
		Attendance attendance = optionalAttendance.get();
		JsonNode serverAttendance = telemedServerService.getDocwayAttendance(attendance);

		return AttendanceDto.convert(attendance, serverAttendance, false, null, null, null, null);
	}

	public AttendanceDto getAttendanceForRoutines(Long id) {

		Optional<AttendanceSchedulerIntegrationView> optionalAttendance = repository.findViewById(id);

		if (!optionalAttendance.isPresent()) {
			throw new InvalidException("Atendimento inválido");
		}

		return new AttendanceDto(optionalAttendance.get());
	}

	private boolean userCanSeeAttendance(User currentUser) {
		return currentUser.isAdmin() || currentUser.isClientAdmin() || currentUser.isInsured()
				|| currentUser.isSecretary() || currentUser.isGuest();
	}

	public Attendance findById(Long id) {
		Optional<Attendance> att = repository.findById(id);
		return att.isPresent() ? att.get() : null;
	}

	public List<AttendanceDto> getIncomingAttendances(Insured insuredParam) {

		List<AttendanceStatus> status = new ArrayList<AttendanceStatus>();

		status.add(WAITING_IN_QUEUE);
		status.add(WAITING_INSURED);
		status.add(VIDEOCALL_IN_PROGRESS);

		List<Attendance> attendances = new ArrayList<Attendance>();

		if (insuredParam == null) {
			User currentUser = authenticationService.currentUser();
			if (currentUser.isInsured()) {
				this.collectAttendances(attendances, status, currentUser.getInsured());
			} else if (currentUser.isAdmin()) {
				attendances.addAll(repository.findByStatusInAndType(status, AttendanceType.URGENCY));
				attendances.addAll(repository.findByTypeAndSchedulingDateGreaterThanOrderBySchedulingDateAsc(
						AttendanceType.ELECTIVE, new Date()));
			}
		} else {
			this.collectAttendances(attendances, status, insuredParam);
		}

		List<AttendanceDto> attendanceDtos = new ArrayList<AttendanceDto>();

		for (Attendance attendance : attendances) {
			attendanceDtos.add(AttendanceDto.convert(attendance, false, null, null, null, null));
		}

		return attendanceDtos;
	}

	private void collectAttendances(List<Attendance> attendances, List<AttendanceStatus> status, Insured insured) {

		attendances.addAll(repository.findByRequesterInsuredAndStatusInAndTypeInAndEnabledMedia(insured, status,
				Arrays.asList(AttendanceType.URGENCY), true));

		List<Insured> requesterAndAttendanceInsureds = new ArrayList<Insured>();
		requesterAndAttendanceInsureds.add(insured);
		requesterAndAttendanceInsureds.addAll(insured.getDependents());

		attendances
				.addAll(repository.findByInsuredInAndTypeAndStatusAndSchedulingDateGreaterThanOrderBySchedulingDateAsc(
						requesterAndAttendanceInsureds, AttendanceType.ELECTIVE, SCHEDULED, new Date()));
	}

	public RoomDto startAttendance(Long id) throws InvalidException {
		List<AttendanceStatus> status = new ArrayList<AttendanceStatus>();
		status.addAll(Arrays.asList(WAITING_INSURED, VIDEOCALL_IN_PROGRESS));

		Insured insured = authenticationService.currentUser().getInsured();
		Optional<Attendance> optionalAttendance = repository.findByIdAndStatusIn(id, status);

		if (!optionalAttendance.isPresent())
			throw new InvalidException("Atendimento inválido");

		Attendance att = optionalAttendance.get();

		if (!att.getInsured().equals(insured) && insured.verifyIfInsuredIsDependent(att.getInsured().getId()) == null)
			throw new InvalidException("Atendimento inválido");

		Attendance attendance = optionalAttendance.get();

		JsonNode roomDataJson = telemedServerService.getRoomData(attendance);

		if (attendance.getStatus() == WAITING_INSURED) {
			attendance.setInsuredOnlineDate(new Date());
			attendance.setStatus(VIDEOCALL_IN_PROGRESS);
			attendance = repository.save(attendance);
		}

		return new RoomDto(roomDataJson.get("roomToken").asText(), roomDataJson.get("roomName").asText(), attendance);
	}

	public RoomDto getClientRoomAttendance(Long id) throws InvalidException {
		List<AttendanceStatus> status = new ArrayList<AttendanceStatus>();
		status.addAll(Arrays.asList(WAITING_INSURED, VIDEOCALL_IN_PROGRESS));

		Optional<Attendance> optionalAttendance = repository.findByIdAndStatusIn(id, status);

		if (!optionalAttendance.isPresent())
			throw new InvalidException("Atendimento inválido");

		Attendance attendance = optionalAttendance.get();

		JsonNode roomDataJson = telemedServerService.getRoomData(attendance);

		return new RoomDto(roomDataJson.get("roomToken").asText(), roomDataJson.get("roomName").asText(), attendance);
	}

	public void updateStatus(String attendanceDocwayId, AttendanceStatus status,
			CancellingAttendanceReasonEnum... cancellingReason) throws InvalidException {
		Optional<Attendance> optionalAttendance = repository.findByDocwayId(attendanceDocwayId);

		if (!optionalAttendance.isPresent())
			throw new InvalidException("Atendimento inválido");

		Attendance attendance = optionalAttendance.get();

		if (status == FINISHED) {
			attendance.setFinishDate(new Date());
			attendance.setStatus(status);
			repository.save(attendance);
			if (attendance.getPaymentDetails() != null
					&& attendance.getPaymentDetails().getStatus().equals(PaymentDetailsStatusEnum.AUTHORIZED)
					&& attendance.getPaymentDetails().getCardTokenType().equals(CardTokenType.CREDIT)) {
				paymentService.capture(attendance);
			} else {
				emailService.sendFinishAttendanceMessage(attendance);
			}
		} else if (status == WAITING_INSURED) {
			updateAttendanceStatusToWaitingInsured(attendance);
			attendance = repository.save(attendance);
			// WebSocket de envio das posições na fila
			messagingService.sendAttendanceQueuePositions(attendance.getSpecialty().getId());

			String message = attendance.getProfessional().getName() + " está aguardando.";
			User user1 = attendance.getInsured().getUser() == null ? attendance.getInsured().getHolder().getUser()
					: attendance.getInsured().getUser();
			TelemedNotification n1 = notificationService.save(message, attendance.getId(), user1,
					TypeActionEnum.WAITING_INSURED);

			Attendance nextAttendance = getNextAttendance();
			TelemedNotification n2 = null;
			if (nextAttendance != null) {
				User user2 = nextAttendance.getInsured().getUser() == null
						? nextAttendance.getInsured().getHolder().getUser()
						: nextAttendance.getInsured().getUser();
				n2 = notificationService.save("Você é o próximo a ser atendido.", nextAttendance.getId(), user2,
						TypeActionEnum.NEXT_ONE);
			}
			notificationService.send(n1);
			if (n2 != null)
				notificationService.send(n2);
		} else if (status == CANCELED) {
			updateAttendanceStatusToCanceled(attendance, cancellingReason);
			repository.save(attendance);
		}

	}

	private Attendance getNextAttendance() {
		Optional<Attendance> optionalAttendance = repository.findFirstByStatusOrderByCreatedAtDesc(WAITING_IN_QUEUE);
		return optionalAttendance.isPresent() ? optionalAttendance.get() : null;
	}

	
	private void updateAttendanceStatusToCanceled(Attendance attendance, CancellingAttendanceReasonEnum... cancellingReason) {
		/* 
			Verifica se o status do atendimento é igual a CANCELED ou FINISHED,
	   		se sim, chama o cancelamento no service de pagamento; 
	  	 	seta o status do atendimento para cancelado;
	  		seta a razão de cancelamento;
	  		seta a data de cancelamento.
	  		Se o vacancyid da consulta não for nulo e a data de agendamento for futura,
	  		chama método para justar a vacancy;
	   		seta o vacancyId da consulta para nulo.
		*/
		List<AttendanceStatus> finalStatus = Arrays.asList(AttendanceStatus.CANCELED, AttendanceStatus.FINISHED);
		if (!finalStatus.contains(attendance.getStatus())) {
			paymentService.cancel(attendance);
			attendance.setStatus(CANCELED);
			attendance.setCancellingReason(cancellingReason.length > 0 ? cancellingReason[0] : null);
			attendance.setCancellingDate(new Date());
			if (attendance.getVacancyId() != null && Utils.isAfterNow(attendance.getSchedulingDate())) {
				adjustVacancyToAvailable(attendance);
				attendance.setVacancyId(null);
			}
		}
	}

	private void updateAttendanceStatusToWaitingInsured(Attendance attendance) {

		if (attendance.getStatus() != WAITING_IN_QUEUE && attendance.getStatus() != SCHEDULED)
			return;

		attendance.setProfessionalOnlineDate(new Date());
		JsonNode jsonNode = telemedServerService.getDocwayAttendance(attendance);

		JsonObject professionalObject = telemedServerService.getProfessionalJsonObject(jsonNode);
		String professionalDocwayId = professionalObject.get("id").getAsString();

		Optional<Professional> optionalProfessional = professionalRepository.findByDocwayId(professionalDocwayId);

		Professional p = optionalProfessional.isPresent() ? optionalProfessional.get() : null;

		if (p == null) {
			p = professionalRepository.save(telemedServerService.getProfessionalModel(professionalObject));
		}

		attendance.setStatus(WAITING_INSURED);
		attendance.setProfessional(p);
	}

	public void leave(CancellingAttendanceReasonEnum reason) {
		Attendance attendance = getLastUrgencyAttendance();
		if (attendance == null)
			throw new InvalidException("Atendimento inválido");

		paymentService.cancel(attendance);

		if (attendance.getDocwayId() != null) {
			TelemedServerResponseUtil response = telemedServerService.cancel(attendance, reason, reason.getDescription());
			HttpStatus status = response.getStatus();

			if (!status.is2xxSuccessful()) {
				throw new InvalidException("Paciente já atendido ou não existente na fila.");
			}
		}
		updateAttendanceStatusToCanceled(attendance, reason);
		repository.save(attendance);
		// WebSocket de envio das posições na fila
		messagingService.sendAttendanceQueuePositions(attendance.getSpecialty().getId());
	}

	public void cancel(Long id, CancellingAttendanceReasonEnum reason) {

		Optional<Attendance> optionalAttendance = repository.findById(id);
		if (!optionalAttendance.isPresent())
			throw new InvalidException("Atendimento inválido");

		Attendance attendance = optionalAttendance.get();

		paymentService.cancel(attendance);

		TelemedServerResponseUtil response = telemedServerService.cancel(attendance, reason, reason.getDescription());
		HttpStatus status = response.getStatus();

		if (!status.is2xxSuccessful()) {
			throw new InvalidException("Atendimento já finalizado ou inexistente.");
		}
		updateAttendanceStatusToCanceled(attendance, reason);
	}

	public void stop(Long id) throws InvalidException {
		User currentUser = authenticationService.currentUser();

		Optional<Attendance> optionalAttendance = repository.findById(id);

		if (!optionalAttendance.isPresent())
			throw new InvalidException("Atendimento inválido");

		Attendance att = optionalAttendance.get();

		if (currentUser.isInsured()) {
			Insured insured = currentUser.getInsured();
			if (!att.getInsured().equals(insured)
					&& insured.verifyIfInsuredIsDependent(att.getInsured().getId()) == null)
				throw new InvalidException("Atendimento inválido");
		}

		Attendance attendance = optionalAttendance.get();
		if (attendance.getStatus() == VIDEOCALL_IN_PROGRESS) {
			JsonNode response = telemedServerService.checkAttendanceVideoCallEnded(attendance);
			Optional.ofNullable(response).ifPresent(node -> {
				boolean videoCallEndedByDoctor = node.get("videoCallEnded").asBoolean();
				if (videoCallEndedByDoctor) {
					attendance.setStatus(VIDEOCALL_ENDED);
				}
			});
			attendance.setVideoCallEndDate(new Date());
			repository.save(attendance);
		}

	}

	public void setFeedback(JsonObject jsonObject, Long attendanceId) throws InvalidException {
		User currentUser = authenticationService.currentUser();

		Optional<Attendance> optionalAttendance = repository.findById(attendanceId);

		if (!optionalAttendance.isPresent())
			throw new InvalidException("Atendimento inválido:");

		Attendance att = optionalAttendance.get();

		if (currentUser.isInsured()) {
			Insured insured = currentUser.getInsured();
			if (!att.getInsured().equals(insured)
					&& insured.verifyIfInsuredIsDependent(att.getInsured().getId()) == null)
				throw new InvalidException("Atendimento inválido");
		}

		Integer grade = jsonObject.get("grade").getAsInt();
		String comment = jsonObject.get("comment").getAsString();
		Feedback feedback = new Feedback();
		feedback.setUser(currentUser);
		feedback.setAttendance(optionalAttendance.get());
		feedback.setGrade(grade);
		feedback.setComment(comment);

		feedbackRepository.save(feedback);

	}

	public Attendance getAttendanceInProgress(Insured insuredReceived) {
		Optional<Attendance> optionalAttendance = null;
		Insured insured;
		if (insuredReceived == null) {
			User currentUser = authenticationService.currentUser();
			insured = (currentUser.isInsured() ? currentUser.getInsured() : null);
		} else {
			insured = insuredReceived;
		}

		if (insured != null) {
			List<Insured> insureds = new ArrayList<Insured>();
			Insured currentInsured = insured;
			insureds.add(currentInsured);
			insureds.addAll(currentInsured.getDependents());

			optionalAttendance = repository.findByInsuredInAndStatusOrderByTypeDesc(insureds, VIDEOCALL_IN_PROGRESS);
		}

		if (optionalAttendance.isPresent())
			return optionalAttendance.get();

		return null;
	}

	public Boolean canGetUrgencyAttendance() {
		HealthInsurer hi = healthInsurerService.getHealthInsurer();
		LocalTime now = LocalTime.now(ZoneId.of(context.getApiConfiguration().getTimezone()));

		return hi.getStartUrgencyTime().isBefore(now) && hi.getFinishUrgencyTime().isAfter(now);
	}

	public List<Attendance> getAttendancesOfTomorrow() {
		Calendar beginningOfDay = Calendar.getInstance();

		beginningOfDay.set(Calendar.HOUR_OF_DAY, 23);
		beginningOfDay.set(Calendar.MINUTE, 59);

		Calendar endOfDay = Calendar.getInstance();

		endOfDay.add(Calendar.DAY_OF_MONTH, 1);
		endOfDay.set(Calendar.HOUR_OF_DAY, 23);
		endOfDay.set(Calendar.MINUTE, 59);

		return repository.findByTypeAndStatusAndSchedulingDateBetween(AttendanceType.ELECTIVE, SCHEDULED,
				beginningOfDay.getTime(), endOfDay.getTime());
	}

	public List<Attendance> getAttendancesAlmostCancelled() {
		Calendar waitingInsuredTime = Calendar.getInstance();
		waitingInsuredTime.add(Calendar.MINUTE, -3);

		return repository.findByStatusAndProfessionalOnlineDateLessThan(WAITING_INSURED, waitingInsuredTime.getTime());
	}

	public List<Attendance> getDirtyAttendances() {
		Calendar waitingInsuredTime = Calendar.getInstance();
		waitingInsuredTime.add(Calendar.MINUTE, -90);

		List<AttendanceStatus> status = new ArrayList<AttendanceStatus>();
		status.addAll(Arrays.asList(AttendanceStatus.WAITING_INSURED, AttendanceStatus.VIDEOCALL_IN_PROGRESS,
				AttendanceStatus.VIDEOCALL_ENDED));

		return repository.findByStatusInAndProfessionalOnlineDateLessThan(status, waitingInsuredTime.getTime());
	}

	public Attendance schedule(@Valid AttendanceForm form) throws MessagingException {

		schedulingValidator.validate(form);

		Attendance newAttendance = createElectiveAttendance(form);

		Insured insured = newAttendance.getInsured();

		createAttendanceOnDocway(newAttendance, "Agendamento de consulta eletiva");

		insured.setLastPhoneNumber(form.getPhoneNumber());
		insuredRepository.save(insured);

		Attendance att = repository.save(newAttendance);

		User user = att.getInsured().getUser() == null ? att.getInsured().getHolder().getUser()
				: att.getInsured().getUser();

		String message = "Sua consulta com Dr(a) " + att.getProfessional().getName() + " foi marcada para "
				+ Utils.dateWithHourAndWeekday(att.getSchedulingDate(), context.getApiConfiguration().getTimezone());
		TelemedNotification not = notificationService.save(message, att.getId(), user,
				TypeActionEnum.NEW_SCHEDULED_ATTENDANCE);

		notificationService.send(not);

		if (healthInsurerService.getHealthInsurer().getAutomaticEmailEnabled()) {
			emailService.sendAttendanceSchedulingMessage(att);
		}

		return att;

	}

	public Vacancy selfScheduleVacancy(@Valid SelfAttendanceForm form) throws MessagingException {
		if (!authenticationService.currentUser().isInsured()) {
			throw new InvalidException("Apenas pacientes podem solicitar novos atendimentos.");
		}

		selfSchedulingValidator.validate(form);
		Vacancy vacancy = getElectiveVacancy(form);

		return vacancy;

	}

	public Attendance selfSchedule(@Valid VacancyForm form) throws MessagingException {
		if (!authenticationService.currentUser().isInsured()) {
			throw new InvalidException("Apenas pacientes podem solicitar novos atendimentos.");
		}

		Vacancy vacancy = vacancyRepository.findById(form.getId()).get();

		if (vacancy.getSchedulingType() == SchedulingType.RETURN_APPOINTMENT && form.getReturnReason() == null) {
			throw new InvalidException("Em caso de Retorno, o motivo deve ser informado.");
		}

		Attendance newAttendance = createElectiveAttendance(form.getId());
		newAttendance.setReturnReason(ReturnAttendanceReasonEnum.getReasonByDescription(form.getReturnReason()));
		createAttendanceOnDocway(newAttendance, "Agendamento de consulta eletiva");
		Attendance att = repository.save(newAttendance);
		adjustVacancy(att);

		return att;

	}

	@Transactional
	public Attendance selfReschedule(VacancyForm form, Long attendaceId) throws MessagingException {

		CancellingAttendanceReasonEnum reason = CancellingAttendanceReasonEnum.CANCELED_BY_INSURED;
		cancel(attendaceId, reason);

		Attendance attendance = selfSchedule(form);

		return attendance;
	}

	@Transactional(readOnly = true)
	public void validReschedule(Long vacancyId, Long attendaceId) throws MessagingException {
		Attendance attendance = findById(attendaceId);
		Vacancy vacancy = vacancyRepository.findById(vacancyId)
				.orElseThrow(() -> new InvalidException("Vaga não disponível."));

		if (attendance.getSpecialty() != vacancy.getSpecialty()) {
			throw new InvalidException("Existe divergência na especialidade.");
		}

		if (attendance.getSchedulingType() != vacancy.getSchedulingType()) {
			throw new InvalidException("Existe divergência no tipo de atendimento.");
		}
	}

	private void adjustVacancy(Attendance att) {
		Vacancy vacancy = vacancyRepository.findById(att.getVacancyId())
				.orElseThrow(() -> new EntityNotFoundException("Vaga não disponível."));
		vacancy.setStatus(VacancyStatus.USED);
		vacancy.setAttendance(att);
		vacancyRepository.save(vacancy);
	}

	private void adjustVacancyToAvailable(Attendance att) {
		/*
			busca na tabela Vacancy com o vacancyId da consulta repassada:
			se não encontrado retorna uma exception com a respectiva mensagem.
			se encontrado:
			> seta o status da vacancy para available
			> seta o attendance da vacance para null
			> salva as alterações na tabela Vacancy
		 */
		Vacancy vacancy = vacancyRepository.findById(att.getVacancyId())
				.orElseThrow(() -> new EntityNotFoundException("Vaga não disponível."));
		vacancy.setStatus(VacancyStatus.AVAILABLE);
		vacancy.setAttendance(null);
		vacancyRepository.save(vacancy);
	}

	private Attendance createElectiveAttendance(AttendanceForm form) {
		Insured insured = insuredService.find(Long.valueOf(form.getInsuredId()));
		Provider provider = providerService.find(Long.valueOf(form.getProviderId()));
		Professional professional = professionalService.find(Long.valueOf(form.getProfessionalId()));
		Specialty specialty = specialtyService.find(Long.valueOf(form.getSpecialtyId()));

		if (form.getSchedulingTypeEnum() == SchedulingType.RETURN_APPOINTMENT && form.getReturnReason().isEmpty()) {
			throw new InvalidException("Em caso de Retorno, o motivo deve ser informado.");
		}

		Attendance newAttendance = createAttendance(insured, form.getChatbotId(), AttendanceType.ELECTIVE, SCHEDULED,
				form.getPhoneNumber(), specialty, null, true, null);
		newAttendance.setProvider(provider);
		newAttendance.setProfessional(professional);
		newAttendance.setSchedulingType(form.getSchedulingTypeEnum());
		Date scheduledDate = Utils.formatDataWithHour(form.getDate(), form.getHour(),
				TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		newAttendance.setSchedulingDate(scheduledDate);
		newAttendance.setReturnReason(ReturnAttendanceReasonEnum.getReasonByDescription(form.getReturnReason()));
		return newAttendance;
	}

	private Vacancy getElectiveVacancy(SelfAttendanceForm form) {
		Specialty specialty = specialtyService.find(Long.valueOf(form.getSpecialtyId()));
		Date scheduledDate = Utils.formatDataWithHour(form.getDate(), form.getHour(),
				TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		SchedulingType schedulingType = form.getSchedulingTypeEnum();

		Vacancy vacancy = null;

		if (form.getProfessionalId() == null) {
			vacancy = getVacancy(specialty, scheduledDate, schedulingType);
		} else {
			Professional professional = professionalService.find(Long.valueOf(form.getProfessionalId()));
			vacancy = getVacancyWithProfessional(specialty, professional, scheduledDate, schedulingType);
		}

		if (vacancy == null) {
			throw new InvalidException("Não há agenda disponível para o horário solicitado.");
		}

		return vacancy;
	}

	private Attendance createElectiveAttendance(Long vacancyId) {
		Vacancy vacancy = vacancyRepository.findById(vacancyId).get();
		if (!VacancyStatus.AVAILABLE.equals(vacancy.getStatus())) {
			throw new InvalidException("A vaga não está mais disponível para agendamento.");
		}
		Insured insured = authenticationService.currentUser().getInsured();
		Provider provider = null;

		Professional professional = vacancy.getProfessional();

		Attendance newAttendance = createAttendance(insured, null, AttendanceType.ELECTIVE, AttendanceStatus.SCHEDULED,
				insured.getLastPhoneNumber(), vacancy.getSpecialty(), null, true, null);
		newAttendance.setProvider(provider);
		newAttendance.setProfessional(professional);
		newAttendance.setSchedulingType(vacancy.getSchedulingType());
		newAttendance.setSchedulingDate(vacancy.getDateVacancy());
		newAttendance.setVacancyId(vacancy.getId());
		// newAttendance.setReturnReason(ReturnAttendanceReasonEnum.getReasonByDescription(form.getReturnReason()));
		return newAttendance;
	}

	public boolean reScheduleAttendance(Attendance attendance) {
		Vacancy vacancy = getVacancy(attendance.getSpecialty(), attendance.getSchedulingDate(),
				attendance.getSchedulingType());
		if (vacancy == null) {
			return false;
		}
		Professional professional = vacancy.getProfessional();

		attendance.setProfessional(professional);
		attendance.setVacancyId(vacancy.getId());
		reScheduleAttendanceOnServer(attendance);
		adjustVacancy(attendance);
		return true;
	}

	private Vacancy getVacancy(Specialty specialty, Date schedullingDate, SchedulingType schedulingType) {
		List<Vacancy> vacancies = vacancyRepository.findBySpecialtyAndDateVacancyAndSchedulingTypeAndStatus(specialty,
				schedullingDate, schedulingType, VacancyStatus.AVAILABLE);

		if (vacancies.isEmpty())
			return null;

		// TODO deve buscar de acordo com uma regra que ainda não definida de fato. Ex:
		// Mandar sempre para o médico que tem menos atendimentos;
		return vacancies.get(new Random().nextInt(vacancies.size()));
	}

	private Vacancy getVacancyWithProfessional(Specialty specialty, Professional professional, Date schedullingDate,
			SchedulingType schedulingType) {
		Optional<Vacancy> vacancy = vacancyRepository
				.findBySpecialtyAndProfessionalAndDateVacancyAndSchedulingTypeAndStatus(specialty, professional,
						schedullingDate, schedulingType, VacancyStatus.AVAILABLE);

		if (!vacancy.isPresent())
			return null;

		return vacancy.get();
	}

	private void reScheduleAttendanceOnServer(Attendance attendance) {

		TelemedServerResponseUtil response = telemedServerService.updateAttendanceProfessional(attendance.getDocwayId(),
				attendance.getProfessional().getDocwayId());

		HttpStatus status = response.getStatus();

		if (!status.is2xxSuccessful()) {
			throw new InvalidException("Erro ao reagendar Atendimento.");
		}
	}

	public Page<Attendance> getAttendances(String filter, Long insuredId, Long providerId, Long specialtyId,
			Long professionalId, String status, List<String> statusStringList, Date startDate, Date finishDate,
			String type, String dateType, Boolean hasDocuments, Pageable pagination) {
		Set<Long> selectedProviders = ProfileUtils.getSecretaryProviders(providerId, authenticationService);
		List<AttendanceStatus> statusEnumList = null;
		if (!CollectionUtils.isEmpty(statusStringList) || !StringUtils.isEmpty(status)) {
			statusEnumList = getStatusList(status, statusStringList);
		}

		AttendanceDateType dateTypeEnum = AttendanceDateType.getDateTypeByName(dateType);

		return repository.findSecretaryAttendances(filter, insuredId, selectedProviders, specialtyId, professionalId,
				statusEnumList, startDate, finishDate, type, dateTypeEnum, hasDocuments, null, null, pagination);

	}

	public Page<AttendanceDto> getClientAttendances(String filter, Long insuredId, Long specialtyId,
			Long professionalId, String status, Date startDate, Date finishDate, String type, Date schedulingDate,
			String schedulingHour, Pageable pagination, boolean viewFull) throws Exception {
		List<AttendanceStatus> statusList = getStatusList(status, null);

		Page<Attendance> attendances = repository.findSecretaryAttendances(filter, insuredId, null, specialtyId,
				professionalId, statusList, startDate, finishDate, type, null, schedulingDate, schedulingHour,
				pagination);

		if (viewFull) {
			Map<Long, JsonNode> medicalRecords = new HashMap<>();
			Map<Long, String> prescriptions = new HashMap<>();
			Map<Long, String> exams = new HashMap<>();
			Map<Long, String> sickNotes = new HashMap<>();
			for (Attendance attendance : attendances.getContent()) {
				medicalRecords.put(attendance.getId(), this.getMedicalRecordSafely(attendance.getId()));

				if (attendance.getHasPrescription() != null && attendance.getHasPrescription()) {
					prescriptions.put(attendance.getId(), this.getPrescriptionSafely(attendance.getId()));
				}
				if (attendance.getHasExamRequest() != null && attendance.getHasExamRequest()) {
					exams.put(attendance.getId(), this.getExamSafely(attendance.getId()));
				}
				if (attendance.getHasSickNote() != null && attendance.getHasSickNote()) {
					sickNotes.put(attendance.getId(), this.getSickNoteSafely(attendance.getId()));
				}
			}
			return AttendanceDto.convert(attendances, viewFull, medicalRecords, prescriptions, exams, sickNotes);
		}
		return AttendanceDto.convert(attendances, viewFull, null, null, null, null);
	}

	private JsonNode getMedicalRecordSafely(Long attendanceId) {
		JsonNode medicalRecord = null;
		try {
			medicalRecord = this.findMedicalRecord(attendanceId);
		} catch (Exception e) {
		}
		return medicalRecord;
	}

	private String getPrescriptionSafely(Long attendanceId) throws Exception {

		String prescription = this.findPrescriptionSicknoteExam(attendanceId, "prescription").get(0).get("sibrareId")
				.asText();
		if (prescription != null) {
			prescription = context.getApiConfiguration().getServerApiUrl() + "/download/" + prescription + "/pr";
		}
		return prescription;
	}

	private String getExamSafely(Long attendanceId) throws Exception {

		String exam = this.findPrescriptionSicknoteExam(attendanceId, "exam-request").get(0).get("sibrareId").asText();
		if (exam != null) {
			exam = context.getApiConfiguration().getServerApiUrl() + "/download/" + exam + "/ex";
		}
		return exam;
	}

	private String getSickNoteSafely(Long attendanceId) throws Exception {

		String sickNote = this.findPrescriptionSicknoteExam(attendanceId, "sick-note").get(0).get("sibrareId").asText();

		if (sickNote != null) {
			sickNote = context.getApiConfiguration().getServerApiUrl() + "/download/" + sickNote + "/sn";
		}
		return sickNote;
	}

	public List<Attendance> findByInsuredInAndStatusInAndTypeIn(List<Insured> insureds, List<AttendanceStatus> status,
			List<AttendanceType> types) {
		return repository.findByInsuredInAndStatusInAndTypeIn(insureds, status, types);
	}

	public Attendance saveUrgencyForClientInsured(Long insuredId, Long specialtyId, String chatbotId, String urlReturn,
			boolean enabledMedia, String healthInsuranceIdentificator) {
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

		Attendance att = createAttendance(insured, chatbotId, AttendanceType.URGENCY, WAITING_IN_QUEUE,
				insured.getLastPhoneNumber(), specialty, insured, enabledMedia, healthInsuranceIdentificator);
		att.setUrlReturn(urlReturn);

		att = createAttendanceOnMaidaServer(att, "Consulta de Urgência", healthInsuranceIdentificator);

		return repository.save(att);
	}

	// private ApiService getApiService() {
	// 	return telemedServerService;
	// }

	public Attendance create(@Valid ClientAttendanceForm form) {

		validateCellPhoneNumberValid(form.getPhoneNumber());

		Optional<Attendance> healthAttendance = repository.findByHealthAttendanceIdAndHealthInsuranceIdentificator(form.getHealthAttendanceId(), form.getHealthInsuranceIdentificator());

		if (healthAttendance.isPresent()){
			return null;
		}

		Insured insured = insuredService.find(form.getPatientId());

		if (!insured.isAbleToCreateAttendance())
			throw new InvalidException("Paciente não apto para criar novos atendimentos");

		if (form.getSpecialtyId() == null) {
			return null;
		}

		Specialty specialty = specialtyService.find(form.getSpecialtyId());

		Optional<String> optionalChatbotId = Optional.ofNullable(form.getChatbotId());
		Optional<String> optionalUrlReturn = Optional.ofNullable(form.getUrlReturn());

		String chatbotId = optionalChatbotId.orElse(null);
		String urlReturn = optionalUrlReturn.orElse(null);

		insured.setLastPhoneNumber(form.getPhoneNumber());

		insuredRepository.save(insured);

		if (form.getType().equals(AttendanceType.URGENCY)) {
			Attendance attendance = saveUrgencyForClientInsured(insured.getId(), specialty.getId(), chatbotId,
					urlReturn, false, form.getHealthInsuranceIdentificator());
			// WebSocket de envio das posições da fila
			messagingService.sendAttendanceQueuePositions(specialty.getId());
			return attendance;
		} else if (form.getType().equals(AttendanceType.ELECTIVE)) {

			validateSchedulingDatePassed(form.getSchedulingDate(), form.getHour());

			return saveElectiveForClientInsured(form, insured, specialty, chatbotId, urlReturn,
					form.getHealthInsuranceIdentificator());
		}

		return null;
	}

	public Attendance saveElectiveForClientInsured(ClientAttendanceForm form, Insured insured, Specialty specialty,
			String chatbotId, String urlReturn, String healthInsuranceIdentificator) {

		Date scheduledDate = Utils.formatDataWithHour(form.getSchedulingDate(), form.getHour(),
				TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));

		Optional<Attendance> optional = repository
				.findByInsuredIdAndProfessionalIdAndSpecialtyIdAndSchedulingDateAndStatus(form.getPatientId(),
						form.getProfessionalId(), form.getSpecialtyId(), scheduledDate, AttendanceStatus.SCHEDULED);

		if (optional.isPresent()) {
			return optional.get();
		}

		Attendance att = new Attendance();

		Optional<Professional> prof = professionalRepository.findById(form.getProfessionalId());

		if (!prof.isPresent())
			throw new InvalidException("Profissional inválido");

		att.setInsured(insured);
		att.setProfessional(prof.get());
		att.setSpecialty(specialty);

		att.setSchedulingDate(scheduledDate);

		att.setType(AttendanceType.ELECTIVE);
		att.setStatus(SCHEDULED);

		att.setChatbotId(chatbotId);
		att.setUrlReturn(urlReturn);
		att.setHealthInsuranceIdentificator(healthInsuranceIdentificator);
		att.setHealthAttendanceId(form.getHealthAttendanceId());

		att = createAttendanceOnMaidaServer(att, "Agendamento de consulta eletiva",
				form.getHealthInsuranceIdentificator());


		repository.save(att);

		return att;
	}

	private static boolean isLong(String input) {
        try {
            Long.parseLong(input);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

	@Transactional
	public ResponseEntity<Object> cancelClientAttendance(String attId, @Valid ClientAttendanceCancelingForm form) {
		
		Attendance attendance;
		if (isLong(attId)) {
			Optional<Attendance> attendanceId = repository.findById(Long.parseLong(attId));
			if(!attendanceId.isPresent()){
				JSONObject error = new JSONObject();
				error.put("mensagem", "Atendimento não encontrado.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
			}
			attendance = attendanceId.get();
		}else if (!isLong(attId)){
			Optional<Attendance> docwayId = repository.findByDocwayId(attId);
			if(!docwayId.isPresent()){
				JSONObject error = new JSONObject();
				error.put("mensagem", "Atendimento não encontrado.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
			}
			attendance = docwayId.get();	
		}else{
			JSONObject error = new JSONObject();
			error.put("mensagem", "Atendimento não encontrado.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
		}		

		// Chama o método updateAttendanceStatusToCanceled
		updateAttendanceStatusToCanceled(attendance, CancellingAttendanceReasonEnum.CANCELED_BY_CLIENT);

		// Faz requisição de cancelamento ao server
		TelemedServerResponseUtil response = telemedServerService.cancelClientAttendance(attendance, form);
		HttpStatus status = response.getStatus();

		/* 
			Se o status de resposta for sucessful,
			transforma o payload de resposta em json;
			retorna o payload de reposta do server junto com o status code.
		*/
		if (!status.is2xxSuccessful()) {
			Object list = new Gson().fromJson(response.getBody(), Object.class);
			return new ResponseEntity<Object>(list, response.getStatus());
		}

		boolean sendSocket = false;

		// Se o status do attendance for igual à "esperando na fila", seta o sendSocket como verdadeiro
		if (WAITING_IN_QUEUE.equals(attendance.getStatus()))
			sendSocket = true;

		// Se sendSocket for verdadeiro dispara o webSocket de envio das posiçôes na fila
		if (sendSocket)
			messagingService.sendAttendanceQueuePositions(attendance.getSpecialty().getId());

		// Retorna mensagem successful com a respectiva mensagem
		return ResponseEntity.ok(new MessageDto("Atendimento cancelado com sucesso."));
	}

	public Resource downloadDocument(Long id, Integer index, String documentType) throws MalformedURLException {
		Attendance attendance = Optional.ofNullable(this.findById(id))
				.orElseThrow(() -> new EntityNotFoundException("Atendimento inválido"));

		boolean hasPrescription = Optional.ofNullable(attendance.getHasPrescription()).orElse(false);
		boolean hasSicknote = Optional.ofNullable(attendance.getHasSickNote()).orElse(false);

		if (documentType.equalsIgnoreCase("prescription") && !hasPrescription) {
			throw new EntityNotFoundException("Download da prescrição não disponível");
		} else if (documentType.equalsIgnoreCase("sicknote") && !hasSicknote) {
			throw new EntityNotFoundException("Download do atestado não disponível");
		}

		Flux<DataBuffer> file = telemedServerService.downloadDocument(attendance.getDocwayId(), index, documentType);
		String fileName = Utils.getDocumentName(attendance, documentType);
		String documentPath = Utils.getTempDir() + fileName + ".pdf";

		Path path = FileSystems.getDefault().getPath(documentPath);

		DataBufferUtils.write(file, path, CREATE_NEW).block();

		return new UrlResource(path.toUri());
	}

	public JsonNode findMedicalRecord(Long id) {
		String externalId = Optional.ofNullable(this.findById(id)).map(Attendance::getDocwayId)
				.orElseThrow(() -> new EntityNotFoundException("Atendimento inválido"));

		return telemedServerService.getAttendanceMedicalRecord(externalId);
	}
	
	public JsonNode findPrescriptionsByCpf(String cpf) {
		String uri = String.format("appointments/%s/%s/%s", cpf, "appointment", "cpf");

		return telemedServerService.getAttendancePrescriptionsByCpf(uri);
	}
	
	public JsonNode findPrescriptionsByPublicId(String publicId, String document) {
		String uri = String.format("appointments/%s/%s/%s", publicId, document, "old");

		return telemedServerService.getAttendancePrescriptionSicknoteExam(uri);
	}

	public JsonNode findPrescriptionSicknoteExam(Long id, String document) {
		String externalId = Optional.ofNullable(this.findById(id)).map(Attendance::getDocwayId)
				.orElseThrow(() -> new EntityNotFoundException("Atendimento inválido"));

		String uri = String.format("appointments/%s/%s/%s", externalId, document, "old");

		return telemedServerService.getAttendancePrescriptionSicknoteExam(uri);
	}

	public JsonNode findPrescriptionSicknoteExamAsync(Long id, String document) throws Exception {
		String externalId = Optional.ofNullable(this.findById(id)).map(Attendance::getDocwayId)
				.orElseThrow(() -> new EntityNotFoundException("Atendimento inválido"));

		String uri = String.format("appointments/%s/%s", externalId, document);

		CompletableFuture<JsonNode> asyncResponse = asyncTelemedServerService
				.getAttendancePrescriptionSicknoteExam(uri);

		CompletableFuture.allOf(asyncResponse).join();
		JsonNode jsonNode = asyncResponse.get();

		return jsonNode;
	}

	public void updateSickNotePrescriptionStatus(String attendanceId) {
		Attendance attendance = repository.findByDocwayId(attendanceId)
				.orElseThrow(() -> new EntityNotFoundException("Atendimento não encontrado"));

		JsonNode response = telemedServerService.getAttendanceSickNotePrescriptionStatus(attendance);
		Optional.ofNullable(response).ifPresent(node -> {
			boolean sickNote = node.get("sickNote").asBoolean();
			boolean prescription = node.get("prescription").asBoolean();
			boolean examRequest = node.get("examRequest").asBoolean();

			attendance.setHasPrescription(prescription);
			attendance.setHasSickNote(sickNote);
			attendance.setHasExamRequest(examRequest);

			repository.save(attendance);
		});
	}

	public ResponseEntity<?> updateUrlReturn(Long id, UpdateUrlReturnAttendanceForm form) {
		repository.findById(id).map(attdce -> {
			attdce.setUrlReturn(form.getUrl());
			return repository.save(attdce);
		}).orElseThrow(() -> new EntityNotFoundException("Atendimento inválido"));

		return ResponseEntity.ok(new MessageDto("Url atualizada com sucesso"));
	}

	private List<AttendanceStatus> getStatusList(String status, List<String> statusList) {
		AttendanceStatus statusEnum = AttendanceStatus.getStatusByName(status);
		List<AttendanceStatus> statusEnumList = new ArrayList<AttendanceStatus>();
		if (statusEnum != null) {
			statusEnumList.add(statusEnum);
		}
		if (!CollectionUtils.isEmpty(statusList)) {
			statusList.stream().forEach(s -> {
				AttendanceStatus statusEnumeration = AttendanceStatus.getStatusByName(s);
				if (statusEnumeration != null) {
					statusEnumList.add(statusEnumeration);
				}
			});
		}
		return statusEnumList;
	}

	public void updatePhoneNumber(String publicId, PhoneForm form, String token) {
		token = token.replace("Bearer", "").replaceAll(" ", "");
		if (!telemedServerService.isWebhookTokenValid(token)) {
			throw new NotAuthorizedException("Token inválido");
		}
		if (!Utils.isCellPhoneNumberValid(form.getNumber())) {
			throw new InvalidException("O número informado é inválido.");
		}
		Attendance attendance = repository.findByDocwayId(publicId)
				.orElseThrow(() -> new EntityNotFoundException("Atendimento inválido"));

		attendance.setContactNumber(form.getNumber());
		attendance.getInsured().setLastPhoneNumber(form.getNumber());

		repository.save(attendance);
		insuredRepository.save(attendance.getInsured());
	}

	public ResponseEntity<?> checkInviteCode(Long id, String inviteCode) {
		if (repository.existsByIdAndInviteCodeAndStatusIn(id, inviteCode,
				Arrays.asList(AttendanceStatus.WAITING_INSURED, AttendanceStatus.VIDEOCALL_IN_PROGRESS))) {
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	public JsonNode createTestRoom() {
		return telemedServerService.createTestRoom();
	}

	public void synchronizeServerAndClientAttendance(String uuid) {
		try {
			Optional<Attendance> optAtt = repository.findByDocwayId(uuid);

			Attendance att = optAtt.get();

			JsonNode attJsonNode = telemedServerService.getDocwayAttendance(att);

			JsonObject attObj = JsonParser.parseString(attJsonNode.toPrettyString()).getAsJsonObject();

			JsonElement obj = attObj.get("finishReason");
			String finishReason = !obj.isJsonNull() ? obj.getAsString() : null;

			obj = attObj.get("finishOtherReasonDescription");

			String finishOtherReasonDescription = !obj.isJsonNull() ? obj.getAsString() : null;

			VideoCallFinishReasonEnum finishReasonEnum = VideoCallFinishReasonEnum.getReasonByName(finishReason);

			att.setFinishReason(finishReasonEnum);
			att.setFinishOtherReasonDescription(finishOtherReasonDescription);

			repository.save(att);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void SyncDirtyAttendances() {
		LOG.info(">>>>>>>>>>>>>>>> Limpando atendimentos sujos na base de dados..." + new Date());
		// Busca todos os atendimentos em andamento a mais de 2 horas...
		List<Attendance> attendances = getDirtyAttendances();
		LOG.info("Total de atendimentos encontrados: " + attendances.size());
		for (Attendance attendance : attendances) {
			try {
				// Sincroniza cada um desses atendimentos com a Server API...
				LOG.info("Atendimento: " + attendance.getId());
				syncWithServerAPI(attendance);
				// Após a sincronização, caso ainda não estejam encerrados, devem ser
				// cancelados...
				if (attendance.getStatus() != AttendanceStatus.FINISHED
						&& attendance.getStatus() != AttendanceStatus.CANCELED) {
					System.out.println("Cancelando: " + attendance.getId());
					cancel(attendance.getId(), CancellingAttendanceReasonEnum.CANCELED_BY_FINISH_ERROR);
				}
				LOG.info("Atendimento atualizado com sucesso.");
			} catch (Exception e) {
				LOG.error("Erro ao tentar cancelar o atendimento. Client: {}, Server: {}", attendance.getId(),
						attendance.getDocwayId());
			}
		}
	}

	public Attendance findByDocwayId(String publicId) {
		return repository.findByDocwayId(publicId)
				.orElseThrow(() -> new EntityNotFoundException("Não foi encontrado atendimento com o id informado."));
	}

	public ResponseEntity<?> checkReturnRight(Long insuredId, Long specialtyId) {

		specialtyService.find(specialtyId);
		insuredService.find(insuredId);

		Date beginDate = getDayPlusInterval(new Date(),
				-healthInsurerService.getHealthInsurer().getDeadlineForReturnAttendance());

		List<Attendance> pastAttendances = repository
				.findByStatusAndTypeAndSchedulingTypeAndSpecialtyIdAndInsuredIdAndSchedulingDateGreaterThanOrderBySchedulingDateDesc(
						AttendanceStatus.FINISHED, AttendanceType.ELECTIVE, SchedulingType.FIRST_APPOINTMENT,
						specialtyId, insuredId, beginDate);

		if (!pastAttendances.isEmpty()) {

			Date dateRetorno = getDayPlusInterval(pastAttendances.get(0).getSchedulingDate(),
					healthInsurerService.getHealthInsurer().getDeadlineForReturnAttendance());
			HashMap<String, String> response = new HashMap<String, String>();

			response.put("return_date", DateFormatUtils.format(dateRetorno, "dd-MM-yyyy"));
			return ResponseEntity.ok(response);
		}

		return ResponseEntity.badRequest().build();

	}

	private Date getDayPlusInterval(Date date, int interval) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.DATE, interval);
		c.set(Calendar.HOUR_OF_DAY, 3);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		c.add(Calendar.MILLISECOND, -1);
		date = c.getTime();
		return date;
	}

	@Transactional
	public ResponseEntity<?> registerGuest(Long id, String inviteCode, @Valid GuestForm form) {
		if (!repository.existsByIdAndInviteCodeAndStatusIn(id, inviteCode,
				Arrays.asList(AttendanceStatus.WAITING_INSURED, AttendanceStatus.VIDEOCALL_IN_PROGRESS))) {
			return new ResponseEntity<>(new MessageDto("Video chamada não valida ou não existente"),
					HttpStatus.BAD_REQUEST);
		}
		Guest guest = guestRepository.findByCpf(form.getCpf()).orElse(form.toGuest());
		Attendance attendance = repository.findById(id).orElseThrow();
		Profile profile = profileRepository.findByName(UserType.GUEST.name()).get();
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		TokenDto tokenDto = null;
		User guestUser = null;

		if (guest.getUser() == null) {
			guestUser = new User(guest.getCpf() + "_guest", guest.getName(), encoder.encode(guest.getCpf()),
					guest.getCpf() + "@email.maida.com", guest, Arrays.asList(profile));
			userRepository.save(guestUser);
			guest.setUser(guestUser);
		} else {
			guestUser = guest.getUser();
		}

		String token = tokenService.generateToken(guestUser);
		tokenDto = new TokenDto(token, "Bearer ", guestUser);

		guestRepository.save(guest);
		attendance.getGuests().add(guest);
		repository.save(attendance);

		JsonNode roomData = telemedServerService.getInviteRoomData(attendance, form.getCpf());
		RoomDto roomDto = new RoomDto(roomData.get("roomToken").asText(), roomData.get("roomName").asText(),
				attendance);

		return ResponseEntity.ok(new RegisterGuestDto(guest, roomDto, tokenDto));
	}

	public Set<Guest> getAttendanceGuests(String publicId, String token) {
		if (!telemedServerService.isWebhookTokenValid(token)) {
			throw new NotAuthorizedException("Token inválido");
		}
		Attendance attendance = repository.findByDocwayId(publicId)
				.orElseThrow(() -> new InvalidException("Atendimento inválido"));

		return attendance.getGuests();
	}

	public Page<AttendanceDto> getAttendanceHistory(String professionalPublicId, Pageable pagination) {

		Page<Attendance> attendances = null;
		Insured currentInsured = authenticationService.currentUser().getInsured();

		if (professionalPublicId != null) {
			Professional professional = professionalRepository.findByDocwayId(professionalPublicId)
					.orElseThrow(() -> new EntityNotFoundException("Profissional não encontrado."));
			attendances = repository.findByInsuredAndProfessionalAndStatus(currentInsured, professional,
					AttendanceStatus.FINISHED, pagination);
		} else {
			attendances = repository.findByInsuredAndStatus(currentInsured, AttendanceStatus.FINISHED, pagination);
		}

		return AttendanceDto.convert(attendances, false, null, null, null, null);
	}

	public void validateCellPhoneNumberValid(String phoneNumber) {

		if (!Utils.isCellPhoneNumberValid(phoneNumber)) {

			throw new InvalidException("O número informado é inválido.");
		}
	}

	public void validateSchedulingDatePassed(Date date, String hour) {

		try {
			Date currentDate = Utils.getCurrentDate(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
			Date schedulingDate = Utils.formatDataWithHour(date, hour,
					TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));

			if (schedulingDate.before(currentDate)) {

				throw new InvalidException("A data da consulta deve ser futura.");
			}
		} catch (Exception e) {

			throw new InvalidException("Data inválida. Detalhes: " + e.getMessage());
		}
	}

	public ResponseEntity<Object> listNextAttendances(String clientId, Integer minutes) throws Exception {
		Date currentDate = Utils.getCurrentDate(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		Timestamp tsCurrentDate = new Timestamp(currentDate.getTime());
		List<Attendance> futureAttendances = repository.findByHealthInsuranceIdentificatorAndStatusAndType(clientId, AttendanceStatus.SCHEDULED, AttendanceType.ELECTIVE);
		Date localPlusMinutes = Utils.getCurrentDatePlusAdditionalTime(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()), minutes);		
		Timestamp ts = new Timestamp(localPlusMinutes.getTime());
		ArrayList<NextAttendancesResponseDto> dates = new ArrayList<NextAttendancesResponseDto>();
		if(!futureAttendances.isEmpty()){
			for (Attendance att : futureAttendances) {
				if(att.getSchedulingDate().before(ts) && att.getSchedulingDate().after(tsCurrentDate)){			
					NextAttendancesResponseDto nextAttendecesForm = new NextAttendancesResponseDto();
					nextAttendecesForm.setInsuredName(att.getInsured().getName());
					nextAttendecesForm.setProfessionalName(att.getProfessional().getName());
					nextAttendecesForm.setSpecialtyName(att.getSpecialty().getName());
					nextAttendecesForm.setHealthAttendanceId(att.getHealthAttendanceId());
					nextAttendecesForm.setHealthInsuranceNumber(att.getInsured().getHealthInsuranceNumber());
					Calendar calendar = new GregorianCalendar();
					calendar.setTimeInMillis(att.getSchedulingDate().getTime());
        			calendar.add(Calendar.HOUR, -3);
					Timestamp scheduleDateMinusThreeHours = new Timestamp(calendar.getTime().getTime());			
					nextAttendecesForm.setSchedulingDate(scheduleDateMinusThreeHours.toString());
					nextAttendecesForm.setPhoneNumber(att.getInsured().getLastPhoneNumber());
					dates.add(nextAttendecesForm);
				}			
			}
			return ResponseEntity.status(HttpStatus.OK).body(dates);
		}			
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failure");
	}
}
