package br.com.maidahealth.telemedapi.customvalidations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = { PasswordsMatchValidator.class })
@Target({ElementType.TYPE, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface PasswordsMatch {

	String message() default "Nova senha e confirmação de senha não são iguais";
	
	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

}
