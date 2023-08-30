package br.com.maidahealth.telemedapi.services;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ClientHttpRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.BodyInserter;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.AttendanceInsuredStatusForm;
import br.com.maidahealth.telemedapi.models.Association;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.AttendanceStatus;
import br.com.maidahealth.telemedapi.models.AttendanceType;
import br.com.maidahealth.telemedapi.models.DocwayWebhook;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.utils.TelemedServerResponseUtil;
import reactor.core.publisher.Mono;

@Service
@Primary
@Qualifier("docwayService")
public class DocwayService {

	@Autowired
	private AttendanceService attendanceService;
	
	@Autowired
	private DocwayWebhookService docwayWebhookService;
	
	private static String API_URL = "https://api.docway.com.br";
	
	@Value("${telemed.docway-env:hmg}")
	private String docwayEnv;
	
	@Autowired
	private TelemedClientApiContext context;
	
	public String getDockwayAccessToken() {
		WebClient webClient = WebClient.create(API_URL);

		LinkedMultiValueMap<String, String> map = new LinkedMultiValueMap<>();

		map.add("grant_type", "client_credentials");
		map.add("scope", "api1");

		BodyInserter<MultiValueMap<String, Object>, ClientHttpRequest> inserter2
		= BodyInserters.fromMultipartData(map);

		JsonNode obj = webClient.post()
				.uri(getDocwayUriPrefix() + "auth/connect/token")
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
				.header("Authorization", "Basic " + context.getApiConfiguration().getClientAccessKey())
				.body(inserter2)
				.retrieve()
				.bodyToMono(JsonNode.class)
				.block()
				;
		return obj.path("access_token").asText();
	}

