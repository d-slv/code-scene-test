package br.com.maidahealth.telemedapi.services;

import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.exceptions.InvalidUserException;
import br.com.maidahealth.telemedapi.form.*;
import br.com.maidahealth.telemedapi.models.*;
import br.com.maidahealth.telemedapi.repositories.*;
import br.com.maidahealth.telemedapi.utils.Utils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import reactor.util.CollectionUtils;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static br.com.maidahealth.telemedapi.models.InsuredSituationType.ACTIVE;

@Service
public class UserService {
	
	@Autowired
	public UserRepository userRepository;
	
	@Autowired
	public ProfileRepository profileRepository;
	
	@Autowired
	private ProviderRepository providerRepository;
	
	@Autowired
	private ProfessionalRepository professionalRepository;
	
	@Autowired
	private InsuredRepository insuredRepository;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private TermsOfUseRepository termsOfUseRepository;
	
	@Autowired
	private InsuredService insuredService;

	public User save(UserForm userForm) {
		Optional<User> result = userRepository.findByEmailOrLogin(userForm.getEmail(), userForm.getLogin());
		if(result.isPresent()) {
			throw new InvalidUserException();		
		}
		Profile profile = perfilCheck(userForm);
		User user = userForm.toUser();
		user.getProfiles().add(profile);
		Provider providerFromDataBase = getProviderFromDataBase(userForm);
		if(providerFromDataBase != null) {
			user.getProviders().add(providerFromDataBase);
		}
		validateSecretaryWithProvider(user, user.getProviders());
		user.setProfessional(getProfessional(userForm, null));
		user.setInsured(getInsured(userForm, null));
		userRepository.save(user);
		return user;
	}
	
	public User find(Long id) {
		Optional<User> optional = userRepository.findById(id);
		if(optional.isPresent()) {
			return optional.get();
		}
		
		throw new EntityNotFoundException();
	}
	
	public User update(Long id, UserForm userForm) {
		Optional<User> userOptional = userRepository.findById(id);
		if(userOptional.isPresent()){
			User userModel = userOptional.get();
			userForm.merge(userModel);
			userModel.getProfiles().remove(0);
			userModel.getProfiles().add(perfilCheck(userForm));
			updateProviders(userModel, userForm);
			validateSecretaryWithProvider(userModel, userModel.getProviders());
//			userModel.setProvider(getProvider(userForm, userModel));
			userModel.setProfessional(getProfessional(userForm, userModel));
			userModel.setInsured(getInsured(userForm, userModel));
			userRepository.save(userModel);
			return userModel;
		}
	
		throw new EntityNotFoundException();
	}
	
	private void updateProviders(User userModel, UserForm userForm) {
		Provider providerFromDataBase = getProviderFromDataBase(userForm);
		if (providerFromDataBase != null) {			
			userModel.getProviders().add(providerFromDataBase);
		}
		
	}

	private Provider getProviderFromDataBase(UserForm form) {
		Provider provider = null;
		if(form.getProviderId() != null) {
			Optional<Provider> resultProvider = providerRepository.findById(new Long(form.getProviderId()));
			if(resultProvider.isPresent()) {
				provider = resultProvider.get();
			}
		}
		return provider;
	}

	private void validateSecretaryWithProvider(User userModel, Set<Provider> providers) {
		if(userModel.isSecretary() && CollectionUtils.isEmpty(providers)) {
			throw new InvalidException("Informe um Prestador válido.");
		}
	}

	private Professional getProfessional(UserForm form, User userModel) {
		Professional professional = null;
		if (userModel != null)
			professional = userModel.getProfessional();

		if(form.getProfessionalId() != null) {
			professional = null;
			Optional<Professional> resultProfessional = professionalRepository.findById(new Long(form.getProfessionalId()));
			if(resultProfessional.isPresent()) {
				professional = resultProfessional.get();
			}
		}

		boolean willBeProfessional = form.getProfile() != null && form.getProfile().toUpperCase().equals(UserType.PROFESSIONAL.name());
		boolean alreadyProfessional = userModel != null && userModel.isProfessional();
		boolean isProfessional = willBeProfessional || alreadyProfessional;
		if(isProfessional && professional == null) {
			throw new InvalidException("Informe um Profissional válido.");		
		} 

		return professional;
	}

