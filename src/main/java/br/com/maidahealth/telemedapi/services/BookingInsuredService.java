package br.com.maidahealth.telemedapi.services;

import static br.com.maidahealth.telemedapi.enums.AccountCancellationReasonEnum.INSURED_REGISTRATION;
import static br.com.maidahealth.telemedapi.models.InsuredSituationType.ACTIVE;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.google.gson.Gson;
import br.com.maidahealth.telemedapi.dto.ClientInsuredDto;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.ClientInsuredForm;
import br.com.maidahealth.telemedapi.models.City;
import br.com.maidahealth.telemedapi.models.Insured;
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
public class BookingInsuredService {
private static final Logger LOGGER = LoggerFactory.getLogger(InsuredService.class);

	@Autowired
	private InsuredRepository repository;

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TelemedServerService telemedServerService;

	@Autowired
	private CityRepository cityRepository;

	public String generateInsuredToken(Insured insured) throws Exception {
		LOGGER.info("==================== Booking Insured Service ====================");
		LOGGER.info(">>> generateInsuredToken <<<");

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
		return new String(hexChars);
	}

	public Object saveHolder(@Valid ClientInsuredForm form) {
		LOGGER.info("==================== Booking Insured Service ====================");
		LOGGER.info("##### saveHolder #####");
		
		// tenta recuper usuario pelo email		
		Optional<User> optionalUser = userRepository.findByEmail(form.getEmail());

		/* se o usuario for encontrado, verifica se usuário tem/não tem profile 
		   e se o beneficiário tem  health insurance number igual ao solicitado. 
		   Se não, retorna exceptiom com a devida mensagem */
		if (optionalUser.isPresent()) {
			User u = optionalUser.get();
			if (!u.isInsured() || u.isInsured()
					&& !u.getInsured().getHealthInsuranceNumber().equals(form.getHealthInsuranceNumber()))
				throw new InvalidException("Email já existente");
		}

		/* busca na tabela de cidades se há ibge code igual ao repassado, se não encontrado
		   retona exceptio com a devida mensagem */
		try {
			City c = cityRepository.findByIbgeCode(form.getAddress().getIbgeCode()).get();
			form.getAddress().setCity(c.getName());
			form.getAddress().setState(c.getState().getUf());
		} catch (Exception e) {
			throw new InvalidException("Código IBGE inválido");
		}

        // requisita ao server o cadastro do beneficiário
		LOGGER.info("Soliciando cadastro no server");
		TelemedServerResponseUtil respServer = telemedServerService.saveHolder(form, form.getHealthInsuranceIdentificator());
		
        // se realizado com sucesso
		if (respServer.getStatus().is2xxSuccessful()) {

            // transforma o payload de resposta em um ClientIsuredDto
			Gson gson = new Gson();
			String string = respServer.getBody().toString();
			ClientInsuredDto dto = gson.fromJson(string, ClientInsuredDto.class);

            // busca o beneficiário no client
			String externalId = (String) dto.getId();            
			Optional<Insured> optionalInsured = repository.findByDocwayId(externalId);
            
            // se não existir, cria a entidade beneficiário
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
			insured.setEmail(form.getEmail());

			// seta a current situation do beneficiário (não remover)
			if (insured.getId() == null) {
				insured.manageCurrentSituation(ACTIVE, INSURED_REGISTRATION);
			}

            // salva o a entidade beneficiário no client
			repository.save(insured);

            // cria senha de autenticação de usuário
			String password = StringUtils.isEmpty(form.getPassword()) ? Utils.DEFAULT_INSURED_PASSWORD
					: form.getPassword();
			password = new BCryptPasswordEncoder().encode(password);

			// recuper o perfil do usuário
			Profile profile = profileRepository.findByName(UserType.INSURED.name()).get();

			// recupera a entidade Usuário
			User user = insured.getUser();

			// se vazio, cria novo usuário, senão seta os damais campos
			if (user == null) {
				user = new User(form.getHealthInsuranceNumber(), insured.getName(), password, form.getEmail(), insured,
						Arrays.asList(profile));
			} else {
				user.setEmail(form.getEmail());
				user.setLogin(form.getHealthInsuranceNumber());
				user.setName(insured.getName());
				user.setInsured(insured);
			}

			// salva a entidade Usuário no client
			userRepository.save(user);

			// retorna a entidade do usuário
			return insured;
		}

		// retorna o response entity caso status diferente da família 200
		return respServer;
	}
}
