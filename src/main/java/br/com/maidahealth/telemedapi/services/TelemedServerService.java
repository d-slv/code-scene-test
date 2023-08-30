package br.com.maidahealth.telemedapi.services;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.TimeZone;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.POJONode;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.dto.AttendanceGuestsDto;
import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.exceptions.NotAuthorizedException;
import br.com.maidahealth.telemedapi.exceptions.WebClientError;
import br.com.maidahealth.telemedapi.form.AttachmentListForm;
import br.com.maidahealth.telemedapi.form.AttachmentViewerForm;
import br.com.maidahealth.telemedapi.form.AttendanceInsuredStatusForm;
import br.com.maidahealth.telemedapi.form.ClientAttendanceCancelingForm;
import br.com.maidahealth.telemedapi.form.ClientInsuredForm;
import br.com.maidahealth.telemedapi.form.LocalChatCreationForm;
import br.com.maidahealth.telemedapi.form.ProfessionalForm;
import br.com.maidahealth.telemedapi.form.ProfileUpdateForm;
import br.com.maidahealth.telemedapi.models.ApiConfiguration;
import br.com.maidahealth.telemedapi.models.Association;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.DocwayWebhook;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.InsuredType;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.utils.TelemedServerResponseUtil;
import br.com.maidahealth.telemedapi.utils.Utils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
// @Qualifier("telemedServerService")
public class TelemedServerService {

	// TODO: Add opção de ligar e desligar log via db e context para logs
	// informativos
	private static final Logger LOG = LoggerFactory.getLogger(TelemedServerService.class);

	@Autowired
	private AttendanceService attendanceService;

	@Autowired
	private DocwayWebhookService docwayWebhookService;

	@Autowired
	private TelemedClientApiContext context;

	private JsonNode authenticateOnServerApi(String accessKey, WebClient webClient) {
		return webClient.post().uri("auth/token")
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
				.header("accessKey", accessKey).retrieve().onStatus(HttpStatus::is4xxClientError, response -> {
					if (response.statusCode().equals(HttpStatus.UNAUTHORIZED))
						throw new NotAuthorizedException();
					else
						throw new InvalidException("Erro ao buscar token");
				}).bodyToMono(JsonNode.class).block();
	}

