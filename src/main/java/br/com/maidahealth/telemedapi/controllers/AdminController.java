package br.com.maidahealth.telemedapi.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.ClientResponse;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.exceptions.NotAuthorizedException;
import br.com.maidahealth.telemedapi.form.ApiConfigurationForm;
import br.com.maidahealth.telemedapi.form.SensediaConfigurationForm;
import br.com.maidahealth.telemedapi.models.ApiConfiguration;
import br.com.maidahealth.telemedapi.models.Association;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Provider;
import br.com.maidahealth.telemedapi.models.SensediaConfiguration;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.repositories.ApiConfigurationRepository;
import br.com.maidahealth.telemedapi.repositories.InsuredRepository;
import br.com.maidahealth.telemedapi.repositories.ProfessionalRepository;
import br.com.maidahealth.telemedapi.repositories.ProviderRepository;
import br.com.maidahealth.telemedapi.repositories.SensediaConfigurationRepository;
import br.com.maidahealth.telemedapi.repositories.SpecialtyRepository;
import br.com.maidahealth.telemedapi.services.AttendanceService;
import br.com.maidahealth.telemedapi.services.AuthenticationService;
import br.com.maidahealth.telemedapi.services.TelemedServerService;
import br.com.maidahealth.telemedapi.utils.TelemedServerResponseUtil;
import br.com.maidahealth.telemedapi.utils.Utils;

@RestController
@RequestMapping("admin")
public class AdminController {

	@Autowired
	private TelemedServerService telemedServerService;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private AttendanceService attendanceService;

	@Autowired
	private ProfessionalRepository professionalRepository;

	@Autowired
	private InsuredRepository insuredRepository;

	@Autowired
	private SpecialtyRepository specialtyRepository;

	@Autowired
	private ApiConfigurationRepository apiConfigurationRepository;

	@Autowired
	private SensediaConfigurationRepository sensediaConfigurationRepository;

	@Autowired
	private TelemedClientApiContext context;

	@Autowired
	private ProviderRepository providerRepository;

	@GetMapping("update-professionals")
	public ResponseEntity<Object> updateProfessionals(
			@RequestParam(name = "providerId", required = false) Long providerId) {
		validateIfCurrentUserIsAdmin();
		Provider provider = null;
		if (!StringUtils.isEmpty(providerId)) {
			Optional<Provider> optional = providerRepository.findById(providerId);
			if (!optional.isPresent()) {
				throw new InvalidException("Não foi encontrado prestador com identificador " + providerId);
			}
			provider = optional.get();
		}

		TelemedServerResponseUtil resp = telemedServerService.getClientProfessionals();

		if (resp.getStatus().is2xxSuccessful()) {
			Map<String, Professional> profMap = new HashMap<String, Professional>();
			JsonArray allProfessionals = JsonParser.parseString(resp.getBody()).getAsJsonArray();

			List<Professional> allProfs = professionalRepository.findAll();
			List<Specialty> allSpecs = specialtyRepository.findAll();

			for (Professional p : allProfs)
				if (!StringUtils.isEmpty(p.getDocwayId()))
					profMap.put(p.getDocwayId(), p);

			for (JsonElement e : allProfessionals) {
				String externalId = e.getAsJsonObject().get("id").getAsString();
				String association = e.getAsJsonObject().get("association").getAsString();
				String associationNumber = e.getAsJsonObject().get("associationNumber").getAsString();
				String name = e.getAsJsonObject().get("name").getAsString();
				String associationUF = e.getAsJsonObject().get("associationUF").getAsString();
				String cpf = e.getAsJsonObject().get("cpf").getAsString();

				Professional p = profMap.get(externalId);

				if (p == null)
					p = new Professional();

				p.setDocwayId(externalId);
				p.setAssociation(Association.valueOf(association));
				p.setAssociationNumber(associationNumber);
				p.setName(name);
				p.setUfCrm(associationUF);
				p.setCpf(cpf);

				professionalRepository.save(p);

				Set<Specialty> profSpecialties = p.getSpecialties();

				if (profSpecialties == null)
					profSpecialties = new HashSet<Specialty>();

				JsonArray specialtiesArray = e.getAsJsonObject().get("specialties").getAsJsonArray();

				Map<String, Specialty> specMap = new HashMap<String, Specialty>();

				for (Specialty s : allSpecs)
					specMap.put(s.getExternalId(), s);

				for (JsonElement s : specialtiesArray) {
					String specialtyid = s.getAsJsonObject().get("id").getAsString();

					profSpecialties.add(specMap.get(specialtyid));
				}

				p.setSpecialties(profSpecialties);

				if (provider != null) {
					p.getProviders().add(provider);
					provider.getProfessionals().add(p);
				}

				professionalRepository.save(p);
			}
			if (provider != null) {
				providerRepository.save(provider);
			}

			return new ResponseEntity<Object>(new MessageDto("Profissionais atualizados com sucesso"), HttpStatus.OK);
		}

		return new ResponseEntity<Object>(resp.getBody(), resp.getStatus());
	}