	private Insured getInsured(UserForm form, User userModel) {
		Insured insured = null;
		if (userModel != null)
			insured = userModel.getInsured();

		if(form.getInsuredId() != null) {
			insured = null;
			Optional<Insured> resultInsured = insuredRepository.findById(new Long(form.getInsuredId()));
			if(resultInsured.isPresent()) {
				insured = resultInsured.get();
			}
		}

		boolean willBeInsured = form.getProfile() != null && form.getProfile().toUpperCase().equals(UserType.INSURED.name());
		boolean alreadyInsured = userModel != null && userModel.isInsured();
		boolean isInsured = willBeInsured || alreadyInsured;
		if(isInsured && insured == null) {
			throw new InvalidException("Informe um Segurado válido.");		
		} 

		return insured;
	}

	private Profile perfilCheck(UserForm userForm) {
		String profileUpper = userForm.getProfile().toUpperCase();
		Optional<Profile> result = profileRepository.findByName(profileUpper);
		if(result.isPresent()) {
			return result.get();
		}
		throw new EntityNotFoundException("O perfil informado não é válido.");
	}

	public User findByInsured(Insured insured) {
		Optional<User> optionalUser = userRepository.findByInsured(insured);
		
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}
	
	public User changePassword(String newPassword, User user) {
		user.setPassword(new BCryptPasswordEncoder().encode(newPassword));
		
		return userRepository.save(user);
	}

