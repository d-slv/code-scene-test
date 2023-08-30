package br.com.maidahealth.telemedapi.customvalidations;


import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import br.com.maidahealth.telemedapi.form.InsuredSignupForm;
import br.com.maidahealth.telemedapi.models.HealthInsurer;
import br.com.maidahealth.telemedapi.repositories.CityRepository;
import br.com.maidahealth.telemedapi.repositories.InsuredRepository;
import br.com.maidahealth.telemedapi.repositories.UserRepository;
import br.com.maidahealth.telemedapi.services.HealthInsurerService;
import br.com.maidahealth.telemedapi.utils.Utils;

@Component
public class SignupInsuredFormValidator implements Validator {

    @Autowired
    private HealthInsurerService healthInsurerService;

    @Autowired
    private InsuredRepository insuredRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CityRepository cityRepository;

    @Override
    public boolean supports(Class<?> clazz) {
        return InsuredSignupForm.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        if (errors.getErrorCount() == 0) {
            InsuredSignupForm insuredSignupForm = (InsuredSignupForm) target;

            validateSignUpInsuredPermitted(errors);
            validatePasswordAndConfirmationMatch(insuredSignupForm, errors);
            validatePhoneNumber(insuredSignupForm, errors);
            validateInsuredAlreadyExists(insuredSignupForm, errors);
            validateEmailAlreadyExists(insuredSignupForm, errors);
            validateBirthDate(insuredSignupForm, errors);
            validateAddress(insuredSignupForm, errors);
        }
    }

    private void validateAddress(InsuredSignupForm form, Errors errors) {
        if (!cityRepository.findByIbgeCode(form.getAddress().getIbgeCode()).isPresent()) {
            errors.rejectValue("address.ibgeCode", null, "Código IBGE inválido");
        }
    }

    private void validateBirthDate(InsuredSignupForm form, Errors errors) {
        Date parsedDate = Utils.parse(form.getBirthDate(), "yyyy-MM-dd");
        if (parsedDate == null) {
            errors.rejectValue("birthDate", null, "Formato de data inválido");
        }
    }

    private void validateEmailAlreadyExists(InsuredSignupForm form, Errors errors) {
        if (userRepository.findByEmail(form.getEmail()).isPresent()) {
            errors.rejectValue("email", null, "Email já cadastrado na base de segurados");
        }
    }

    private void validateInsuredAlreadyExists(InsuredSignupForm form, Errors errors) {
        if (insuredRepository.findByCpf(form.getCpf()).isPresent()) {
            errors.rejectValue("cpf", null, "CPF já cadastrado na base de segurados");
        }
    }

    private void validatePhoneNumber(InsuredSignupForm form, Errors errors) {
        if (!Utils.isCellPhoneNumberValid(form.getPhoneNumber())) {
            errors.rejectValue("phoneNumber", null, "Telefone inválido");
        }
    }

    private void validateSignUpInsuredPermitted(Errors errors) {
        HealthInsurer healthInsurer = healthInsurerService.getHealthInsurer();
        Boolean permitted = Optional.ofNullable(healthInsurer).map(HealthInsurer::getAllowInsuredSignUp).orElse(false);
        if (!permitted) {
            errors.rejectValue(null, null, "Operação negada pelo cliente");
        }
    }

    private void validatePasswordAndConfirmationMatch(InsuredSignupForm form, Errors errors) {
        if (passwordAndConfirmationNotMatch(form)) {
            errors.rejectValue("password", null, "Senha e confirmação de senha devem ser iguais");
        }
    }


    private boolean passwordAndConfirmationNotMatch(InsuredSignupForm form) {
        String confirmation = form.getPasswordConfirmation();
        return !confirmation.equals(form.getPassword());
    }
}
