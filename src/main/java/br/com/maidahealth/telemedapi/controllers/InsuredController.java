package br.com.maidahealth.telemedapi.controllers;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.gson.Gson;

import br.com.maidahealth.telemedapi.customvalidations.SignupInsuredFormValidator;
import br.com.maidahealth.telemedapi.dto.ClientInsuredDto;
import br.com.maidahealth.telemedapi.dto.InsuredClientDto;
import br.com.maidahealth.telemedapi.dto.InsuredDto;
import br.com.maidahealth.telemedapi.dto.InsuredSignupDto;
import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.dto.SensediaDto;
import br.com.maidahealth.telemedapi.dto.Views;
import br.com.maidahealth.telemedapi.enums.AccountCancellationReasonEnum;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.exceptions.InvalidUserException;
import br.com.maidahealth.telemedapi.form.AccountCancellationReasonForm;
import br.com.maidahealth.telemedapi.form.ChangePasswordUserForm;
import br.com.maidahealth.telemedapi.form.ContactUpdateForm;
import br.com.maidahealth.telemedapi.form.InsuredClientForm;
import br.com.maidahealth.telemedapi.form.InsuredForm;
import br.com.maidahealth.telemedapi.form.InsuredResendForm;
import br.com.maidahealth.telemedapi.form.InsuredSignupForm;
import br.com.maidahealth.telemedapi.form.InsuredUpdateForm;
import br.com.maidahealth.telemedapi.form.PhoneForm;
import br.com.maidahealth.telemedapi.form.ProfileAddressUpdateForm;
import br.com.maidahealth.telemedapi.form.ProfileUpdateForm;
import br.com.maidahealth.telemedapi.migration.InsuredImportService;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.services.AttendanceService;
import br.com.maidahealth.telemedapi.services.InsuredService;
import br.com.maidahealth.telemedapi.utils.TelemedServerResponseUtil;

@RestController
@RequestMapping("/insured")
public class InsuredController {

	@Autowired
	private InsuredService service;

	@Autowired
	private AttendanceService attendanceService;

	@Autowired
	private InsuredImportService insuredImportService;

	@Autowired
	private SignupInsuredFormValidator signupInsuredFormValidator;