	public Insured createInsured(Insured insured) {
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(API_URL);

		JsonObject jsonObject = JsonParser.parseString("{}").getAsJsonObject();
		
		String hin = StringUtils.isEmpty(insured.getHealthInsuranceNumber()) ? insured.getCpf() : insured.getHealthInsuranceNumber();
		
		jsonObject.addProperty("Name", insured.getName());
		jsonObject.addProperty("HealthInsuranceNumber", hin);

		JsonNode obj = webClient.post()
				.uri(getDocwayUriPrefix() + "client/api/patients")
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					System.out.println(response.bodyToFlux(Object.class));
					return Mono.error(new RuntimeException("4xx"));
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					System.out.println("5xx eror");
					return Mono.error(new RuntimeException("5xx"));
				})

				.bodyToMono(JsonNode.class)
				.block()
				;
		System.out.println("++++++++++++++++++++++++++++++++++");
		System.out.println(obj.toString());
		insured.setDocwayId(obj.get("id").asText());
		return insured;
	}

	public Attendance createAttendance(Attendance attendance, String reason, String healthInsuranceIdentificator) {
		// https://api.docway.com.br/stage-appointment/api/patients/{patientId}/appointments
		
		String accessToken = getDockwayAccessToken();

		WebClient webClient = WebClient.create(API_URL);

		JsonObject jsonObject = JsonParser.parseString("{}").getAsJsonObject();

		String insuredDocwayId = attendance.getInsured().getDocwayId();

		// TODO adicionar os campos restantes de atendimento
		jsonObject.addProperty("BuyerId", insuredDocwayId);
		jsonObject.addProperty("Status", 1);
		jsonObject.addProperty("Type", 6);
		jsonObject.add("Specialty", JsonParser.parseString("{ id: "+getSpecialty(attendance)+" }"));
		if(attendance.getSchedulingDate() != null) {
			jsonObject.addProperty("dateAppointment", formatSchedulingDate(attendance));
		}
		if(attendance.getProfessional() != null) {
			jsonObject.addProperty("SellerId", attendance.getProfessional().getDocwayId());
		}

		String addressString = "{ Street: \"Rua Teste\", Number: SN, complement: \"\", Neighborhood: \"Conjunto Teste\", Cep: \"60015-250\", City: \"Cidade Teste\", State: \"CE\" }";
		JsonElement addressJsonElement= JsonParser.parseString(addressString);

		jsonObject.add("Address", addressJsonElement);

		jsonObject.addProperty("ContactNumber", attendance.getInsured().getLastPhoneNumber());
		jsonObject.addProperty("Reason", reason);

		Mono<JsonNode> obj = null;
		System.out.println("JSON para docway: "+jsonObject.toString());
		obj = webClient.post()
				.uri(getDocwayUriPrefix() + "appointment/api/patients/" + insuredDocwayId + "/appointments")
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.exchange()
				.flatMap(response -> response.bodyToMono(JsonNode.class))
				;
		System.out.println("++++++++++++++++++++++++++++++++++");
		System.out.println(obj.toString());
		String json = obj.block().toString();
		JsonElement jsonElement = JsonParser.parseString(json);

		String attendanceDocwayId = "";
		try {
			attendanceDocwayId = jsonElement.getAsJsonObject().get("Validate").getAsJsonArray().get(0).getAsString();
		} catch (Exception e) {
			attendanceDocwayId = jsonElement.getAsJsonObject().get("id").getAsString();
		}
		
		try {
			Long.parseLong(attendanceDocwayId);
		} catch (NumberFormatException e) {
			throw new InvalidException("Erro ao registrar atendimento");
		}
		
		attendance.setDocwayId(attendanceDocwayId);

		return attendance;
	}

	private String formatSchedulingDate(Attendance attendance) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		format.setTimeZone(TimeZone.getTimeZone(context.getApiConfiguration().getTimezone()));
		String formatedDate = format.format(attendance.getSchedulingDate());
		System.out.println("Data formatada: "+formatedDate);
		return formatedDate;
	}

	private String getSpecialty(Attendance attendance) {
		Specialty specialty = attendance.getSpecialty();
		if(attendance.getType().equals(AttendanceType.ELECTIVE) && specialty != null && !StringUtils.isEmpty(specialty.getDocwayId())) {
			return specialty.getDocwayId();
		}
		return  "1";
	}

	public JsonNode getRoomData(Attendance attendance) {
		WebClient webClient = WebClient.create(API_URL);
		String accessToken = getDockwayAccessToken();

		JsonNode obj = webClient.get()

				.uri(getDocwayUriPrefix() + "appointment/api/appointments/" + attendance.getDocwayId() + "/video-token")
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					System.out.println(response.bodyToFlux(Object.class));
					return Mono.error(new RuntimeException("4xx"));
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					System.out.println("5xx eror");
					return Mono.error(new RuntimeException("5xx"));
				})

				.bodyToMono(JsonNode.class)
				.block()
				;
		System.out.println("++++++++++++++++++++++++++++++++++");
		System.out.println(obj.toString());
		return obj;
	}

	public void handleWebhook(JsonObject jsonObject) throws InvalidException {
		String eventType = jsonObject.get("eventType").getAsString();
		String attendanceDocwayId = getAttendanceExternalId(jsonObject);

		switch (eventType) {
		case "DOCTOR_VIDEO_ONLINE":
		case "PROFESSIONAL_WAITING":
			attendanceService.updateStatus(attendanceDocwayId, AttendanceStatus.WAITING_INSURED);
			break;				
		case "APPOINTMENT_FINISHED":
			attendanceService.updateStatus(attendanceDocwayId, AttendanceStatus.FINISHED);
			attendanceService.updateSickNotePrescriptionStatus(attendanceDocwayId);
			attendanceService.synchronizeServerAndClientAttendance(attendanceDocwayId);
			break;	
		case "DOCTOR_VIDEO_NOSHOW":
		case "NO_SHOW":
			attendanceService.updateStatus(attendanceDocwayId, AttendanceStatus.CANCELED, CancellingAttendanceReasonEnum.NO_SHOW);
			attendanceService.synchronizeServerAndClientAttendance(attendanceDocwayId);
			break;	
		case "APPOINTMENT_CANCELED_BY_MEDIA_ERROR":
			attendanceService.updateStatus(attendanceDocwayId, AttendanceStatus.CANCELED, CancellingAttendanceReasonEnum.CANCELED_BY_MEDIA_ERROR);
			attendanceService.synchronizeServerAndClientAttendance(attendanceDocwayId);
			break;
		case "APPOINTMENT_CANCELED":
			attendanceService.updateStatus(attendanceDocwayId, AttendanceStatus.CANCELED, CancellingAttendanceReasonEnum.CANCELED_BY_PROFESSIONAL);
			attendanceService.synchronizeServerAndClientAttendance(attendanceDocwayId);
			break;
			
		default:
			break;
		}
		
		saveWebhook(eventType, attendanceDocwayId, jsonObject);
		
	}

	private String getAttendanceExternalId(JsonObject jsonObject) {
		String attendanceExternalId = "";
		if(jsonObject.get("resource") != null) {
			attendanceExternalId = jsonObject.get("resource").getAsJsonObject().get("appointment").getAsString();
		}else {
			attendanceExternalId = jsonObject.get("appointment").getAsString();
		}
		return attendanceExternalId;
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

	public TelemedServerResponseUtil cancel(Attendance attendance, CancellingAttendanceReasonEnum reason, String reasonString) {
		// https://api.docway.com.br/stage-appointment/api/appointments/11158/cancel
		String accessToken = getDockwayAccessToken();
		WebClient webClient = WebClient.create(API_URL);

		JsonObject jsonObject = JsonParser.parseString("{}").getAsJsonObject();

		jsonObject.addProperty("CancelReason", reasonString);

		JsonNode obj = webClient.post()
				.uri(getDocwayUriPrefix() + "appointment/api/appointments/" + attendance.getDocwayId() + "/cancel")
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.body(BodyInserters.fromValue(jsonObject.toString()))

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.retrieve()

				.bodyToMono(JsonNode.class)
				.block()
				;
		
		System.out.println(obj.toString());
		return null;
	}
	
	public JsonNode getDocwayAttendance(Attendance attendance) {
		WebClient webClient = WebClient.create(API_URL);
		String accessToken = getDockwayAccessToken();

		JsonNode obj = webClient.get()

				.uri(getDocwayUriPrefix() + "appointment/api/appointments/" + attendance.getDocwayId() + "/details")
				.header("Content-Type", "application/json")
				.header("Accept", "application/json")
				.header("Authorization", "Bearer " + accessToken)

				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.retrieve()

				.onStatus(HttpStatus::is4xxClientError, response -> {
					System.out.println(response.bodyToFlux(Object.class));
					return Mono.error(new RuntimeException("4xx"));
				})
				.onStatus(HttpStatus::is5xxServerError, response -> {
					System.out.println("5xx eror");
					return Mono.error(new RuntimeException("5xx"));
				})

				.bodyToMono(JsonNode.class)
				.block()
				;
		System.out.println("++++++++++++++++++++++++++++++++++");
		System.out.println(obj.toString());
		return obj;
	}
	
	private String getDocwayUriPrefix() {
		Boolean isProduction = docwayEnv != null && docwayEnv.equals("prd");
		
		return isProduction ? "" : "stage-";
	}

	public boolean isWebhookTokenValid(String token) {
		return context.getApiConfiguration().getServerApiWebhookToken().equals(token);
	}

	public JsonObject getProfessionalJsonObject(JsonNode jsonNode) {
		return JsonParser.parseString(jsonNode.toPrettyString()).getAsJsonObject().get("doctor").getAsJsonObject();
	}

	public Professional getProfessionalModel(JsonObject professionalObject) {
		Professional p = new Professional();
		p.setName(professionalObject.get("name").getAsString());
		p.setAssociationNumber(professionalObject.get("crm").getAsString());
		p.setUfCrm(professionalObject.get("crmUF").getAsString());
		p.setDocwayId(professionalObject.get("id").getAsString());
		p.setAssociation(Association.CRM);
		return p;
	}

	// @Override
	// public JsonNode getAttendanceSickNotePrescriptionStatus(Attendance attendance) {
	// 	// Docway nao possui esse servico.

	// 	return null;
	// }

	// @Override
	// public boolean updateMediaAndPhoneNumber(Attendance attendance) {
	// 	// Docway nao possui esse servico.
	// 	return true;
	// }

	// @Override
	// public JsonNode createTestRoom() {
	// 	// Docway nao possui esse servico.
	// 	return null;
	// }

    // @Override
    // public TelemedServerResponseUtil changePatientStatus(Long attendanceId, AttendanceInsuredStatusForm form) {
	// 	// Docway nao possui esse servico.
	// 	return null;
    // }

	// @Override
	// public TelemedServerResponseUtil getProfessional(String cpf) {
	// 	return null;
	// }

	// @Override
	// public JsonNode getInviteRoomData(Attendance attendance, String inviteIdentity){
	// 	return null;
	// }

	// public TelemedServerResponseUtil updateAttendanceProfessional(String attendanceId, String professionalId) {
	// 	return null;
	// }
}