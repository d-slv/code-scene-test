package br.com.maidahealth.telemedapi.customvalidations;

import java.util.Date;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.util.StringUtils;

import br.com.maidahealth.telemedapi.enums.LoginTypeEnum;
import br.com.maidahealth.telemedapi.form.LoginForm;

public class LoginFormValidator implements ConstraintValidator<ValidLoginForm, LoginForm> {

	@Override
	public void initialize(ValidLoginForm constraintAnnotation) {
		ConstraintValidator.super.initialize(constraintAnnotation);
	}
	
	@Override
	public boolean isValid(LoginForm form, ConstraintValidatorContext context) {
		String login = form.getLogin();
		String password = form.getPassword();
		String cpf = form.getCpf();
		String registrationNumber = form.getRegistrationNumber();
		Date birthDate = form.getBirthDate();
		LoginTypeEnum type = form.getType();
		String healthInsuranceNumber = form.getHealthInsuranceNumber();
		
		Boolean resp = false;
		
		if(type == null || type == LoginTypeEnum.LOGIN_PASSWORD)
			resp = StringUtils.isEmpty(login) || StringUtils.isEmpty(password);
		else if(type == LoginTypeEnum.CPF_HEALTHINSURANCENUMBER_REGISTRATIONNUMBER_BIRTHDATE)
			resp = StringUtils.isEmpty(cpf) && StringUtils.isEmpty(healthInsuranceNumber) || StringUtils.isEmpty(registrationNumber) || StringUtils.isEmpty(birthDate);
		
		return !resp;
	}

	
}