	@InitBinder(value = { "insuredSignupForm" })
	public void initSignupInsuredValidatorBinder(WebDataBinder binder) {
		binder.addValidators(signupInsuredFormValidator);
	}

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public Page<InsuredDto> find(
			@RequestParam(name = "cpfOrHealthInsuranceNumberOrName", required = false) String cpfOrHealthInsuranceNumberOrName,
			@RequestParam(name = "cpf", required = false) String cpf,
			@RequestParam(name = "gender", required = false) String gender,
			@RequestParam(name = "birtDateStart", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
			@RequestParam(name = "birtDateFinish", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date finishDate,
			@PageableDefault(page = 0, size = 10) Pageable pagination) {
		Page<Insured> insureds = service.findByCpfOrNameOrGenderOrBirthDate(cpfOrHealthInsuranceNumberOrName, cpf,
				gender, startDate, finishDate, pagination);
		return InsuredDto.convert(insureds);
	}

	@PostMapping("/save")
	@ResponseStatus(HttpStatus.CREATED)
	public InsuredClientDto save(@RequestBody @Valid InsuredClientForm form,
								@RequestHeader("Authorization") String token,
								@RequestParam("specialtyId") Optional<Long> optionalSpecialtyId, 
								@RequestParam(name = "checkCpf", required = false, defaultValue = "true") boolean checkCpf, HttpServletRequest request)
			throws NoSuchAlgorithmException, UnsupportedEncodingException {
		token = token.replace("Bearer", "").replaceAll(" ", "");
		if (!service.isTokenCreateInsuredValid(token))
			throw new InvalidUserException("Token inválido");

		InsuredClientDto insuredClientDto = service.saveInsuredClient(form, checkCpf);

		if (optionalSpecialtyId.isPresent()) {
			if (StringUtils.isEmpty(form.getPhoneNumber()))
				throw new InvalidException("Número de telefone obrigatório");

			attendanceService.saveUrgencyForClientInsured(insuredClientDto.getId(), optionalSpecialtyId.get(), null,
					null, false, null);
		}

		return insuredClientDto;
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<InsuredDto> detail(@PathVariable Long id) {
		Insured insured = service.find(id);
		if (insured == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(InsuredDto.convert(insured));
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<InsuredDto> update(@PathVariable Long id, @RequestBody InsuredForm form) {
		Insured updatedInsured = service.update(id, form);
		if (updatedInsured != null) {
			return ResponseEntity.ok(InsuredDto.convert(updatedInsured));
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("eligible")
	public ResponseEntity<Object> eligible() {
		Boolean isEligible = service.isEligible(null);

		return new ResponseEntity<Object>(isEligible ? HttpStatus.OK : HttpStatus.UNPROCESSABLE_ENTITY);
	}

	@GetMapping("eligible-on-client/{documento}")
	public ResponseEntity<SensediaDto> eligibleOnClient(@PathVariable String documento) {
		SensediaDto sensediaDto = service.isEligibleOnClient(documento);

		if (sensediaDto != null) {
			return ResponseEntity.ok(sensediaDto);
		}
		return ResponseEntity.unprocessableEntity().build();
	}

	@PostMapping("phone_number")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<InsuredDto> phoneNumber(@RequestBody PhoneForm form) {
		Insured updatedInsured = service.updatePhone(form);
		if (updatedInsured != null) {
			return ResponseEntity.ok(InsuredDto.convert(updatedInsured));
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("me/dependents")
	public ResponseEntity<List<InsuredDto>> myDependents() {
		List<Insured> dependents = service.getCurrentHolderDependents();
		List<InsuredDto> depDtos = new ArrayList<InsuredDto>();

		for (Insured insured : dependents) {
			depDtos.add(InsuredDto.convert(insured));
		}

		return ResponseEntity.ok(depDtos);
	}

	@PutMapping("me/update")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Object> update(@RequestBody @Valid InsuredUpdateForm form) {

		Object resp = service.updateInsured(form);
		if (resp instanceof ClientInsuredDto) {
			return ResponseEntity.ok(resp);
		}

		TelemedServerResponseUtil respUtil = (TelemedServerResponseUtil) resp;

		Object list = new Gson().fromJson(respUtil.getBody(), Object.class);

		return new ResponseEntity<Object>(list, respUtil.getStatus());
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@PostMapping("/import")
	public ResponseEntity<Object> importProfessional(@RequestParam(name = "file") MultipartFile multipartFile) {

		return insuredImportService.process(multipartFile);
	}

	@PutMapping("/{id}/profile")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Object> updateProfile(@RequestBody @Valid ProfileUpdateForm form, @PathVariable Long id) {

		Object resp = service.updateProfile(id, form);

		if (resp instanceof ClientInsuredDto) {
			return ResponseEntity.ok(resp);
		}

		TelemedServerResponseUtil responseUtil = (TelemedServerResponseUtil) resp;
		Object status = new Gson().fromJson(responseUtil.getBody(), Object.class);

		return new ResponseEntity<>(status, responseUtil.getStatus());

	}

	@PutMapping("/{id}/contact")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Object> updateContact(@RequestBody @Valid ContactUpdateForm form, @PathVariable Long id) {

		Object resp = service.updateContact(id, form);

		if (resp instanceof ClientInsuredDto) {
			return ResponseEntity.ok(resp);
		}

		TelemedServerResponseUtil responseUtil = (TelemedServerResponseUtil) resp;
		Object status = new Gson().fromJson(responseUtil.getBody(), Object.class);

		return new ResponseEntity<>(status, responseUtil.getStatus());

	}

	@PutMapping("/{id}/address")
	@JsonView(Views.UpdateProfile.class)
	public ResponseEntity<Object> updateProfileAddress(@RequestBody @Valid ProfileAddressUpdateForm form,
			@PathVariable Long id) {
		Object resp = service.updateProfileAddress(id, form);

		if (resp instanceof ClientInsuredDto) {
			return ResponseEntity.ok(resp);
		}

		TelemedServerResponseUtil responseUtil = (TelemedServerResponseUtil) resp;
		Object status = new Gson().fromJson(responseUtil.getBody(), Object.class);

		return new ResponseEntity<>(status, responseUtil.getStatus());
	}

	@PutMapping("/{id}/change-password")
	public ResponseEntity<Object> updateProfilePassword(@RequestBody @Valid ChangePasswordUserForm form,
			@PathVariable Long id, BindingResult result) throws NoSuchMethodException, MethodArgumentNotValidException {
		MessageDto message = service.updateProfilePassword(id, form, result);

		return ResponseEntity.ok(message);
	}

	@PostMapping("/{id}/cancel")
	public ResponseEntity<Object> cancel(@RequestBody @Valid AccountCancellationReasonForm form, @PathVariable Long id)
			throws SecurityException {

		if (form.getReason().equals(AccountCancellationReasonEnum.OTHER)) {
			if (form.getDetail().isEmpty() || form.getDetail().equals("")) {
				throw new InvalidException("Por favor descreva o motivo.");
			}
		}

		return ResponseEntity.ok(new InsuredDto(service.cancel(id, form)));
	}

	@PostMapping("/signup")
	public ResponseEntity<Object> signUpInsurer(@RequestBody @Valid InsuredSignupForm form) {
		InsuredSignupDto createdInsuredSignup = service.createInsuredFromSignUp(form);

		return ResponseEntity.ok(createdInsuredSignup);
	}

	@GetMapping("/me")
	public ResponseEntity<Object> getInsured() {
		ClientInsuredDto clientInsuredDto = service.getInsuredFromCurrentUser();

		return ResponseEntity.ok(clientInsuredDto);
	}

	@PreAuthorize("hasAnyRole({'ADMIN', 'CLIENT_ADMIN'})")
	@PostMapping("/migrate-cpf-and-name")
	public ResponseEntity<Object> migrateCpfAndName() {
		int count = service.migrateCpfAndName();
		return ResponseEntity
				.ok(new MessageDto("Migração de CPF e nome executada com sucesso. Registros atualizados: " + count));
	}

	@PostMapping("/resend")
	public ResponseEntity<String> resendIsuredActivationCode(@RequestBody @Valid InsuredResendForm form) {
		service.resendInsuredActivationCode(form);
		return ResponseEntity.ok("Código enviado para o email cadastrado");
	}
	
}