	@PostMapping("config-api")
	public ResponseEntity<Object> configApi(@RequestBody @Valid ApiConfigurationForm form) {
		validateIfCurrentUserIsAdmin();

		ApiConfiguration config = new ApiConfiguration();

		List<ApiConfiguration> apiConfigs = apiConfigurationRepository.findAll();

		if (apiConfigs.size() > 0)
			config = apiConfigs.get(0);

		config.setClientAccessKey(form.getClientAccessKey());
		config.setClientApiUrl(form.getClientApiUrl());
		config.setFrontWebUrl(form.getFrontWebUrl());
		config.setJwtExpirationInMinutes(form.getJwtExpirationInMinutes());
		config.setServerApiUrl(form.getServerApiUrl());
		config.setTimezone(form.getTimezone());

		if (StringUtils.isEmpty(config.getJwtSecret()))
			config.setJwtSecret(Utils.generateRandomString(200));
		if (StringUtils.isEmpty(config.getServerApiWebhookToken()))
			config.setServerApiWebhookToken(Utils.generateRandomString(50));
		if (!StringUtils.isEmpty(form.getClientValidateInsuredUrl()))
			config.setClientValidateInsuredUrl(form.getClientValidateInsuredUrl());
		if (!StringUtils.isEmpty(form.getAirmedApiUrl()))
			config.setAirmedApiUrl(form.getAirmedApiUrl());
		if (!StringUtils.isEmpty(form.getAirmedKey()))
			config.setAirmedKey(form.getAirmedKey());
		if (!StringUtils.isEmpty(form.getAirmedWebhookAccessToken()))
			config.setAirmedWebhookAccessToken(form.getAirmedWebhookAccessToken());
		if (!StringUtils.isEmpty(form.getIlyAuthJwtKey()))
			config.setIlyAuthJwtKey(form.getIlyAuthJwtKey());
		if (!StringUtils.isEmpty(form.getIlyDocumentAppKey()))
			config.setIlyDocumentAppKey(form.getIlyDocumentAppKey());
		if (!StringUtils.isEmpty(form.getIlyDocumentUrl()))
			config.setIlyDocumentUrl(form.getIlyDocumentUrl());

		JsonNode resp = null;

		try {
			resp = telemedServerService.getDocwayAccessTokenByClientTokenAndServerUrl(form.getClientAccessKey(),
					config.getServerApiUrl());
		} catch (NotAuthorizedException e) {
			throw new InvalidException("Access key inválida");
		} catch (Exception e) {
			throw new InvalidException("Erro ao buscar token no server: " + e.getMessage());
		}

		String accessToken = resp.get("token").asText();
		telemedServerService.sendWebHookConfigToServerApi(accessToken, config.getServerApiUrl(),
				config.getClientApiUrl(), config.getServerApiWebhookToken());

		// BrYVx87wjGvsqUjYnsW5sxbXMYE8AG9gdTydp37l - IPM

		apiConfigurationRepository.save(config);

		context.load();

		return ResponseEntity.ok(new MessageDto("Configuração realizada com sucesso"));
	}

	@PostMapping("config-sensedia-api")
	public ResponseEntity<Object> configSensediaApi(@RequestBody @Valid SensediaConfigurationForm form) {
		validateIfCurrentUserIsAdmin();

		SensediaConfiguration config = new SensediaConfiguration();

		List<SensediaConfiguration> apiConfigs = sensediaConfigurationRepository.findAll();

		if (apiConfigs.size() > 0)
			config = apiConfigs.get(0);

		config.setSensediaClientId(form.getSensediaClientId());
		config.setSensediaClientToken(form.getSensediaClientToken());
		config.setSensediaEmPlano(form.getSensediaEmPlano());
		config.setSensediaEnv(form.getSensediaEnv());
		config.setSensediaUrl(form.getSensediaUrl());

		sensediaConfigurationRepository.save(config);

		context.load();

		return ResponseEntity.ok(new MessageDto("Configuração realizada com sucesso"));
	}

