package br.com.maidahealth.telemedapi.services;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.databind.JsonNode;

import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.dto.TokenDto;
import br.com.maidahealth.telemedapi.enums.LoginTypeEnum;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.exceptions.NotAuthorizedException;
import br.com.maidahealth.telemedapi.form.LoginForm;
import br.com.maidahealth.telemedapi.form.LogoutForm;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.InsuredSituationType;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.UserRepository;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class AuthenticationService implements UserDetailsService{
	
	private static final Logger LOG = LoggerFactory.getLogger(AuthenticationService.class);

	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private InsuredService insuredService;
	
	@Autowired
	private DeviceService deviceService;
	
	@Autowired
	private TelemedServerService telemedServerService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<User> result = repository.findByLogin(username);
		
		if(result.isPresent()) {
			User user = result.get();

			if(user.isInsured() && !user.getInsured().getCurrentSituation().equals(InsuredSituationType.ACTIVE))
				throw new UsernameNotFoundException("O login informado é inválido. Segurado não está ativo.");

			return user;
		}

		throw new UsernameNotFoundException("O login informado é inválido");
	}

	public User currentUser() {
		User currentUser= null;
		try {
			currentUser = repository.findByLogin(SecurityContextHolder.getContext().getAuthentication().getName()).get();
		}catch (Exception e) {
			throw new InvalidException("Usuário invalido");
		}
		return currentUser;
	}

	public UsernamePasswordAuthenticationToken getUserNamePasswordAuthenticationToken(LoginForm form) throws ParseException {
		if(form.getType() == LoginTypeEnum.CPF_HEALTHINSURANCENUMBER_REGISTRATIONNUMBER_BIRTHDATE) {
			String cpfOrHealthInsuranceNumber = StringUtils.isEmpty(form.getCpf()) ? form.getHealthInsuranceNumber() : form.getCpf();
			Insured insured = insuredService.getInsuredByCpfOrHealthInsuranceNumberAndRegistrationNumberAndBirthDate(cpfOrHealthInsuranceNumber, form.getRegistrationNumber(), form.getBirthDate());
			
			if(insured != null) {
				User user = insured.getUser();
				form.setLogin(user.getLogin());
				
				Calendar c = Calendar.getInstance();
				c.setTime(insured.getBirthDate());
				
				String day = String.valueOf(c.get(Calendar.DAY_OF_MONTH));
				String month = String.valueOf((c.get(Calendar.MONTH)+1));
				String year = String.valueOf(c.get(Calendar.YEAR));
				String stringDate = Utils.complete(day, 2, "0") + Utils.complete(month, 2, "0") + Utils.complete(year, 4, "0");  
				
				String password = insured.getRegistrationNumber() + stringDate;
				
				form.setPassword(password);
			}			
			
		}
		
		return form.convert();
	}

	public ResponseEntity<Object> authenticate(@Valid LoginForm form) {
		try {
			return ResponseEntity.ok(authForm(form));
		} catch (Exception e) {
			// e.printStackTrace();
			if (e instanceof BadCredentialsException) {
				return new ResponseEntity<>(new MessageDto("Um ou mais campos inválidos. Verifique os dados e tente novamente."), HttpStatus.UNAUTHORIZED);
			}
			return new ResponseEntity<>(new MessageDto(e.getLocalizedMessage()), HttpStatus.UNAUTHORIZED);
		}
	}

	public ResponseEntity<Object> authenticateByToken(String publicToken) {
		try {
			Insured insured = insuredService.findByPublicToken(publicToken);
			
			if(!insured.getCurrentSituation().equals(InsuredSituationType.ACTIVE))
				return new ResponseEntity<>(new MessageDto("Segurado não está ativo."), HttpStatus.UNAUTHORIZED);
			
			User user = insured.getUser();
			String token = tokenService.generateToken(user);
			
			return ResponseEntity.ok(new TokenDto(token,"Bearer ", user));
			
		} catch (Exception e) {
			// e.printStackTrace();
			return new ResponseEntity<>(new MessageDto("Token inválido. Verifique os dados e tente novamente."), HttpStatus.UNAUTHORIZED);
		}
	}

	public void logout(@Valid LogoutForm form) {
		deviceService.deleteDevice(form.getDeviceId());
	}
	
	private TokenDto authForm(LoginForm form) throws ParseException {
		UsernamePasswordAuthenticationToken userToken = getUserNamePasswordAuthenticationToken(form);
		Authentication authenticate = authManager.authenticate(userToken);
		String accessToken = tokenService.generateToken(authenticate);

		User principal = (User) authenticate.getPrincipal();
		tokenService.saveToken(principal, accessToken);
		
		checkStatusOnClient(principal);

		return new TokenDto(accessToken, "Bearer", principal);
	}

	private void checkStatusOnClient(User user) {
		if(user.isInsured()) {
			LOG.info("Validando usuário na API do Cliente durante autenticação: " + user.getCpf());
			if(insuredService.isEligibleOnClient(user) == null) {
				throw new NotAuthorizedException("Paciente não está ativo na seguradora.");
			}
		}
	}

	public JsonNode authenticateByClientToken(String accessKey) {
		JsonNode token = telemedServerService.getDocwayAcessTokenByClientToken(accessKey);
		return token;
	}

	public ResponseEntity<Object> refreshAccessToken(String authorization) {
		String[] tokenArray = authorization.split("\\s");
		String accessToken = tokenArray.length > 1 ? tokenArray[1] : "";

		try {
			return tokenService.refreshAccessToken(accessToken);
		} catch (UnsupportedEncodingException e) {
			// e.printStackTrace();
			return new ResponseEntity<>(new MessageDto("Erro ao processar requisição."), HttpStatus.UNAUTHORIZED);
		}
	}
}
