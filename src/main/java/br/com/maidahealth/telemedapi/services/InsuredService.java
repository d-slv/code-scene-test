package br.com.maidahealth.telemedapi.services;

import static br.com.maidahealth.telemedapi.enums.AccountCancellationReasonEnum.INSURED_REGISTRATION;
import static br.com.maidahealth.telemedapi.models.InsuredSituationType.ACTIVE;
import static br.com.maidahealth.telemedapi.models.InsuredSituationType.WAITING_ACTIVATION;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import com.google.gson.Gson;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.dto.AttendanceCreatedByClientDto;
import br.com.maidahealth.telemedapi.dto.ClientInsuredDto;
import br.com.maidahealth.telemedapi.dto.InsuredClientDto;
import br.com.maidahealth.telemedapi.dto.InsuredSignupDto;
import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.dto.SensediaDto;
import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.exceptions.NotAuthorizedException;
import br.com.maidahealth.telemedapi.form.AccountCancellationReasonForm;
import br.com.maidahealth.telemedapi.form.ChangePasswordUserForm;
import br.com.maidahealth.telemedapi.form.ClientAddressForm;
import br.com.maidahealth.telemedapi.form.ClientAttendanceForm;
import br.com.maidahealth.telemedapi.form.ClientInsuredForm;
import br.com.maidahealth.telemedapi.form.ContactUpdateForm;
import br.com.maidahealth.telemedapi.form.InsuredClientForm;
import br.com.maidahealth.telemedapi.form.InsuredForm;
import br.com.maidahealth.telemedapi.form.InsuredPermissionForm;
import br.com.maidahealth.telemedapi.form.InsuredResendForm;
import br.com.maidahealth.telemedapi.form.InsuredSignupForm;
import br.com.maidahealth.telemedapi.form.InsuredUpdateForm;
import br.com.maidahealth.telemedapi.form.PhoneForm;
import br.com.maidahealth.telemedapi.form.ProfileAddressUpdateForm;
import br.com.maidahealth.telemedapi.form.ProfileUpdateForm;
import br.com.maidahealth.telemedapi.form.UserContactInfoUpdateForm;
import br.com.maidahealth.telemedapi.kafka.InsuredKafkaProducer;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.City;
import br.com.maidahealth.telemedapi.models.HealthInsurer;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.InsuredSituation;
import br.com.maidahealth.telemedapi.models.InsuredSituationType;
import br.com.maidahealth.telemedapi.models.InsuredType;
import br.com.maidahealth.telemedapi.models.Profile;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.models.UserType;
import br.com.maidahealth.telemedapi.repositories.CityRepository;
import br.com.maidahealth.telemedapi.repositories.InsuredRepository;
import br.com.maidahealth.telemedapi.repositories.ProfileRepository;
import br.com.maidahealth.telemedapi.repositories.UserRepository;
import br.com.maidahealth.telemedapi.utils.TelemedServerResponseUtil;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class InsuredService {

	private static final Logger LOGGER = LoggerFactory.getLogger(InsuredService.class);

	@Autowired
	private InsuredRepository repository;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private HealthInsurerService healthInsurerService;

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TelemedServerService telemedServerService;

	@Autowired
	private CityRepository cityRepository;

	@Autowired
	private TelemedClientApiContext context;

	@Autowired
	private UserService userService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private SensediaService sensediaService;

	@Autowired
	private InsuredKafkaProducer insuredKafkaProducer;

	public Page<Insured> findAll(Pageable pagination) {
		return repository.findAll(pagination);
	}

	public Object saveHolder(@Valid ClientInsuredForm form) {

		if (StringUtils.isEmpty(form.getEmail()))
			throw new InvalidException("o email é obrigatório");

		Optional<User> optionalUser = userRepository.findByEmail(form.getEmail());
		if (optionalUser.isPresent()) {
			User u = optionalUser.get();
			if (!u.isInsured() || u.isInsured()
					&& !u.getInsured().getHealthInsuranceNumber().equals(form.getHealthInsuranceNumber()))
				throw new InvalidException("Email já existente");
		}

		try {
			City c = cityRepository.findByIbgeCode(form.getAddress().getIbgeCode()).get();
			form.getAddress().setCity(c.getName());
			form.getAddress().setState(c.getState().getUf());
		} catch (Exception e) {
			throw new InvalidException("Código IBGE inválido");
		}

		TelemedServerResponseUtil resp = telemedServerService.saveHolder(form, form.getHealthInsuranceIdentificator());
		HttpStatus status = resp.getStatus();

		if (status.is2xxSuccessful()) {
			Gson gson = new Gson();
			String string = resp.getBody().toString();
			ClientInsuredDto dto = gson.fromJson(string, ClientInsuredDto.class);

			String externalId = (String) dto.getId();

			Optional<Insured> optionalInsured = repository.findByDocwayId(externalId);

			Insured insured = optionalInsured.isPresent() ? optionalInsured.get() : new Insured();
			insured.setCpf(dto.getCpf());
			insured.setName(dto.getName());
			insured.setHealthInsuranceNumber(dto.getHealthInsuranceNumber());
			insured.setDocwayId(externalId);
			insured.setLastPhoneNumber(dto.getPhoneNumber());
			insured.setBirthDate(dto.getBirthdate());
			insured.setType(InsuredType.HOLDER);
			insured.setGender(dto.getGender());
			insured.setHealthInsuranceIdentificator(form.getHealthInsuranceIdentificator());
			
			if (insured.getId() == null) {
				insured.manageCurrentSituation(ACTIVE, INSURED_REGISTRATION);
			}

			repository.save(insured);

			String password = StringUtils.isEmpty(form.getPassword()) ? Utils.DEFAULT_INSURED_PASSWORD
					: form.getPassword();
			password = new BCryptPasswordEncoder().encode(password);

			Profile profile = profileRepository.findByName(UserType.INSURED.name()).get();

			User user = insured.getUser();
			if (user == null) {
				user = new User(form.getHealthInsuranceNumber(), insured.getName(), password, form.getEmail(), insured,
						Arrays.asList(profile));
			} else {
				user.setEmail(form.getEmail());
				user.setLogin(form.getHealthInsuranceNumber());
				user.setName(insured.getName());
				user.setInsured(insured);
			}

			userRepository.save(user);
			dto.setId(insured.getId());

			return dto;
		}

		return resp;
	}

	public Object saveDependent(@Valid ClientInsuredForm form, Long holderId) {
		Optional<Insured> optionalHolder = repository.findById(holderId);

		if (!optionalHolder.isPresent() || !optionalHolder.get().getType().equals(InsuredType.HOLDER))
			throw new InvalidException("Titular inválido");

		if (StringUtils.isEmpty(form.getEmail()))
			throw new InvalidException("o email é obrigatório");

		userRepository.findByEmail(form.getEmail()).ifPresent(user -> {
			throw new InvalidException("Email já existente");
		});

		repository.findByHealthInsuranceNumber(form.getHealthInsuranceNumber()).ifPresent(insured -> {
			throw new InvalidException("healthInsuranceNumber já existente");
		});

		try {
			City c = cityRepository.findByIbgeCode(form.getAddress().getIbgeCode()).get();
			form.getAddress().setCity(c.getName());
			form.getAddress().setState(c.getState().getUf());
		} catch (Exception e) {
			throw new InvalidException("Código IBGE inválido");
		}

		Insured holder = optionalHolder.get();

		TelemedServerResponseUtil resp = telemedServerService.saveDependent(form, holder.getDocwayId());
		HttpStatus status = resp.getStatus();

		if (status.is2xxSuccessful()) {
			Gson gson = new Gson();
			String string = resp.getBody();
			ClientInsuredDto dto = gson.fromJson(string, ClientInsuredDto.class);

			String externalId = (String) dto.getId();

			Optional<Insured> optionalInsured = repository.findByDocwayId(externalId);

			Insured insured = optionalInsured.isPresent() ? optionalInsured.get() : new Insured();
			insured.setCpf(dto.getCpf());
			insured.setName(dto.getName());
			insured.setHealthInsuranceNumber(dto.getHealthInsuranceNumber());
			insured.setDocwayId(externalId);
			insured.setLastPhoneNumber(dto.getDdd().trim() + dto.getPhoneNumber().trim());
			insured.setBirthDate(dto.getBirthdate());
			insured.setType(InsuredType.DEPENDENT);
			insured.setHolder(holder);
			insured.setGender(dto.getGender());

			repository.save(insured);

			String password = StringUtils.isEmpty(form.getPassword()) ? Utils.DEFAULT_INSURED_PASSWORD
					: form.getPassword();
			password = new BCryptPasswordEncoder().encode(password);

			Profile profile = profileRepository.findByName(UserType.INSURED.name()).get();

			User user = insured.getUser();
			if (user == null) {
				user = new User(form.getHealthInsuranceNumber(), insured.getName(), password, form.getEmail(), insured,
						Arrays.asList(profile));
			} else {
				user.setEmail(form.getEmail());
				user.setLogin(form.getHealthInsuranceNumber());
				user.setName(insured.getName());
				user.setInsured(insured);
			}

			userRepository.save(user);

			dto.setId(insured.getId());
			dto.setHolderId(holder.getId());

			return dto;
		}

		return resp;
	}

	public Insured update(Long id, InsuredForm form) {
		Optional<Insured> insuredOptional = repository.findById(id);
		if (insuredOptional.isPresent()) {
			Insured insuredModel = insuredOptional.get();
			// form.merge(insuredModel);
			insuredModel.setHolder(getHolder(form, insuredModel.getHolder()));
			repository.save(insuredModel);
			return insuredModel;
		}
		throw new EntityNotFoundException();
	}

	public Insured find(Long id) {
	
		Optional<Insured> optional = repository.findById(id);		
		if (optional.isPresent()) {		
			return optional.get();
		}
		
		throw new EntityNotFoundException("Não foi encontrado segurado com identificador " + id);
	}

	private Insured getHolder(InsuredForm form, Insured holderOriginal) {
		Insured holder = holderOriginal;

		if (form.getHolderId() != null) {
			holder = null;
			Optional<Insured> resultHolder = repository.findById(new Long(form.getHolderId()));
			if (resultHolder.isPresent()) {
				holder = resultHolder.get();
			}
		}

		return holder;
	}

	public Boolean isEligible(Insured insured) {
		if (insured == null)
			return true;

		return insured.getCurrentSituation().equals(InsuredSituationType.ACTIVE);
	}

	public Insured updatePhone(PhoneForm form) {
		User currentUser = authenticationService.currentUser();
		if (!currentUser.isInsured())
			throw new InvalidException("Apenas beneficiários podem atualizar número do telefone");

		if (!Utils.isCellPhoneNumberValid(form.getNumber()))
			throw new InvalidException(String.format("O número informado é inválido: %s", form.getNumber()));

		Insured insured = currentUser.getInsured();
		insured.setLastPhoneNumber(form.getNumber());
		repository.save(insured);
		return insured;
	}

	public Insured getInsuredByCpfOrHealthInsuranceNumberAndRegistrationNumberAndBirthDate(
			String cpfOrHealthInsuranceNumber, String registrationNumber, Date birthDate) {
		Optional<Insured> optionalInsured = repository
				.getInsuredByCpfOrHealthInsuranceNumberAndRegistrationNumberAndBirthDate(cpfOrHealthInsuranceNumber,
						registrationNumber, birthDate);

		return optionalInsured.isPresent() ? optionalInsured.get() : null;
	}

	public Insured findByPublicToken(String token) {

		return repository.findByPublicToken(token).orElseThrow(() -> new InvalidException("Token invalido"));
	}

	public Page<Insured> findByCpfOrHealthInsuranceNumberOName(String cpfOrHealthInsuranceNumberOrName,
			Pageable pagination) {
		Page<Insured> insureds = Page.empty();
		if (StringUtils.isEmpty(cpfOrHealthInsuranceNumberOrName)) {
			insureds = this.findAll(pagination);
		} else {
			cpfOrHealthInsuranceNumberOrName = cpfOrHealthInsuranceNumberOrName.toUpperCase();
			insureds = repository.findByCpfContainingOrHealthInsuranceNumberContainingOrNameContaining(
					cpfOrHealthInsuranceNumberOrName, cpfOrHealthInsuranceNumberOrName,
					cpfOrHealthInsuranceNumberOrName, pagination);
		}
		return insureds;
	}

	public Page<Insured> findByCpfOrNameOrGenderOrBirthDate(String filter, String cpf, String gender,
			Date birthDateStart, Date birthDateEnd, Pageable pagination) {
		GenderEnum genderEnum = GenderEnum.getGenderByName(gender);
		return repository.findInsureds(filter, cpf, genderEnum, birthDateStart, birthDateEnd, pagination);
	}

	public List<Insured> getCurrentHolderDependents() {
		User currentUser = authenticationService.currentUser();
		if (!currentUser.isInsured())
			throw new InvalidException("Usuário inválido");

		return this.findByHolderInsured(currentUser.getInsured());
	}

	public List<Insured> findByHolderInsured(Insured holder) {
		return repository.findByHolder(holder);
	}

	public boolean isTokenCreateInsuredValid(String token) {
		HealthInsurer hi = healthInsurerService.getHealthInsurer();
		return token.equals(hi.getTokenToCreateInsured());
	}

	@Transactional
	public InsuredClientDto saveInsuredClient(InsuredClientForm form, boolean checkCpf)
			throws NoSuchAlgorithmException, UnsupportedEncodingException {
		if (!form.isPhoneValid())
			throw new InvalidException("Número de telefone inválido");

		if (!Utils.isEmailValid(form.getEmail())) {
			throw new InvalidException("O email informado é inválido");
		}

		Optional<Insured> optional = Optional.empty();
		Insured insured;
		User user;

		if (checkCpf) {
			if (Utils.isEmpty(form.getCpf()))
				throw new InvalidException("CPF não pode ser vazio");

			if (!form.isCpfValid())
				throw new InvalidException("CPF inválido");

			optional = repository.findByCpf(form.getCpf());
		} else {
			Optional<User> userExists = userRepository.findByEmail(form.getEmail());
			if (userExists.isPresent()) {
				user = userExists.get();
				insured = user.getInsured();

				return new InsuredClientDto(insured, user, context.getApiConfiguration().getFrontWebUrl());
			}
		}

		if (optional.isPresent()) {
			insured = optional.get();
			user = insured.getUser();
		} else {
			Optional<User> result = userRepository.findByEmail(form.getEmail());
			if (result.isPresent()) {
				throw new InvalidException("Já existe um segurado cadastrado com o e-mail informado com outro CPF.");
			}

			insured = form.toInsured();
			insured.setHealthInsuranceNumber(Utils.generateRandomInsuranceNumber());
			insured.manageCurrentSituation(ACTIVE, INSURED_REGISTRATION);
			repository.save(insured);
			user = createUser(insured, form);
			generateInsuredToken(insured);
		}

		insured.setLastPhoneNumber(form.getPhoneNumber());
		repository.save(insured);

		InsuredSignupForm form2 = InsuredSignupForm.generateDefaultInsuredForm(form.getName(), form.getEmail());

		createPatientOnServer(insured, form2);

		return new InsuredClientDto(insured, user, context.getApiConfiguration().getFrontWebUrl());
	}

	private User createUser(Insured insured, InsuredClientForm form) {
		String password = new BCryptPasswordEncoder().encode(Utils.DEFAULT_INSURED_PASSWORD);

		Profile insuredProfile = null;
		Optional<Profile> optional = profileRepository.findByName(UserType.INSURED.name());
		if (optional.isPresent()) {
			insuredProfile = optional.get();
		}

		User user = new User(form.getEmail(), insured.getName(), password, form.getEmail(), insured,
				Arrays.asList(insuredProfile));
		user.setInsured(insured);
		userRepository.save(user);
		return user;

	}

	public void generateInsuredToken(Insured insured) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest salt = MessageDigest.getInstance("SHA-256");
		salt.update(UUID.randomUUID().toString().getBytes("UTF-8"));

		char[] hexArray = "0123456789ABCDEFGHIJKLMNOPQRSTUVXYWZ".toCharArray();
		byte[] bytes = salt.digest();
		char[] hexChars = new char[bytes.length * 2];
		for (int j = 0; j < bytes.length; j++) {
			int v = bytes[j] & 0xFF;
			hexChars[j * 2] = hexArray[v >>> 4];
			hexChars[j * 2 + 1] = hexArray[v & 0x0F];
		}
		insured.setPublicToken(new String(hexChars));
	}

	public AttendanceCreatedByClientDto generateAttendanceCreatedByClientDto(Attendance att) {
		AttendanceCreatedByClientDto dto = AttendanceCreatedByClientDto.convert(att);

		Insured insured = att.getInsured();
		try {
			if (StringUtils.isEmpty(insured.getPublicToken()))
				generateInsuredToken(insured);
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		repository.save(insured);
		String url = context.getApiConfiguration().getFrontWebUrl() + "/auth/" + insured.getPublicToken();

		url += "?attendanceId=" + att.getId();
		url += "&type=" + att.getType().name();

		dto.setUrl(url);

		return dto;
	}

	/***
	 * Atualiza o segurado na base Client e sincroniza com a Server
	 */
	public Object update(ClientInsuredForm form) {
		Long id = null;
		try {
			id = Long.parseLong(form.getId().toString());
		} catch (Exception e) {
			throw new InvalidException("id inválido");
		}

		if (StringUtils.isEmpty(form.getHealthInsuranceNumber())) {
			throw new InvalidException("número da matrícula é obrigatório");
		}

		if (StringUtils.isEmpty(form.getEmail()))
			throw new InvalidException("o email é obrigatório");

		Optional<Insured> insuredToUpdate = repository.findById(id);
		if (!insuredToUpdate.isPresent())
			throw new InvalidException("Segurado inválido");

		repository.findByHealthInsuranceNumber(form.getHealthInsuranceNumber()).ifPresent(insured -> {
			Insured storedInsured = insuredToUpdate.get();
			if (!insured.getId().equals(storedInsured.getId())) {
				throw new InvalidException("healthInsuranceNumber já existente");
			}
		});

		form.setId(insuredToUpdate.get().getDocwayId());

		userRepository.findByEmail(form.getEmail()).ifPresent(user -> {
			Insured insured = insuredToUpdate.get();
			if (!insured.getUser().getId().equals(user.getId())) {
				throw new InvalidException("Email já existente");
			}
		});

		if (form.getAddress() != null && form.getAddress().getIbgeCode() != null) {
			try {
				City c = cityRepository.findByIbgeCode(form.getAddress().getIbgeCode()).get();
				form.getAddress().setCity(c.getName());
				form.getAddress().setState(c.getState().getUf());
			} catch (Exception e) {
				throw new InvalidException("Código IBGE inválido");
			}
		}

		TelemedServerResponseUtil resp = telemedServerService.update(form);
		HttpStatus status = resp.getStatus();

		if (status.is2xxSuccessful()) {
			Gson gson = new Gson();
			String string = resp.getBody();
			ClientInsuredDto dto = gson.fromJson(string, ClientInsuredDto.class);

			String externalId = (String) dto.getId();

			Optional<Insured> optionalInsured = repository.findByDocwayId(externalId);

			Insured insured = optionalInsured.isPresent() ? optionalInsured.get() : new Insured();
			insured.setCpf(dto.getCleanedCpf());
			insured.setName(dto.getName());
			insured.setHealthInsuranceNumber(dto.getHealthInsuranceNumber());
			insured.setDocwayId(externalId);
			insured.setLastPhoneNumber(dto.getDdd().trim() + dto.getPhoneNumber().trim());
			insured.setBirthDate(dto.getBirthdate());
			insured.setGender(dto.getGender());

			repository.save(insured);

			User user = insured.getUser();
			if (user == null) {
				String password = Utils.DEFAULT_INSURED_PASSWORD;
				password = new BCryptPasswordEncoder().encode(password);

				Profile profile = profileRepository.findByName(UserType.INSURED.name()).get();
				user = new User(form.getHealthInsuranceNumber(), insured.getName(), password, form.getEmail(), insured,
						Arrays.asList(profile));
			} else {
				user.setEmail(form.getEmail());
				user.setLogin(form.getHealthInsuranceNumber());
				user.setName(insured.getName());
				user.setInsured(insured);
			}

			userRepository.save(user);

			dto.setId(insured.getId());

			return dto;
		}

		return resp;
	}

	public Object updateInsured(@Valid InsuredUpdateForm form) {

		User user = authenticationService.currentUser();
		if (!user.isInsured()) {
			throw new NotAuthorizedException();
		}
		Insured insured = user.getInsured();
		form.setHealthInsuranceNumber(insured.getHealthInsuranceNumber());
		form.setName(insured.getName());
		form.setEmail(user.getEmail());
		form.setBirthdate(insured.getBirthDate().toString());

		if (!Utils.isCellPhoneNumberValid(form.getPhoneNumber()))
			throw new InvalidException("Telefone inválido");

		try {
			City c = cityRepository.findByIbgeCode(form.getAddress().getIbgeCode()).get();
			form.getAddress().setCity(c.getName());
			form.getAddress().setState(c.getState().getUf());
		} catch (Exception e) {
			throw new InvalidException("Código IBGE inválido");
		}

		TelemedServerResponseUtil resp = telemedServerService.saveHolder(form, null);
		HttpStatus status = resp.getStatus();

		if (status.is2xxSuccessful()) {
			Gson gson = new Gson();
			String string = resp.getBody().toString();
			ClientInsuredDto dto = gson.fromJson(string, ClientInsuredDto.class);

			String externalId = (String) dto.getId();

			insured.setCpf(dto.getCpf());
			insured.setHealthInsuranceNumber(dto.getHealthInsuranceNumber());
			insured.setDocwayId(externalId);
			insured.setLastPhoneNumber(dto.getDdd().trim() + dto.getPhoneNumber().trim());
			insured.setBirthDate(dto.getBirthdate());

			repository.save(insured);

			dto.setId(insured.getId());

			return dto;
		}

		return resp;
	}

	public Object getInsured(Long id) {
		Insured i = find(id);

		TelemedServerResponseUtil resp = telemedServerService.getPatient(i.getDocwayId());

		if (resp.getStatus().is2xxSuccessful()) {
			Gson gson = new Gson();
			String string = resp.getBody().toString();
			ClientInsuredDto dto = gson.fromJson(string, ClientInsuredDto.class);

			String externalId = (String) dto.getId();

			i.setCpf(dto.getCpf());
			i.setName(dto.getName());
			i.setHealthInsuranceNumber(dto.getHealthInsuranceNumber());
			i.setDocwayId(externalId);
			i.setLastPhoneNumber(dto.getDdd().trim() + dto.getPhoneNumber().trim());
			i.setBirthDate(dto.getBirthdate());
			i.setType(InsuredType.HOLDER);

			dto.setId(i.getId());

			return dto;
		}

		return null;
	}

	public Object updateProfile(Long id, ProfileUpdateForm form) {

		Optional<Insured> insuredOptional = repository.findById(id);
		Insured insured = insuredOptional.orElseThrow(() -> new EntityNotFoundException("Segurado não localizado."));

		ClientInsuredForm clientInsuredForm = new ClientInsuredForm();
		clientInsuredForm.setId(insured.getDocwayId());
		clientInsuredForm.setName(form.getName());
		clientInsuredForm.setBirthdate(form.getBirthdate());
		clientInsuredForm.setGender(form.getGender());

		TelemedServerResponseUtil resp = telemedServerService.update(clientInsuredForm);
		HttpStatus status = resp.getStatus();
		if (status.is2xxSuccessful()) {
			Gson gson = new Gson();
			String body = resp.getBody();
			ClientInsuredDto clientInsuredDto = gson.fromJson(body, ClientInsuredDto.class);

			insured.setName(form.getName());
			insured.setBirthDate(Utils.parse(form.getBirthdate(), "yyyy-MM-dd"));

			User user = authenticationService.currentUser();
			user.setName(insured.getName());
			userRepository.save(user);

			repository.save(insured);

			return clientInsuredDto;
		}

		return resp;

	}

	public Object updateContact(Long id, ContactUpdateForm form) {
		return this.updateContact(id, new UserContactInfoUpdateForm(form));
	}

	public Object updateProfileAddress(Long id, ProfileAddressUpdateForm form) {
		Insured insured = validateInsured(id);

		ClientAddressForm formAddress = createAddressForm(form);
		ClientInsuredForm clientInsuredForm = new ClientInsuredForm();
		clientInsuredForm.setId(insured.getDocwayId());
		clientInsuredForm.setAddress(formAddress);

		TelemedServerResponseUtil resp = telemedServerService.update(clientInsuredForm);
		HttpStatus status = resp.getStatus();
		if (status.is2xxSuccessful()) {
			Gson gson = new Gson();
			String body = resp.getBody();

			ClientInsuredDto clientInsuredDto = gson.fromJson(body, ClientInsuredDto.class);
			clientInsuredDto.setId(insured.getId());

			return clientInsuredDto;
		}

		return resp;
	}

	private ClientAddressForm createAddressForm(ProfileAddressUpdateForm form) {
		ClientAddressForm formAddress = new ClientAddressForm();
		cityRepository.findByIbgeCode(form.getIbgeCode()).ifPresent(city -> {
			formAddress.setNumber(form.getNumber());
			formAddress.setPublicPlace(form.getPublicPlace());
			formAddress.setNeighborhood(form.getNeighborhood());
			formAddress.setStreet(form.getStreet());
			formAddress.setZipCode(form.getZipCode());
			formAddress.setIbgeCode(city.getIbgeCode());
			formAddress.setCity(city.getName());
			formAddress.setState(city.getState().getName());
		});

		return formAddress;
	}

	public MessageDto updateProfilePassword(Long id, ChangePasswordUserForm form, BindingResult result)
			throws NoSuchMethodException, MethodArgumentNotValidException {
		Insured storedInsured = validateInsured(id);

		User user = storedInsured.getUser();
		validatePasswords(form, user, result);
		userService.changePassword(form.getNewPassword(), user);

		return new MessageDto("Senha atualizada com sucesso");
	}

	private void validatePasswords(ChangePasswordUserForm form, User user, BindingResult result)
			throws NoSuchMethodException, MethodArgumentNotValidException {
		BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

		if (!bCrypt.matches(form.getOldPassword(), user.getPassword()))
			result.addError(new ObjectError("oldPassword", "Senha antiga informada não confere"));

		if (bCrypt.matches(form.getOldPassword(), bCrypt.encode(form.getNewPassword())))
			result.addError(new ObjectError("oldPassword", "A nova senha deve ser diferente da atual"));

		if (result.hasErrors()) {
			throw new MethodArgumentNotValidException(
					new MethodParameter(this.getClass().getDeclaredMethod("updateProfilePassword", Long.class,
							ChangePasswordUserForm.class, BindingResult.class), 0),
					result);
		}
	}

	private Insured validateInsured(Long id) {
		Insured insured = repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Segurado não localizado."));
		User currentUser = authenticationService.currentUser();

		// TODO: 17/11/2020 Incluir exceção caso beneficiário esteja cancelado

		if (!currentUser.isInsured()) {
			throw new InvalidException("Apenas beneficiários podem atualizar seus dados");
		}

		if (!insured.equals(currentUser.getInsured())) {
			throw new NotAuthorizedException("Operação não permitida, usuário logado diferente do segurado informado");
		}

		return insured;
	}

	public Insured cancel(Long id, AccountCancellationReasonForm form) {
		Optional<Insured> optional = repository.findById(id);
		if (!optional.isPresent()) {
			throw new EntityNotFoundException("Não foi encontrado segurado com identificador " + id);
		}
		optional.map(insured -> {
			if (insured.getCurrentSituation().equals(InsuredSituationType.CANCELED)) {
				throw new EntityNotFoundException("Usuário já encontra-se cancelado " + id);

			}
			return null;
		});

		Insured insured = optional.get();

		if (insured.getCurrentSituation().equals(InsuredSituationType.ACTIVE)) {
			insured.setCurrentSituation(InsuredSituationType.CANCELED);
			InsuredSituation is = new InsuredSituation(InsuredSituationType.CANCELED, form.getReason(),
					form.getDetail());
			insured.getSituations().add(is);
			repository.save(insured);
		}

		return insured;
	}

	@Transactional
	public InsuredSignupDto createInsuredFromSignUp(InsuredSignupForm form) {
		HealthInsurer hi = healthInsurerService.getHealthInsurer();
		Boolean validatesOnClient = (hi != null && hi.getNeedsValidateInsuredOnClient());
		InsuredSituationType situationType = (validatesOnClient ? ACTIVE : WAITING_ACTIVATION);

		Insured insured = form.toInsured();
		insured.manageCurrentSituation(situationType, INSURED_REGISTRATION);
		repository.save(insured);

		User insuredUser = createUser(insured, form);
		User createdUser = userService.updateRecoveryPasswordCode(insuredUser);

		if (!validatesOnClient) {
			try {
				emailService.sendActivationAccountCode(createdUser, createdUser.getRecoveryPasswordCode());
			} catch (MessagingException e) {
				LOGGER.error("Erro ao tentar enviar cod. de ativacao para o email: {}", form.getEmail());
				e.printStackTrace();
			}
		}

		ClientInsuredDto clientInsuredDto = createPatientOnServer(insured, form);

		return InsuredSignupDto.convert(clientInsuredDto);
	}

	// private void updateInsuredSituation(InsuredSituationType situationType, Insured insured) {
	// 	insured.setCurrentSituation(situationType);
	// 	InsuredSituation situation = new InsuredSituation(situationType, null, "Aguardando ativação da conta");
	// 	insured.getSituations().add(situation);

	// 	repository.save(insured);
	// }

	private ClientInsuredDto createPatientOnServer(Insured insured, InsuredSignupForm signupForm) {
		InsuredUpdateForm form = signupForm.toInsuredUpdateForm();
		form.setHealthInsuranceNumber(insured.getHealthInsuranceNumber());

		cityRepository.findByIbgeCode(signupForm.getAddress().getIbgeCode()).ifPresent(city -> {
			form.getAddress().setCity(city.getName());
			form.getAddress().setState(city.getState().getName());
			form.getAddress().setPublicPlace("-");
		});

		TelemedServerResponseUtil response = telemedServerService.saveHolder(form, form.getHealthInsuranceNumber());
		if (response.getStatus().is4xxClientError() || response.getStatus().is5xxServerError()) {
			throw new InvalidException(response.getBody());
		}

		return updateInsuredDocwayId(response, insured);
	}

	private ClientInsuredDto updateInsuredDocwayId(TelemedServerResponseUtil response, Insured insured) {
		HttpStatus status = response.getStatus();
		if (status.is2xxSuccessful()) {
			Gson gson = new Gson();
			String string = response.getBody();
			ClientInsuredDto dto = gson.fromJson(string, ClientInsuredDto.class);

			String externalId = (String) dto.getId();
			insured.setDocwayId(externalId);

			repository.save(insured);

			return dto;
		}
		return null;
	}

	private User createUser(Insured insured, InsuredSignupForm form) {
		String encryptedPass = new BCryptPasswordEncoder().encode(form.getPassword());

		Profile insuredProfile = profileRepository.findByName(UserType.INSURED.name()).orElse(null);
		List<Profile> singletonList = Collections.singletonList(insuredProfile);

		User user = new User(form.getCpf(), form.getName(), encryptedPass, form.getEmail(), insured, singletonList);
		if (!StringUtils.isEmpty(form.getGender())) {
			user.setGender(GenderEnum.getGenderByName(form.getGender().toUpperCase()));
		}
		user.setTermsAccepted(form.getTermsAccepted());
		user.setInsured(insured);

		return user;
	}

	public ClientInsuredDto getInsuredFromCurrentUser() {
		Insured storedInsured = Optional.ofNullable(authenticationService.currentUser()).map(User::getInsured)
				.orElseThrow(() -> new InvalidException("Usuário logado não é um segurado"));

		String publicId = storedInsured.getDocwayId();
		if (StringUtils.isEmpty(publicId)) {
			return ClientInsuredDto.convert(storedInsured);
		}

		TelemedServerResponseUtil response = telemedServerService.getPatient(publicId);
		if (response.getStatus().is2xxSuccessful()) {
			Gson gson = new Gson();
			String string = response.getBody();

			ClientInsuredDto clientInsuredDto = gson.fromJson(string, ClientInsuredDto.class);
			clientInsuredDto.setId(storedInsured.getId());
			clientInsuredDto
					.setHolderId(Optional.ofNullable(storedInsured.getHolder()).map(Insured::getId).orElse(null));
			// TODO refatorar conversão dos cardtokens
			clientInsuredDto.setCardTokens(clientInsuredDto.converteToCardTokenToDto(storedInsured.getCardTokens()));
			return clientInsuredDto;
		}

		return ClientInsuredDto.convert(storedInsured);
	}

	public Object updateContact(Long id, UserContactInfoUpdateForm form) {
		Optional<Insured> insuredOptional = repository.findById(id);
		Insured insured = insuredOptional.orElseThrow(() -> new EntityNotFoundException("Segurado não localizado."));

		ClientInsuredForm clientInsuredForm = new ClientInsuredForm();
		clientInsuredForm.setId(insured.getDocwayId());
		clientInsuredForm.setPhoneNumber(form.getCleanedPhoneNumber());
		clientInsuredForm.setEmail(form.getEmail());

		TelemedServerResponseUtil resp = telemedServerService.update(clientInsuredForm);
		HttpStatus status = resp.getStatus();
		if (status.is2xxSuccessful()) {
			Gson gson = new Gson();
			String body = resp.getBody();
			ClientInsuredDto clientInsuredDto = gson.fromJson(body, ClientInsuredDto.class);

			insured.setLastPhoneNumber(form.getPhoneNumber());

			User user = authenticationService.currentUser();
			user.setPhoneNumber(insured.getLastPhoneNumber());
			userRepository.save(user);

			repository.save(insured);

			return clientInsuredDto;
		}

		return resp;

	}

	public int migrateCpfAndName() {
		return repository.migrateCpfAndName();

	}

	public SensediaDto isEligibleOnClient(User user) {
		SensediaDto sensediaDto = isEligibleOnClient(user.getCpf());

		if (sensediaDto != null)
			return sensediaDto;

		return isEligibleOnClient(user.getHealthInsuranceNumber());
	}

	public SensediaDto isEligibleOnClient(String cpf) {
		HealthInsurer healthInsurer = healthInsurerService.getHealthInsurer();

		// Checa se esse cliente faz esse tipo de validação. Caso contrário, returns
		// true
		if (!healthInsurer.getConfirmValidateInsuredOnClient())
			return new SensediaDto(null);

		// Buscar no endpoint fornecido pela Haptech...
		return sensediaService.checkCpf(cpf);
	}

	public void resendInsuredActivationCode(@Valid InsuredResendForm form) {
		Optional<User> user = userRepository.findByEmail(form.getEmail());
		if (user.isPresent()) {
			try {
				emailService.sendActivationAccountCode(user.get(), user.get().getRecoveryPasswordCode());
			} catch (MessagingException e) {
				LOGGER.error("Erro ao tentar enviar cod. de ativacao para o email: {}", form.getEmail());
				e.printStackTrace();
			}
		}
	}

	public void updateInsuredCpf(Attendance storedAttendance, String cpf) {
		Insured insured = storedAttendance.getInsured();
		insured.setCpf(cpf);
		insuredKafkaProducer.produce(storedAttendance, insured);
		repository.save(insured);
	}

	public void setAbleToCreateAttendance(@Valid InsuredPermissionForm form) {
		Insured insured = repository.findById(form.getId())
				.orElseThrow(() -> new InvalidException("Id do paciente inválido"));

		insured.setAbleToCreateAttendance(form.isAbleToCreateAttendance());
		repository.save(insured);
	}

	public AttendanceCreatedByClientDto generateDtoWhenAttendanceNull(ClientAttendanceForm form) {
		Insured insured = this.find(form.getPatientId());

		if (!insured.isAbleToCreateAttendance())
			throw new InvalidException("Paciente não apto para criar novos atendimentos");

		insured.setLastPhoneNumber(form.getPhoneNumber());

		try {
			if (StringUtils.isEmpty(insured.getPublicToken()))
				generateInsuredToken(insured);
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		repository.save(insured);
		String url = context.getApiConfiguration().getFrontWebUrl() + "/auth/" + insured.getPublicToken();

		url += "?type=" + form.getType().name();

		AttendanceCreatedByClientDto dto = new AttendanceCreatedByClientDto();
		dto.setAttendance(null);
		dto.setUrl(url);

		return dto;
	}

}
