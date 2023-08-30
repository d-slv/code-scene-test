package br.com.maidahealth.telemedapi.customvalidations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class GenderSubsetValidator implements ConstraintValidator<GenderSubset, String> {
    private String[] subset;

    @Override
    public void initialize(GenderSubset constraint) {
        this.subset = constraint.anyOf();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value == null || Arrays.asList(subset).contains(value);
    }

}
