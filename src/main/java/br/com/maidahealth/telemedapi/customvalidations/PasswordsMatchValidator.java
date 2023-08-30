package br.com.maidahealth.telemedapi.customvalidations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordsMatchValidator implements ConstraintValidator<PasswordsMatch, Object>{
	
	@Override
	public boolean isValid(Object value, ConstraintValidatorContext context) {
		try {
			Object newPass = value.getClass().getMethod("getNewPassword").invoke(value);
			Object newPassConfirmation = value.getClass().getMethod("getNewPasswordConfirmation").invoke(value);
			return newPass.equals(newPassConfirmation);
		} catch (Exception e) {
			return false;
		}
	}

}