	private void validateIfCurrentUserIsAdmin() {
		if (!authenticationService.currentUser().isAdmin())
			throw new NotAuthorizedException();
	}

	@GetMapping("sync-specialties-prices")
	public ResponseEntity<Object> syncSpecialtiesPrices() {
		validateIfCurrentUserIsAdmin();

		TelemedServerResponseUtil resp = telemedServerService.getClientSpecialtiesPrices();

		if (resp.getStatus().is2xxSuccessful()) {
			JsonArray allSpecialties = JsonParser.parseString(resp.getBody()).getAsJsonArray();

			for (JsonElement e : allSpecialties) {
				System.out.println(e);
				JsonObject specialtyJson = e.getAsJsonObject().get("specialty").getAsJsonObject();
				String externalId = specialtyJson.get("id").getAsString();
				Double currentValue = e.getAsJsonObject().get("currentValue").getAsDouble();

				Optional<Specialty> optional = specialtyRepository.findByExternalId(externalId);
				if (!optional.isPresent()) {
					throw new InvalidException("Não foi encontrada especialidade com identificador: " + externalId
							+ ". " + specialtyJson.get("name").getAsString());
				}

				Specialty specialty = optional.get();
				specialty.setCurrentUrgencyValue(currentValue);
				specialtyRepository.save(specialty);
			}

			return new ResponseEntity<Object>(new MessageDto("Especialidades atualizadas com sucesso"), HttpStatus.OK);
		}

		return new ResponseEntity<Object>(resp.getBody(), resp.getStatus());
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("sync-professionals-search-query")
	public ResponseEntity<Object> syncProfessionalsSearchQuery() {
		List<Professional> professionals = professionalRepository.findAll();
		for (Professional professional : professionals) {
			professional.concatenateSearchQuery();
			professionalRepository.save(professional);
		}
		return ResponseEntity.ok(new MessageDto("Sincronização realizada com sucesso"));
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("sync-insureds-search-query")
	public ResponseEntity<Object> syncInsuredsSearchQuery() {
		List<Insured> insureds = insuredRepository.findAll();
		for (Insured insured : insureds) {
			insured.concatenateSearchQuery();
			insuredRepository.save(insured);
		}
		return ResponseEntity.ok(new MessageDto("Sincronização realizada com sucesso"));
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("sync-specialties-search-query")
	public ResponseEntity<Object> syncSpecialtiesSearchQuery() {
		List<Specialty> specialties = specialtyRepository.findAll();
		for (Specialty specialty : specialties) {
			specialty.concatenateSearchQuery();
			specialtyRepository.save(specialty);
		}
		return ResponseEntity.ok(new MessageDto("Sincronização realizada com sucesso"));
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("sync-dirty-attendances")
	public ResponseEntity<Object> syncDirtyAttendances() {
		attendanceService.SyncDirtyAttendances();
		return ResponseEntity.ok(new MessageDto("Sincronização realizada com sucesso"));
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("/report/daily")
	public ResponseEntity<Object> retrieveReportDaily(
			@RequestParam(name = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
		ClientResponse resp = telemedServerService.retrieveReportDaily(date);
		return new ResponseEntity<>(resp.bodyToMono(JsonNode.class).block(), resp.statusCode());
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("/report/accumulated")
	public ResponseEntity<Object> retrieveReportAccumulated(
			@RequestParam(name = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
		ClientResponse resp = telemedServerService.retrieveReportAccumulated(date);
		return new ResponseEntity<>(resp.bodyToMono(JsonNode.class).block(), resp.statusCode());
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN', 'CALLCENTER'})")
	@GetMapping("/server-attendance/{id}")
	public ResponseEntity<Object> attendanceFromServer(@PathVariable(name = "id", required = true) Long id) {
		return ResponseEntity.ok(telemedServerService.getDocwayAttendance(attendanceService.findById(id)));
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@GetMapping("/reload-context")
	public ResponseEntity<Object> configApi() {
		context.load();
		return ResponseEntity.ok().build();
	}
}
