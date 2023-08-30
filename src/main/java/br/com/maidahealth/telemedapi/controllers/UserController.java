package br.com.maidahealth.telemedapi.controllers;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.maidahealth.telemedapi.dto.CurrentDateDto;
import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.dto.RecoveryPassDto;
import br.com.maidahealth.telemedapi.dto.TermsOfUseDto;
import br.com.maidahealth.telemedapi.dto.UserDto;
import br.com.maidahealth.telemedapi.dto.ValidateRecoveryCodePassDto;
import br.com.maidahealth.telemedapi.form.ActivationAccountForm;
import br.com.maidahealth.telemedapi.form.ChangePasswordUserForm;
import br.com.maidahealth.telemedapi.form.LoginForm;
import br.com.maidahealth.telemedapi.form.NewPassForm;
import br.com.maidahealth.telemedapi.form.RecoveryPassForm;
import br.com.maidahealth.telemedapi.form.UserContactInfoUpdateForm;
import br.com.maidahealth.telemedapi.form.UserForm;
import br.com.maidahealth.telemedapi.form.UserProfileUpdateForm;
import br.com.maidahealth.telemedapi.form.ValidateRecoveryCodePassForm;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.services.AuthenticationService;
import br.com.maidahealth.telemedapi.services.EmailService;
import br.com.maidahealth.telemedapi.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	private Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService service;

	@Autowired
	private AuthenticationService authenticationService;
	
	@Autowired
	private EmailService emailService;

	@RequestMapping("/hello")
	@ResponseBody
	public ResponseEntity<CurrentDateDto> hello() {

		CurrentDateDto dto = new CurrentDateDto();

		log.info("========================================");
		log.info("=========== " + dto.getCurrentDatePretty() + " ===========");
		log.info("========================================");
		
		return ResponseEntity.ok(dto);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public UserDto create(@RequestBody @Valid UserForm form) {
		User user = service.save(form);
		return UserDto.convert(user);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserDto> detail(@PathVariable Long id) {
		User user = service.find(id);
		if(user == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(UserDto.convert(user));
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public UserDto update(@PathVariable Long id, @RequestBody UserForm form) {
		User updatedUser = service.update(id,form);
		return UserDto.convert(updatedUser);
	}

	@GetMapping("me")
	public UserDto me() {
		return UserDto.convert(authenticationService.currentUser()); 
	}


	@PostMapping("recovery_pass")
	public ResponseEntity<Object> recoveryPass(@RequestBody @Valid RecoveryPassForm form, BindingResult result) throws NoSuchMethodException, SecurityException, MethodArgumentNotValidException, MessagingException {
		User user = service.findByLogin(form.getLogin());

		if(user == null)
			result.addError(new ObjectError("login", "Login inválido ou inexistente"));

		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(
					new MethodParameter(this.getClass().getDeclaredMethod("recoveryPass", RecoveryPassForm.class, BindingResult.class), 0), 
					result
					);
		}

		if(StringUtils.isEmpty(user.getEmail()))
			return new ResponseEntity<>(new MessageDto("Email inválido ou inexistente"), HttpStatus.NOT_FOUND);

		user = service.updateRecoveryPasswordCode(user);

		emailService.sendRecoveryPasswordCode(user, user.getRecoveryPasswordCode());

		return ResponseEntity.ok(RecoveryPassDto.convert(user));
	}

	@PostMapping("validate_recovery_code")
	public ResponseEntity<Object> validateRecoveryCode(@RequestBody @Valid ValidateRecoveryCodePassForm form, BindingResult result) throws NoSuchMethodException, SecurityException, MethodArgumentNotValidException {
		User user = service.findByEmail(form.getEmail());

		if(user == null)
			result.addError(new ObjectError("email", "E-mail inválido ou inexistente"));
		else if(!service.isRecoveryCodeValid(form.getRecoveryCode(), user))
			result.addError(new ObjectError("recoveryCode", "Código de recuperação inválido ou expirado"));

		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(
					new MethodParameter(this.getClass().getDeclaredMethod("validateRecoveryCode", ValidateRecoveryCodePassForm.class, BindingResult.class), 0), 
					result
					);
		}

		return ResponseEntity.ok(new ValidateRecoveryCodePassDto(user.getEmail(), user.getRecoveryPasswordCode()));
	}

	@PostMapping("new_pass")
	public ResponseEntity<Object> newPass(@RequestBody @Valid NewPassForm form, BindingResult result) throws NoSuchMethodException, SecurityException, MethodArgumentNotValidException {
		User user = service.findByEmail(form.getEmail());
		BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

		if(user == null)
			result.addError(new ObjectError("email", "E-mail inválido ou inexistente"));
		else if(!service.isRecoveryCodeValid(form.getRecoveryCode(), user))
			result.addError(new ObjectError("recoveryCode", "Código de recuperação inválido ou expirado"));
		else if(!StringUtils.isEmpty(form.getNewPassword()) && bCrypt.matches(form.getNewPassword(), user.getPassword()))
			result.addError(new ObjectError("newPassword", "A nova senha deve ser diferente da atual"));

		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(
					new MethodParameter(this.getClass().getDeclaredMethod("newPass", NewPassForm.class, BindingResult.class), 0), 
					result
					);
		}
		
		user = service.changePassword(form.getNewPassword(), user);
		
		LoginForm loginForm = new LoginForm();
		loginForm.setLogin(user.getLogin());
		loginForm.setPassword(form.getNewPassword());
		
		return authenticationService.authenticate(loginForm);
	}

	@PutMapping("/accept-terms")
	public ResponseEntity<?> setAcceptTerms() {
		service.updateAcceptTerms();

		return ResponseEntity.accepted().build();
	}

	@PostMapping("/activate_account")
	public ResponseEntity<?> activateInsuredAccount(@RequestBody @Valid ActivationAccountForm activationForm) {
		String message = service.activateInsuredAccount(activationForm);

		return ResponseEntity.ok(new MessageDto(message));
	}

	@GetMapping("/terms")
	public TermsOfUseDto getTerms() {
		 return TermsOfUseDto.convert(service.getTerms(1L).orElseThrow(
		 		()->new EntityNotFoundException("Termos de uso não localizados.")));
	}
	
	@PutMapping("/profile")
	public ResponseEntity<?> updateProfile(@RequestBody @Valid UserProfileUpdateForm form){
		return service.updateProfile(form);
	}

	@PutMapping("/contact")
	public ResponseEntity<?> updateContactInfo(@RequestBody @Valid UserContactInfoUpdateForm form){
		return service.updateContactInfo(form);
	}

	@PutMapping("/changepw")
	public ResponseEntity<Object> changePassword(@RequestBody @Valid ChangePasswordUserForm form, BindingResult result) throws NoSuchMethodException, MethodArgumentNotValidException {
		return ResponseEntity.ok(service.changePassword(form, result));
	}

}
