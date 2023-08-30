package br.com.maidahealth.telemedapi.customvalidations;


import br.com.maidahealth.telemedapi.enums.PaymentMethod;
import br.com.maidahealth.telemedapi.enums.PaymentType;
import br.com.maidahealth.telemedapi.form.CardForm;
import br.com.maidahealth.telemedapi.form.PaymentOrderForm;
import br.com.maidahealth.telemedapi.form.QueuePositionForm;
import br.com.maidahealth.telemedapi.models.*;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.CardTokenRepository;
import br.com.maidahealth.telemedapi.services.AuthenticationService;
import br.com.maidahealth.telemedapi.services.HealthInsurerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class PaymentOrderValidator implements Validator {

    @Autowired
    private HealthInsurerService healthInsurerService;

    @Autowired
    private CardTokenRepository cardTokenRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public boolean supports(Class<?> clazz) {
        return QueuePositionForm.class.isAssignableFrom(clazz);
    }



    @Override
    public void validate(Object target, Errors errors) {
        if (errors.getErrorCount() == 0 && needsValidationPayment()) {
            QueuePositionForm queuePositionForm = (QueuePositionForm) target;
            PaymentOrderForm paymentOrderForm = Optional.of(queuePositionForm)
                    .map(QueuePositionForm::getPayment).orElse(null);
            if (paymentOrderForm == null) {
                errors.reject("Error", "Informe os dados de pagamento");
            } else {
                validatePaymentType(paymentOrderForm, errors);
                validateInstallments(paymentOrderForm, errors);
                validateOrderForm(paymentOrderForm, errors);
            }
        }
    }

    private boolean needsValidationPayment() {
        boolean isPaymentAllowedByHealthInsurer = PaymentType.CURRENCY.equals(healthInsurerService.getHealthInsurer().getPaymentType());
        if (isPaymentAllowedByHealthInsurer) {
            List<Insured> insureds = Optional.ofNullable(authenticationService.currentUser())
                    .map(User::getInsured)
                    .map(Collections::singletonList).orElse(null);

            if (insureds == null) {
                return true;
            }

            List<AttendanceStatus> approvedStatus = Collections.singletonList(AttendanceStatus.PAYMENT_APPROVED);
            List<AttendanceType> urgencyType = Collections.singletonList(AttendanceType.URGENCY);
            List<Attendance> attendances = attendanceRepository.findByInsuredInAndStatusInAndTypeIn(insureds, approvedStatus, urgencyType);

            return attendances.size() <= 0;
        }

        return false;
    }

    private void validatePaymentType(PaymentOrderForm form, Errors errors) {
        List<String> subset = Arrays.stream(PaymentMethod.values()).map(Enum::name).collect(Collectors.toList());
        String paymentMethod = Optional.of(form).map(PaymentOrderForm::getType).orElse(null);

        if (paymentMethod == null) {
            errors.rejectValue("payment.type", "", "Tipo de pagamento não pode ser vazio");
        } else if(!subset.contains(form.getType().toUpperCase())){
            errors.rejectValue("payment.type", "", "Tipo de pagamento inválido");
        }
    }

    private void validateCardToken(PaymentOrderForm form, Errors errors) {
        Long tokenId = Optional.of(form).map(PaymentOrderForm::getCard).map(CardForm::getToken).orElse(null);
        if (StringUtils.isEmpty(tokenId)) {
            validateCardForm(form, errors);
        } else {
            Optional<CardToken> optionalCardToken = cardTokenRepository.findById(tokenId);
            if (!optionalCardToken.isPresent()) {
                errors.rejectValue("payment.card.token", "", "Token do cartão inválido");
            }
        }
    }

    private void validateCardForm(PaymentOrderForm form, Errors errors) {
        Optional.ofNullable(form).map(PaymentOrderForm::getCard).ifPresent(cardForm -> {
            validateSecurityCode(cardForm.getSecurityCode(), errors);
            validateCardNumber(cardForm.getNumber(), errors);
            validateCardHolder(cardForm.getHolder(), errors);
            validateCardExpiration(cardForm.getExpirationDate(), errors);
            validateCardBrand(cardForm.getBrand(), errors);
        });
    }

    private void validateCardBrand(String brand, Errors errors) {
        if (StringUtils.isEmpty(brand)) {
            errors.rejectValue("payment.card.brand", "", "Bandeira do cartão não pode ser vazio");
        }
    }

    private void validateCardExpiration(String expirationDate, Errors errors) {
        boolean matches = Pattern.matches("\\d{2}/\\d{4}", expirationDate);
        if (matches) {
            String[] split = expirationDate.split("/");
            int month = Integer.parseInt(split[0]);
            if (month > 12) {
                errors.rejectValue("payment.card.expirationDate", "", "Data de validade do cartão inválida");
            }
        } else {
            errors.rejectValue("payment.card.expirationDate", "", "Formato da data de validade inválido");
        }
    }

    private void validateCardHolder(String holder, Errors errors) {
        if (StringUtils.isEmpty(holder)) {
            errors.rejectValue("payment.card.holder", "", "Nome impresso no cartão não pode ser vazio");
        }
    }

    private void validateOrderForm(PaymentOrderForm form, Errors errors) {
        CardForm cardForm = Optional.ofNullable(form).map(PaymentOrderForm::getCard).orElse(null);
        if (cardForm == null) {
            errors.rejectValue("payment.card", "", "Os dados do cartão não podem ser vazios");
        } else {
            validateCardToken(form, errors);
        }
    }

    private void validateSecurityCode(String securityCode, Errors errors) {
        if (StringUtils.isEmpty(securityCode)) {
            errors.rejectValue("payment.card.securityCode", "", "Código de segurança não pode ser vazio");
        } else {
            boolean matches = Pattern.matches("\\d{3}", securityCode);
            if (!matches) {
                errors.rejectValue("payment.card.securityCode", "", "Código de segurança inválido");
            }
        }
    }

    private void validateInstallments(PaymentOrderForm form, Errors errors) {
        Integer maxInstallments = healthInsurerService.getHealthInsurer().getPaymentConfig().getMaxInstallments();
        Integer installments = form.getInstallments();
        if (installments == null) {
            errors.rejectValue("payment.installments", "", "Quantidade de parcelas não pode ser vazio");
        } else if (installments <= 0 || installments > maxInstallments) {
            errors.rejectValue("payment.installments", "", "Quantidade de parcelas inválido");
        }
    }

    private void validateCardNumber(String number, Errors errors) {
        if (StringUtils.isEmpty(number)) {
            errors.rejectValue("payment.card.number", "", "Número do cartão não pode ser vazio");
        } else if(number.length() != 16 || isNotNumeric(number)){
            errors.rejectValue("payment.card.number", "", "Número do cartão deve conter 16 digitos numéricos");
        }
    }

    private boolean isNotNumeric(String str) {
        return !org.apache.commons.lang3.StringUtils.isNumeric(str);
    }
}
