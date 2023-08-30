package br.com.maidahealth.telemedapi.customvalidations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ConnectionStatusValidator implements ConstraintValidator<ConnectionStatus, CharSequence> {

    private List<String> acceptedValues;

    @Override
    public void initialize(ConnectionStatus constraintAnnotation) {
        acceptedValues = Stream.of(constraintAnnotation.enumClass().getEnumConstants())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isValid(CharSequence value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        return acceptedValues.contains(value.toString());
    }
}
