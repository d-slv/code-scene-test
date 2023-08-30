package br.com.maidahealth.telemedapi.customvalidations;

import br.com.maidahealth.telemedapi.enums.ConnectionStatusEnum;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = ConnectionStatusValidator.class)
public @interface ConnectionStatus {
    Class<? extends Enum<?>> enumClass();

    ConnectionStatusEnum[] any();

    String message() default "o valor deve ser {any}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