	public JsonNode getDocwayAcessTokenByClientToken(String accessKey) {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());
		JsonNode resp = authenticateOnServerApi(accessKey, webClient);
		return resp;
	}

	public String getMaidaAccessToken(String healthInsuranceIdentificator) {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());
		return authenticateOnServerApi(healthInsuranceIdentificator, webClient).path("token").asText();
	}

	public JsonNode getDocwayAccessTokenByClientTokenAndServerUrl(String accessKey, String serverApiUrl) {
		WebClient webClient = WebClient.create(serverApiUrl);
		JsonNode resp = authenticateOnServerApi(accessKey, webClient);
		return resp;
	}

	public String getDockwayAccessToken() {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());
		return authenticateOnServerApi(context.getApiConfiguration().getClientAccessKey(), webClient).path("token")
				.asText();
	}

	public Insured createInsured(Insured insured) {
		if (InsuredType.DEPENDENT.equals(insured.getType())) {
			return createInsuredDependent(insured);
		} else {
			return createInsuredHolder(insured);
		}
	}

	private Insured createInsuredHolder(Insured insured) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		JsonObject jsonObject = JsonParser.parseString("{}").getAsJsonObject();

		String hin = StringUtils.isEmpty(insured.getHealthInsuranceNumber()) ? insured.getCpf()
				: insured.getHealthInsuranceNumber();

		jsonObject.addProperty("name", insured.getName());
		jsonObject.addProperty("healthInsuranceNumber", hin);
		jsonObject.addProperty("cpf", insured.getCpf());
		jsonObject.addProperty("email", insured.getUser().getEmail());

		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String formattedDate = formatter.format(insured.getBirthDate());

		jsonObject.addProperty("birthdate", formattedDate);

		JsonNode obj = webClient.post().uri("patients").header("Content-Type", "application/json")
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return Mono.error(new RuntimeException("4xx"));
				}).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				})

				.bodyToMono(JsonNode.class).block();

		insured.setDocwayId(obj.get("id").asText());
		return insured;
	}

	private Insured createInsuredDependent(Insured insured) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		JsonObject jsonObject = JsonParser.parseString("{}").getAsJsonObject();

		String hin = StringUtils.isEmpty(insured.getHealthInsuranceNumber()) ? insured.getCpf()
				: insured.getHealthInsuranceNumber();

		jsonObject.addProperty("name", insured.getName());
		jsonObject.addProperty("healthInsuranceNumber", hin);
		jsonObject.addProperty("cpf", insured.getCpf());
		jsonObject.addProperty("email", insured.getUser().getEmail());

		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String formattedDate = formatter.format(insured.getBirthDate());

		jsonObject.addProperty("birthdate", formattedDate);

		JsonNode obj = webClient.post().uri("patients/" + insured.getHolder().getDocwayId() + "/dependents")
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return Mono.error(new RuntimeException("4xx"));
				}).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				})

				.bodyToMono(JsonNode.class).block();

		insured.setDocwayId(obj.get("id").asText());
		return insured;
	}

	public Attendance createAttendance(Attendance attendance, String reason, String healthInsuranceIdentificator) {
		LOG.info("==================== Telemed Server Service ====================");
        LOG.info(">>> createAttendance <<<");
		LOG.info(" Attendance Id: " + attendance.getHealthAttendanceId());

		String accessToken = null;
		if (healthInsuranceIdentificator == null) {
			accessToken = getDockwayAccessToken();
		} else {
			accessToken = getMaidaAccessToken(healthInsuranceIdentificator);
		}

		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		JsonObject jsonObject = JsonParser.parseString("{}").getAsJsonObject();

		String insuredDocwayId = attendance.getInsured().getDocwayId();

		jsonObject.addProperty("patientId", insuredDocwayId);
		jsonObject.addProperty("phoneNumber", attendance.getInsured().getLastPhoneNumber());

		jsonObject.addProperty("specialtyId", getSpecialty(attendance));		
		
		jsonObject.addProperty("type", attendance.getType().name());

		String addressString = "{ street: \"Rua Teste\", number: SN, complement: \"\", neighborhood: \"Conjunto Teste\", zipCode: \"60015-250\", city: \"Cidade Teste\", state: \"CE\", fullAddress: \"Av nome, 2863. Teresina-PI...\" }";
		JsonElement addressJsonElement = JsonParser.parseString(addressString);
		jsonObject.add("Address", addressJsonElement);
		jsonObject.addProperty("enabledMedia", attendance.getEnabledMedia());
		jsonObject.addProperty("userSessionId", attendance.getChatbotId());

		if (attendance.getSchedulingDate() != null) {
			jsonObject.addProperty("schedulingDate", formatSchedulingDate(attendance));
			jsonObject.addProperty("hour", formatSchedulingHour(attendance));
		}

		if (attendance.getSchedulingType() != null) {
			jsonObject.addProperty("schedulingType", attendance.getSchedulingType().getDescription());
		}

		if (attendance.getReturnReason() != null) {
			jsonObject.addProperty("returnReason", attendance.getReturnReason().getDescription());
		}

		if (attendance.getProfessional() != null) {
			jsonObject.addProperty("professionalId", attendance.getProfessional().getDocwayId());
		}

		jsonObject.addProperty("healthAttendanceId", attendance.getHealthAttendanceId());

		// LOG.info("###Tentativa de criação de atendimento####\\nbody from
		// client:{}\n##############",jsonObject);

		ClientResponse response = webClient.post().uri("appointments").header("Content-Type", "application/json")
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).exchange().block();

		HttpStatus status = response.statusCode();
		JsonNode obj = response.bodyToMono(JsonNode.class).block();
		
		if (status.isError()) {
			LOG.error(" Tentativa de criação falhou: " + obj.get(0).get("error").asText());
			throw new WebClientError("Erro ao comunicar com o server: " + obj.get(0).get("error").asText(), status, obj);
		}

		// LOG.info("###Tentativa de criação Passou####\nstatus from server:{}\nbody
		// from server:{}\n##############",status,obj);

		JsonElement jsonElement = JsonParser.parseString(obj.toString());

		String attendanceDocwayId = "";

		if (jsonElement.isJsonObject()) {
			attendanceDocwayId = jsonElement.getAsJsonObject().get("id").getAsString();
		} else if (jsonElement.isJsonArray()) {
			LOG.error(" Responsta inválida: o objeto de resposta não é do tipo json" );
			throw new InvalidException(
					jsonElement.getAsJsonArray().iterator().next().getAsJsonObject().get("error").getAsString());

		}

		attendance.setDocwayId(attendanceDocwayId);
		LOG.error(" >>> Success <<<");
		LOG.info("==================== Return to Booking Attendance Service ====================");
		return attendance;
	}

	private String formatSchedulingDate(Attendance attendance) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		format.setTimeZone(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		String formatedDate = format.format(attendance.getSchedulingDate());

		return formatedDate;
	}

	private String formatSchedulingHour(Attendance attendance) {
		SimpleDateFormat format = new SimpleDateFormat("HH:mm");
		format.setTimeZone(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		String formatedDate = format.format(attendance.getSchedulingDate());

		return formatedDate;
	}

	private String getSpecialty(Attendance attendance) {
		Specialty specialty = attendance.getSpecialty();
		return specialty.getExternalId();
	}

	public JsonNode getRoomData(Attendance attendance) {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());
		String accessToken = null;

		if (attendance.getHealthInsuranceIdentificator() != null)
			accessToken = getMaidaAccessToken(attendance.getHealthInsuranceIdentificator());
		else {
			accessToken = getDockwayAccessToken();
		}

		JsonNode obj = webClient.get().uri("appointments/" + attendance.getDocwayId() + "/start")
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return Mono.error(new RuntimeException("4xx"));
				}).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				})

				.bodyToMono(JsonNode.class).block();

		return obj;
	}

	public JsonNode getInviteRoomData(Attendance attendance, String inviteIdentity) {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());
		String accessToken = getDockwayAccessToken();

		JsonNode obj = webClient.get()

				.uri("appointments/patient-invite-room?id=" + attendance.getDocwayId() + "&invite=" + inviteIdentity)
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return Mono.error(new RuntimeException("4xx"));
				}).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				})

				.bodyToMono(JsonNode.class).block();

		return obj;
	}

	public void handleWebhook(JsonObject jsonObject) throws InvalidException {
		String eventType = jsonObject.get("eventType").getAsString();
		String attendanceDocwayId = jsonObject.get("resource").getAsJsonObject().get("appointment").getAsString();

		switch (eventType) {
		case "DOCTOR_VIDEO_ONLINE":
		case "PROFESSIONAL_WAITING":
			attendanceService.updateStatus(attendanceDocwayId, AttendanceStatus.WAITING_INSURED);
			break;
		case "APPOINTMENT_FINISHED":
			attendanceService.updateStatus(attendanceDocwayId, AttendanceStatus.FINISHED);
			attendanceService.updateSickNotePrescriptionStatus(attendanceDocwayId);
			break;
		case "DOCTOR_VIDEO_NOSHOW":
		case "NO_SHOW":
			attendanceService.updateStatus(attendanceDocwayId, AttendanceStatus.CANCELED,
					CancellingAttendanceReasonEnum.NO_SHOW);
			break;
		case "APPOINTMENT_CANCELED_BY_MEDIA_ERROR":
			attendanceService.updateStatus(attendanceDocwayId, AttendanceStatus.CANCELED,
					CancellingAttendanceReasonEnum.CANCELED_BY_MEDIA_ERROR);
			break;
		case "APPOINTMENT_CANCELED":
			attendanceService.updateStatus(attendanceDocwayId, AttendanceStatus.CANCELED,
					CancellingAttendanceReasonEnum.CANCELED_BY_PROFESSIONAL);
			break;

		default:
			break;
		}

		saveWebhook(eventType, attendanceDocwayId, jsonObject);

	}

	private void saveWebhook(String eventType, String attendanceDocwayId, JsonObject jsonObject) {
		DocwayWebhook docwayWebhook = new DocwayWebhook();

		try {
			docwayWebhook.setEventType(eventType);
			docwayWebhook.setAppointment(attendanceDocwayId);

			String date = jsonObject.get("date").getAsString();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
			Date birthDate = sdf.parse(date);
			docwayWebhook.setDate(birthDate);
		} catch (Exception e) {
			// e.printStackTrace();
		}

		docwayWebhook.setContent(jsonObject.toString());

		docwayWebhookService.save(docwayWebhook);
	}

	public TelemedServerResponseUtil cancel(Attendance attendance, CancellingAttendanceReasonEnum reason,
			String additionalInfo) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		JsonObject jsonObject = JsonParser.parseString("{}").getAsJsonObject();

		jsonObject.addProperty("reason", reason.name());
		jsonObject.addProperty("additionalInfo", additionalInfo);

		ClientResponse response = webClient.post().uri("appointments/" + attendance.getDocwayId() + "/cancel")
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;

	}

	public JsonNode getAttendanceSickNotePrescriptionStatus(Attendance attendance) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		return webClient.get().uri("appointments/" + attendance.getDocwayId() + "/sick-note-prescription-status")
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken).retrieve()
				.onStatus(HttpStatus::is4xxClientError, response -> {
					LOG.error("Erro :: Não foi possível encontrar atendimento para o id {}", attendance.getDocwayId());
					return Mono.error(new EntityNotFoundException("Atendimento não encontrado"));
				}).bodyToMono(JsonNode.class).block();
	}

	public JsonNode getDocwayAttendance(Attendance attendance) {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());
		String accessToken = getDockwayAccessToken();

		JsonNode obj = webClient.get().uri("appointments/" + attendance.getDocwayId())
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					return Mono.error(new RuntimeException("4xx"));
				}).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				})

				.bodyToMono(JsonNode.class).block();

		return obj;
	}

	public boolean isWebhookTokenValid(String token) {
		return context.getApiConfiguration().getServerApiWebhookToken().equals(token);
	}

	public JsonObject getProfessionalJsonObject(JsonNode jsonNode) {
		return JsonParser.parseString(jsonNode.toPrettyString()).getAsJsonObject().get("professional")
				.getAsJsonObject();
	}

	public Professional getProfessionalModel(JsonObject professionalObject) {
		Professional p = new Professional();
		p.setName(professionalObject.get("name").getAsString());
		p.setAssociationNumber(professionalObject.get("associationNumber").getAsString());
		p.setUfCrm(professionalObject.get("associationUF").getAsString());
		p.setDocwayId(professionalObject.get("id").getAsString());
		p.setAssociation(Association.CRM);
		p.setCpf(!professionalObject.get("cpf").isJsonNull() ? professionalObject.get("cpf").getAsString() : null);
		p.setNickName(
				!professionalObject.get("nickname").isJsonNull() ? professionalObject.get("nickname").getAsString()
						: null);
		p.setEmail(
				!professionalObject.get("email").isJsonNull() ? professionalObject.get("email").getAsString() : null);
		p.setPhoneNumber(!professionalObject.get("phoneNumber").isJsonNull()
				? professionalObject.get("phoneNumber").getAsString()
				: null);
		return p;
	}

	public void validateServerApiAccessToken(String token) {
		try {
			if (token == null)
				throw new NotAuthorizedException();
			if (context.getApiConfiguration().getClientAccessKey().equals(token.replace("Bearer ", "")))
				return;
		} catch (Exception e) {
		}

		throw new NotAuthorizedException();
	}

	public void setPatientOnline(Long attId) {
		String accessToken = getDockwayAccessToken();

		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		Attendance att = attendanceService.findById(attId);

		webClient.put().uri("appointments/" + att.getDocwayId() + "/patient-online")
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).retrieve()
				.onStatus(HttpStatus::is4xxClientError, response -> {
					return Mono.error(new RuntimeException("4xx"));
				}).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				}).bodyToMono(JsonNode.class).block();
	}

	public TelemedServerResponseUtil cancelClientAttendance(Attendance attendance,
			@Valid ClientAttendanceCancelingForm form) {
		return cancel(attendance, CancellingAttendanceReasonEnum.CANCELED_BY_CLIENT, form.getAdditionalInfo());
	}

	public TelemedServerResponseUtil saveHolder(@Valid Object form, String healthInsuranceIdentificator) {
		LOG.info("==================== Telemed Server Service ====================");
		LOG.info("##### saveHolder #####");
		String accessToken = null;
		if (healthInsuranceIdentificator != null) {
			accessToken = getMaidaAccessToken(healthInsuranceIdentificator);
		} else {
			accessToken = getDockwayAccessToken();
		}

		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		Gson gson = new Gson();
		JsonObject jsonObject = JsonParser.parseString(gson.toJson(form).toString()).getAsJsonObject();

		ClientResponse response = webClient.post().uri("patients").header("Content-Type", "application/json")
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;
	}

	public TelemedServerResponseUtil saveDependent(@Valid Object form, String holderId) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		Gson gson = new Gson();
		JsonObject jsonObject = JsonParser.parseString(gson.toJson(form).toString()).getAsJsonObject();

		ClientResponse response = webClient.post().uri("patients/" + holderId + "/dependents")
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;
	}

	public TelemedServerResponseUtil update(ClientInsuredForm form) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		Gson gson = new Gson();
		JsonObject jsonObject = JsonParser.parseString(gson.toJson(form).toString()).getAsJsonObject();

		ClientResponse response = webClient.put().uri("patients").header("Content-Type", "application/json")
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;
	}

	public Flux<DataBuffer> downloadDocument(String docwayId, Integer index, String documentType) {
		String accessToken = getDockwayAccessToken();
		String uriPattern = "download/%s/%s/%s";
		String uri = String.format(uriPattern, docwayId, index, "pr");

		if (documentType.equalsIgnoreCase("sicknote")) {
			uri = String.format(uriPattern, docwayId, index, "sn");
		}

		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		return webClient.get().uri(uri).headers(httpHeaders -> {
			httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_OCTET_STREAM_VALUE);
			httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
		}).retrieve().onStatus(HttpStatus::is4xxClientError, response -> {
			return Mono.error(new RuntimeException("4xx"));
		}).onStatus(HttpStatus::is5xxServerError, response -> {
			return Mono.error(new RuntimeException("5xx"));
		}).bodyToFlux(DataBuffer.class);
	}

	public JsonNode getAttendanceMedicalRecord(String id) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		return webClient.get().uri("appointments/" + id + "/medical-record").headers(httpHeaders -> {
			httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
		}).retrieve().onStatus(HttpStatus::is4xxClientError,
				response -> response.bodyToMono(JsonNode.class).flatMap(body -> {
					LOG.error("Error :: {}", body.toPrettyString());
					return Mono.error(new EntityNotFoundException(body.path("erro").toString()));
				})).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				}).bodyToMono(JsonNode.class).block();
	}

	public TelemedServerResponseUtil getClientProfessionals() {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.builder()
				.exchangeStrategies(ExchangeStrategies.builder()
						.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024)).build())
				.baseUrl(context.getApiConfiguration().getServerApiUrl()).build();

		// WebClient webClient =
		// WebClient.create(context.getApiConfiguration().getServerApiUrl());

		ClientResponse response = webClient.get().uri("professionals/all").header("Content-Type", "application/json")
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;
	}

	public TelemedServerResponseUtil getClientSpecialtiesPrices() {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		ClientResponse response = webClient.get().uri("specialty-appointment-value")
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;
	}
	

	public JsonNode getAttendancePrescriptionsByCpf(String uri) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		return webClient.get().uri(uri).headers(httpHeaders -> {
			httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
		}).retrieve().onStatus(HttpStatus::is4xxClientError,
				response -> response.bodyToMono(JsonNode.class).flatMap(body -> {
					LOG.error("Error :: {}", body.toPrettyString());
					return Mono.error(new EntityNotFoundException(body.path("erro").toString()));
				})).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				}).bodyToMono(JsonNode.class).block();
	}

	public JsonNode getAttendancePrescriptionSicknoteExam(String uri) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		return webClient.get().uri(uri).headers(httpHeaders -> {
			httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
		}).retrieve().onStatus(HttpStatus::is4xxClientError,
				response -> response.bodyToMono(JsonNode.class).flatMap(body -> {
					LOG.error("Error :: {}", body.toPrettyString());
					return Mono.error(new EntityNotFoundException(body.path("erro").toString()));
				})).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				}).bodyToMono(JsonNode.class).block();
	}

	public TelemedServerResponseUtil sendWebHookConfigToServerApi(String accessToken, String serverApiUrl,
			String clientApiUrl, String serverApiWebhookToken) {
		WebClient webClient = WebClient.create(serverApiUrl);

		Map<String, String> map = new HashMap<String, String>();
		map.put("url", clientApiUrl + "/webhook");
		map.put("token", serverApiWebhookToken);

		Gson gson = new Gson();
		JsonObject jsonObject = JsonParser.parseString(gson.toJson(map).toString()).getAsJsonObject();

		ClientResponse response = webClient.post().uri("webhook/config").header("Content-Type", "application/json")
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;

	}

	public TelemedServerResponseUtil sendChatbotToServerApi(String accessKey, Object jsonValues) {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		ClientResponse response = webClient.post().uri("webhook/chatbot").headers(httpHeaders -> {
			httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessKey);
		}).body(BodyInserters.fromValue(jsonValues)).exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;
	}

	public boolean updateMediaAndPhoneNumber(Attendance attendance) {
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());
		String accessToken = getDockwayAccessToken();
		String attendanceContactNumber = attendance.getContactNumber();
		String phoneNumber = Optional.of(attendance).map(Attendance::getInsured).map(Insured::getLastPhoneNumber)
				.orElse(attendanceContactNumber);
		String templateBodyString = String.format("{\"mediaEnabled\": %1$b,\"contactNumber\": \"%2$s\"}", true,
				phoneNumber);
		JsonNode jsonBody = new POJONode("");
		try {
			jsonBody = new ObjectMapper().readTree(templateBodyString);
		} catch (JsonProcessingException e) {
			LOG.error("Erro:: {}, unable to parse string to json", TelemedServerService.class.getSimpleName());
		}

		ClientResponse response = webClient.put()
				.uri("appointments/{id}/update-media-and-phone", attendance.getDocwayId())
				.body(Mono.just(jsonBody), JsonNode.class).headers(httpHeaders -> {
					httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
					httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
					httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
				}).exchange().block();

		HttpStatus status = Optional.ofNullable(response).map(ClientResponse::statusCode)
				.orElse(HttpStatus.BAD_REQUEST);
		return status.is2xxSuccessful();
	}

	public TelemedServerResponseUtil updateProfile(String id, ProfileUpdateForm form) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		Gson gson = new Gson();
		JsonObject jsonObject = JsonParser.parseString(gson.toJson(form).toString()).getAsJsonObject();

		ClientResponse response = webClient.put().uri("patients/{id}/profile", id).headers(httpHeaders -> {
			httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
		})

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;
	}

	public JsonNode checkAttendanceVideoCallEnded(Attendance attendance) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		return webClient.get().uri("appointments/" + attendance.getDocwayId() + "/check-video-call-ended")
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken).retrieve()
				.onStatus(HttpStatus::is4xxClientError, response -> {
					LOG.error("Erro :: Não foi possível encontrar atendimento para o id {}", attendance.getDocwayId());
					return Mono.error(new EntityNotFoundException("Atendimento não encontrado"));
				}).bodyToMono(JsonNode.class).block();
	}

	public TelemedServerResponseUtil getPatient(String publicId) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		ClientResponse response = webClient.get()
				.uri(uriBuilder -> uriBuilder.path("/patients/{publicId}").build(publicId))
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).exchange().block();

		HttpStatus status = response != null ? response.statusCode() : null;
		String responseBody = response != null ? response.bodyToMono(String.class).block() : null;

		return new TelemedServerResponseUtil(status, responseBody);
	}

	public JsonObject createProfessional(ProfessionalForm professional) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		Gson gson = new Gson();
		JsonObject jsonObject = JsonParser.parseString(gson.toJson(professional).toString()).getAsJsonObject();

		JsonNode jsonNode = webClient.post().uri("professionals/create").header("Content-Type", "application/json")
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).retrieve()

				.onStatus(HttpStatus::is4xxClientError,
						response -> response.bodyToMono(JsonNode.class).flatMap(body -> {
							LOG.error("Error :: {}", body.toPrettyString());
							throw new InvalidException(body.path("error").asText());
						}))
				.onStatus(HttpStatus::is5xxServerError, response -> Mono.error(new RuntimeException("5xx")))

				.bodyToMono(JsonNode.class).block();

		return JsonParser.parseString(jsonNode.toPrettyString()).getAsJsonObject();
	}

	public JsonNode updateProfessional(String id, ProfessionalForm professional) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		Gson gson = new Gson();
		JsonObject jsonObject = JsonParser.parseString(gson.toJson(professional).toString()).getAsJsonObject();

		return webClient.put().uri("professionals/update/" + id).header("Content-Type", "application/json")
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).retrieve()

				.onStatus(HttpStatus::is4xxClientError,
						response -> response.bodyToMono(JsonNode.class).flatMap(body -> {
							LOG.error("Error :: {}", body.toPrettyString());
							throw new InvalidException(body.path("error").asText());
						}))
				.onStatus(HttpStatus::is5xxServerError, response -> Mono.error(new RuntimeException("5xx")))

				.bodyToMono(JsonNode.class).block();
	}

	public JsonNode resetPasswordProfessional(String id) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		return webClient.put().uri("professionals/reset-password/" + id).header("Content-Type", "application/json")
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).retrieve()
				.onStatus(HttpStatus::is4xxClientError,
						response -> response.bodyToMono(JsonNode.class).flatMap(body -> {
							LOG.error("Error :: {}", body.toPrettyString());
							throw new InvalidException(body.path("error").asText());
						}))
				.onStatus(HttpStatus::is5xxServerError, response -> Mono.error(new RuntimeException("5xx")))

				.bodyToMono(JsonNode.class).block();
	}

	public TelemedServerResponseUtil getProfessional(String cpf) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		ClientResponse response = webClient.get().uri("professionals?cpf=" + cpf)
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;
	}

	public JsonNode createTestRoom() {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		return webClient.get().uri("appointments/test-room").headers(httpHeaders -> {
			httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
			httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
		}).retrieve().onStatus(HttpStatus::is4xxClientError,
				response -> response.bodyToMono(JsonNode.class).flatMap(body -> {
					LOG.error("Error :: {}", body.toPrettyString());
					return Mono.error(new EntityNotFoundException(body.path("erro").toString()));
				})).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				}).bodyToMono(JsonNode.class).block();
	}

	public TelemedServerResponseUtil changePatientStatus(Long attendanceId, AttendanceInsuredStatusForm form) {

		String accessToken = getDockwayAccessToken();

		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());
		Attendance att = attendanceService.findById(attendanceId);

		Map<String, String> map = new HashMap<String, String>();
		map.put("status", form.getStatus());
		map.put("appointment", att.getDocwayId());

		Gson gson = new Gson();
		JsonObject jsonObject = JsonParser.parseString(gson.toJson(map)).getAsJsonObject();

		ClientResponse response = webClient.put().uri("appointments/change-patient-status")
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.body(BodyInserters.fromValue(jsonObject.toString())).exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		return new TelemedServerResponseUtil(status, responseBody);
	}

	public String currentAttendance(Professional professional) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		JsonNode node = webClient.get().uri("professionals/" + professional.getDocwayId() + "/current-appointment")
				.headers(httpHeaders -> {
					httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
					httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
					httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
				}).retrieve().onStatus(HttpStatus::is4xxClientError,
						response -> response.bodyToMono(JsonNode.class).flatMap(body -> {
							throw new InvalidException("Erro 400");
						}))
				.onStatus(HttpStatus::is5xxServerError, response -> {
					throw new InvalidException("Erro 500");
				}).bodyToMono(JsonNode.class).block();

		return node.get("id").asText();
	}

	public ClientResponse retrieveReportDaily(Date date) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		ClientResponse response = webClient.get().uri("admin/report/daily?date=" + sdf.format(date))
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken).exchange()
				.block();

		return response;
	}

	public ClientResponse retrieveReportAccumulated(Date date) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		ClientResponse response = webClient.get().uri("admin/report/accumulated?date=" + sdf.format(date))
				.header("Accept", "application/json").header("Authorization", "Bearer " + accessToken).exchange()
				.block();

		return response;
	}

	public TelemedServerResponseUtil updateAttendanceProfessional(String attendanceId, String professionalId) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

		Map<String, String> map = new HashMap<String, String>();
		map.put("professionalPublicId", professionalId);

		Gson gson = new Gson();
		// JsonObject jsonObject =
		// JsonParser.parseString(gson.toJson(map)).getAsJsonObject();

		ClientResponse response = webClient.post().uri("appointments/" + attendanceId + "/change-professional")
				.header("Content-Type", "application/json").header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(gson.toJson(map)))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).exchange().block();

		HttpStatus status = response.statusCode();
		String responseBody = response.bodyToMono(String.class).block();

		TelemedServerResponseUtil resp = new TelemedServerResponseUtil(status, responseBody);

		return resp;
	}

	public void syncAttendanceWithServer(AttachmentListForm listForm, String docwayId) {

		ApiConfiguration config = Utils.getConfig();

		String accessToken = getDockwayAccessToken();

		WebClient webclient = WebClient.create(config.getServerApiUrl());

		ClientResponse response = webclient.post().uri("appointments/" + docwayId + "/attachment?sync=false")
				.header("Authorization", "Bearer " + accessToken)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).header("Accept", "application/json")
				.body(BodyInserters.fromValue(listForm)).exchange().block();

		HttpStatus status = response.statusCode();

		if (status.isError()) {
			throw new WebClientError("Falha ou enviar para Server", status,
					response.bodyToMono(JsonNode.class).block());
			// TODO criar error de servidor ( telemedServerError(HttpStatus, Body))
			// throw new InvalidException("Erro ao enviar para API Server");
		}
	}

	public void syncAttachmentViewWithServer(AttachmentViewerForm form) {

		ApiConfiguration config = Utils.getConfig();

		String accessToken = getDockwayAccessToken();

		WebClient webclient = WebClient.create(config.getServerApiUrl());

		ClientResponse response = webclient.post().uri("appointments/sync/attachment-view")
				.header("Authorization", "Bearer " + accessToken)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).header("Accept", "application/json")
				.body(BodyInserters.fromValue(form)).exchange().block();

		HttpStatus status = response.statusCode();

		if (status.isError()) {
			// TODO criar error de servidor ( telemedServerError(HttpStatus, Body))
			throw new InvalidException("Erro ao sincronizar visualização de anexo para Server");
		}
	}

	public void syncCreatedChatWithServer(LocalChatCreationForm form) {

		ApiConfiguration config = Utils.getConfig();

		String accessToken = getDockwayAccessToken();

		WebClient webclient = WebClient.create(config.getServerApiUrl());

		ClientResponse response = webclient.post().uri("chat/sync/created-chat")
				.header("Authorization", "Bearer " + accessToken)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).header("Accept", "application/json")
				.body(BodyInserters.fromValue(form)).exchange().block();

		HttpStatus status = response.statusCode();

		if (status.isError()) {
			// TODO criar error de servidor ( telemedServerError(HttpStatus, Body))
			throw new InvalidException("Erro ao sincronizar criação de chat com a Server");
		}
	}

	public AttendanceGuestsDto getAppointmentGuests(String docwayId) {
		ApiConfiguration config = Utils.getConfig();

		String clientApiUrl = config.getServerApiUrl();
		String accessToken = getDockwayAccessToken();

		WebClient webClient = WebClient.create(clientApiUrl);

		return webClient.get().uri("/appointments/guests/" + docwayId).header("Content-Type", "application/json")
				.header("Accept", "application/json").header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.header("Authorization", "Bearer " + accessToken)

				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					throw new InvalidException("appointment_uuid: " + docwayId + "'' invalid");
				}).onStatus(HttpStatus::is5xxServerError, response -> {
					return Mono.error(new RuntimeException("5xx"));
				})

				.bodyToMono(AttendanceGuestsDto.class).block();

	}
}