	public User findByLogin(String login) {
		Optional<User> optionalUser = userRepository.findByLogin(login);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

	public User updateRecoveryPasswordCode(User user) {
		String recoveryCode = RandomStringUtils.random(6, false, true);
	    Calendar c = Calendar.getInstance();
	    c.add(Calendar.MINUTE, 10);
	    
	    user.setRecoveryPasswordCode(recoveryCode);
	    user.setRecoveryPasswordCodeExpirationDate(c.getTime());
		return userRepository.save(user);
	}
	
	public User findByEmail(String email) {
		Optional<User> optionalUser = userRepository.findByEmail(email);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}
	
	public User findByRecoveryPasswordCode(String recoveryPasswordCode) {
		Optional<User> optionalUser = userRepository.findByRecoveryPasswordCodeAndRecoveryPasswordCodeExpirationDateGreaterThanEqual(recoveryPasswordCode, new Date());
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

	public boolean isRecoveryCodeValid(String recoveryCode, User user) {
		return user != null && !StringUtils.isEmpty(user.getRecoveryPasswordCode()) && user.getRecoveryPasswordCode().equals(recoveryCode) && user.getRecoveryPasswordCodeExpirationDate().after(new Date());
	}

	public void updateAcceptTerms() {
		User currentUser = authenticationService.currentUser();
		currentUser.setTermsAccepted(Boolean.TRUE);

		userRepository.save(currentUser);
	}

	public String activateInsuredAccount(@Valid ActivationAccountForm form) {
		User user = userRepository.findByEmailAndRecoveryPasswordCode(form.getEmail(), form.getCode())
				.orElseThrow(() -> new EntityNotFoundException("Email ou código de ativação inválidos"));

		if (user.isRecoveryCodeExpired()) {
			throw new InvalidException("Código de ativação expirado");
		}

		Insured insured = Optional.ofNullable(user.getInsured())
				.orElseThrow(() -> new InvalidException("Operação não permitida para o usuário fornecido"));
		insured.manageCurrentSituation(ACTIVE, null);
		insuredRepository.save(insured);

		user.setRecoveryPasswordCode(null);
		user.setRecoveryPasswordCodeExpirationDate(null);
		user.setInsured(insured);
		userRepository.save(user);

		return "Conta ativada com sucesso";
	}

	public Optional<TermsOfUse> getTerms(Long id) {
		return termsOfUseRepository.findById(id);
	}

	public ResponseEntity<?> updateProfile(UserProfileUpdateForm form) {
		
		validateGender(form);
		
		User currentUser =  Optional.ofNullable(authenticationService.currentUser()).orElseThrow(()-> new InvalidUserException("Não foi possível identificar o usuário."));
		
		updateUserProfile(form, currentUser);
		
		return ResponseEntity.ok(new MessageDto("Perfil do usuário atualizado com sucesso."));
		
	}

	private void updateUserProfile(UserProfileUpdateForm form, User currentUser) {
		currentUser.setName(form.getName());
		currentUser.setBirthDate(form.getBirthDateParsed());
		currentUser.setGender(form.getGenderEnum());
		if(currentUser.isInsured()) {
			insuredService.updateProfile(currentUser.getInsured().getId(), new ProfileUpdateForm(form));
		}
		userRepository.save(currentUser);
		
	}

	private void validateGender(UserProfileUpdateForm form) {
		List<String> acceptedValues = Stream.of(GenderEnum.class.getEnumConstants())
                .map(Enum::name)
                .collect(Collectors.toList());
		if(!acceptedValues.contains(form.getGender().toUpperCase())) {
			throw new InvalidException("O sexo informado não é válido. Valores possíveis: "+String.join(" | ", acceptedValues));
		}
		
	}

	public MessageDto changePassword(ChangePasswordUserForm form, BindingResult result) throws NoSuchMethodException, MethodArgumentNotValidException {

		User currentUser =  Optional.ofNullable(authenticationService.currentUser()).orElseThrow(()-> new InvalidUserException("Não foi possível identificar o usuário."));
		validatePasswords(form, currentUser, result);
		currentUser.setPassword(new BCryptPasswordEncoder().encode(form.getNewPassword()));
		userRepository.save(currentUser);
		return new MessageDto("Senha atualizada com sucesso");
	}

	private void validatePasswords(ChangePasswordUserForm form, User user, BindingResult result) throws NoSuchMethodException, MethodArgumentNotValidException {
		BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

		if(!bCrypt.matches(form.getOldPassword(), user.getPassword()))
			result.addError(new ObjectError("oldPassword", "Senha antiga informada não confere"));

		if(bCrypt.matches(form.getOldPassword(), bCrypt.encode(form.getNewPassword())))
			result.addError(new ObjectError("oldPassword", "A nova senha deve ser diferente da atual"));

		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(
					new MethodParameter(this.getClass().getDeclaredMethod("changePassword", ChangePasswordUserForm.class,  BindingResult.class), 0),
					result
			);
		}
	}

	public ResponseEntity<?> updateContactInfo(@Valid UserContactInfoUpdateForm form) {
		boolean phoneNumberValid = Utils.isLandlineNumberValid(form.getPhoneNumber());
		if(!phoneNumberValid) {
			throw new InvalidException("O número de telefone informado não é válido.");
		}
		boolean emailValid = Utils.isEmailValid(form.getEmail());
		if(!emailValid) {
			throw new InvalidException("O email informado não é válido");
		}

		User currentUser =  Optional.ofNullable(authenticationService.currentUser()).orElseThrow(()-> new InvalidUserException("Não foi possível identificar o usuário."));

		Integer count = userRepository.countByEmailAndIdNot(form.getEmail(), currentUser.getId());
		if(count > 0) {
			throw new InvalidException("Já existe uma outra conta com o e-mail informado.");
		}

		currentUser.setEmail(form.getEmail());
		currentUser.setPhoneNumber(form.getCleanedPhoneNumber());
		if(currentUser.isInsured()) {
			insuredService.updateContact(currentUser.getInsured().getId(), form);
		}
		userRepository.save(currentUser);

		return ResponseEntity.ok(new MessageDto("Informações de contato do usuário atualizadas com sucesso."));
	}

}
