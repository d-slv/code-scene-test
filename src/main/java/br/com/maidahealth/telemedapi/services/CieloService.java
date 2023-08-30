package br.com.maidahealth.telemedapi.services;

import br.com.maidahealth.telemedapi.dto.CardBinDto;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import br.com.maidahealth.telemedapi.enums.*;
import br.com.maidahealth.telemedapi.models.*;
import br.com.maidahealth.telemedapi.repositories.ChargeBackRepository;
import br.com.maidahealth.telemedapi.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.CardForm;
import br.com.maidahealth.telemedapi.form.PaymentOrderForm;
import br.com.maidahealth.telemedapi.repositories.AttendanceRepository;
import br.com.maidahealth.telemedapi.repositories.PaymentTransactionRepository;
import br.com.maidahealth.telemedapi.utils.CieloHelper;
import reactor.core.publisher.Mono;

@Service
public class CieloService implements PaymentService {

    private static final Logger LOG = LoggerFactory.getLogger(CieloService.class);

    @Autowired
    private HealthInsurerService healthInsurerService;

	@Autowired
	private PaymentTransactionRepository paymentTransactionRepository;

    @Autowired
    private CardTokenService cardTokenService;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ChargeBackRepository chargeBackRepository;

    @Override
    public Attendance authorize(Attendance attendance, Object paymentOrderForm) {
        PaymentOrderForm form = (PaymentOrderForm) paymentOrderForm;

        JsonObject body = createAuthorizationBody(form, attendance);
        JsonNode response = post(body);

        Optional.ofNullable(response).map(node -> node.get(CieloHelper.PAYMENT)).ifPresent(paymentNode -> {
            PaymentTransactionStatusEnum status = PaymentTransactionStatusEnum.SUCCESS;
            if (isAuthorized(paymentNode) || isCaptured(paymentNode)) {
                attendance.setStatus(AttendanceStatus.PAYMENT_APPROVED);
                createCardToken(attendance, form, paymentNode);
            } else {
                attendance.setStatus(AttendanceStatus.PAYMENT_CANCELED);
            }
            createPaymentDetails(attendance, paymentNode, form);

            attendanceRepository.save(attendance);
            CardToken cardToken = attendance.getInsured().getCardTokens().stream()
                    .filter(card -> card.getId().equals(Optional.ofNullable(form.getCard().getToken()).orElse(null)))
                    .findFirst().orElse(null);
            if(isAuthorized(paymentNode)){
                log(attendance, PaymentTransactionTypeEnum.AUTHORIZATION,
                        status, response.toString(), cardToken);
            }else if(isCaptured(paymentNode)){
                attendance.getPaymentDetails().setInstallments(1);
                log(attendance, PaymentTransactionTypeEnum.AUTHORIZATION,
                        status, response.toString(), cardToken);
                log(attendance, PaymentTransactionTypeEnum.CAPTURE,
                        status, response.toString(), cardToken);
            }
        });
        if (attendance.getStatus().equals(AttendanceStatus.PAYMENT_CANCELED)) {
            throw new InvalidException("Pagamento não aprovado, verifique com a operadora de cartão");
        }

        return attendance;
    }

    private void createCardToken(Attendance attendance, PaymentOrderForm form, JsonNode paymentNode) {
        Optional.ofNullable(paymentNode)
                .map(node -> {
                    String type = PaymentMethod.valueOf(form.getType().toUpperCase()).getDescription();
                    return node.get(type);
                })
                .ifPresent(cardNode -> {
                    if (mustSaveCardToken(form, cardNode)) {
                        CardToken cardToken = generateCardToken(cardNode, attendance, form);
                        cardTokenService.save(cardToken);
                    }
                });
    }

    private boolean isAuthorized(JsonNode paymentNode) {
        int statusValue = Optional.ofNullable(paymentNode).map(node -> node.get(CieloHelper.TRANSACTION_STATUS)).map(JsonNode::asInt).orElseGet(() -> 0);
        return Objects.equals(PaymentDetailsStatusEnum.AUTHORIZED.getCode(), statusValue);
    }

    private boolean mustSaveCardToken(PaymentOrderForm form, JsonNode cardNode) {
        Boolean saveForm = Optional.ofNullable(form.getCard()).map(CardForm::getSave).orElse(false);
        return saveForm && StringUtils.isEmpty(form.getCard().getToken())
                && !StringUtils.isEmpty(cardNode.get(CieloHelper.CARD_TOKEN));
    }

    private CardToken generateCardToken(JsonNode cardNode, Attendance attendance, PaymentOrderForm form) {
        CardToken cardToken = new CardToken();
        cardToken.setBrand(cardNode.get(CieloHelper.CARD_BRAND).asText());
        cardToken.setExpirationDate(cardNode.get(CieloHelper.CARD_EXPIRATION).asText());
        cardToken.setHolder(cardNode.get(CieloHelper.CARD_HOLDER).asText());
        cardToken.setNumber(sliceMaskedCardNumber(cardNode.get(CieloHelper.CARD_NUMBER)));
        cardToken.setToken(cardNode.get(CieloHelper.CARD_TOKEN).asText());
        cardToken.setInsured(attendance.getInsured());

        Optional<CardBinDto> cardInfo = Optional.ofNullable(getCardInfo(form.getCard().getNumber()));
        cardInfo.map(CardBinDto::getCardType).ifPresent(cardToken::setType);

        return cardToken;
    }

    private String sliceMaskedCardNumber(JsonNode cardNumberNode) {
        return Optional.ofNullable(cardNumberNode)
                .map(JsonNode::asText)
                .map(str -> str.substring(str.length() - 8))
                .orElse(null);
    }

    private JsonObject createAuthorizationBody(PaymentOrderForm form, Attendance attendance) {
        String temporaryId = UUID.randomUUID().toString();
        JsonObject root = JsonParser.parseString("{}").getAsJsonObject();
        root.addProperty(CieloHelper.MERCHANT_ORDER_ID, temporaryId);

        JsonObject paymentJson = JsonParser.parseString("{}").getAsJsonObject();
        paymentJson.addProperty(CieloHelper.PAYMENT_TYPE, PaymentMethod.valueOf(form.getType().toUpperCase()).getDescription());
        paymentJson.addProperty(CieloHelper.AMOUNT, attendance.getPaymentDetails().priceToInt());
        paymentJson.addProperty(CieloHelper.AUTHENTICATE, false);
        if(PaymentMethod.valueOf(form.getType().toUpperCase()).equals(PaymentMethod.CREDIT)){
            paymentJson.addProperty(CieloHelper.INSTALLMENTS, form.getInstallments());
        }
        paymentJson.addProperty(CieloHelper.DESCRIPTOR, "Telehealth");

        JsonObject cardInfoJson = JsonParser.parseString("{}").getAsJsonObject();
        CardForm card = form.getCard();
        if (card.getToken() != null) {
            cardTokenService.findByTokenId(card.getToken()).map(CardToken::getToken).ifPresent(token -> {
                cardInfoJson.addProperty(CieloHelper.CARD_TOKEN, token);
            });
        } else {
            cardInfoJson.addProperty(CieloHelper.CARD_NUMBER, card.getNumber());
            cardInfoJson.addProperty(CieloHelper.CARD_HOLDER, card.getHolder());
            cardInfoJson.addProperty(CieloHelper.CARD_EXPIRATION, card.getExpirationDate());
            cardInfoJson.addProperty(CieloHelper.CARD_SAVE_TOKEN, Optional.ofNullable(card.getSave()).orElse(false));
        }
        cardInfoJson.addProperty(CieloHelper.CARD_CVV, card.getSecurityCode());
        cardInfoJson.addProperty(CieloHelper.CARD_BRAND, card.getBrand());

        paymentJson.add(PaymentMethod.valueOf(form.getType().toUpperCase()).getDescription(), cardInfoJson);
        root.add(CieloHelper.PAYMENT, paymentJson);

        return root;
    }

    private PaymentConfig getPaymentConfigs() {
        HealthInsurer healthInsurer = healthInsurerService.getHealthInsurer();
        return healthInsurer.getPaymentConfig();
    }

    private WebClient clientBuilder(String baseUri) {
        PaymentConfig configs = getPaymentConfigs();

        MultiValueMap<String, String> basicHeaders = new HttpHeaders();
        basicHeaders.add("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        basicHeaders.add("Accept", MediaType.APPLICATION_JSON_VALUE);
        basicHeaders.add("MerchantId", configs.getMerchantId());
        basicHeaders.add("MerchantKey", configs.getMerchantKey());

        return WebClient.builder()
                .baseUrl(baseUri)
                .defaultHeaders(httpHeaders -> httpHeaders.addAll(basicHeaders))
                .build();
    }

    private JsonNode post(JsonObject body) {
        PaymentConfig paymentConfigs = getPaymentConfigs();
        WebClient webClient = clientBuilder(paymentConfigs.getSalesUrl());

        return webClient.post()
                .uri("/1/sales")
                .body(BodyInserters.fromValue(body.toString()))
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, resp -> resp.bodyToMono(JsonNode.class)
                        .flatMap(bodyError -> {
                            LOG.error("Error :: {}", bodyError.toString());
                            return Mono.error(new InvalidException("Verifique os dados de pagamento"));
                        }))
                .onStatus(HttpStatus::is5xxServerError, resp -> Mono.error(new RuntimeException("5xx")))
                .bodyToMono(JsonNode.class)
                .block();
	}

    private void createPaymentDetails(Attendance attendance, JsonNode paymentNode, PaymentOrderForm form) {
        PaymentDetailsStatusEnum statusEnum = Arrays.stream(PaymentDetailsStatusEnum.values())
                .filter(transactionEnum -> Objects.equals(transactionEnum.getCode(), paymentNode.get(CieloHelper.TRANSACTION_STATUS).asInt()))
                .findFirst()
                .orElseGet(() -> PaymentDetailsStatusEnum.PENDING);

        attendance.getPaymentDetails().setStatus(statusEnum);
        attendance.getPaymentDetails().setTransactionId(paymentNode.get(CieloHelper.TRANSACTION_ID).asText());
        attendance.getPaymentDetails().setPaymentId(paymentNode.get(CieloHelper.PAYMENT_ID).asText());
        if(paymentNode.has(CieloHelper.INSTALLMENTS)){
            attendance.getPaymentDetails().setInstallments(paymentNode.get(CieloHelper.INSTALLMENTS).asInt());
        }
        attendance.getPaymentDetails().setPrice(BigDecimal.valueOf(attendance.getSpecialty().getCurrentUrgencyValue()));
        attendance.getPaymentDetails().setCardTokenType(CardTokenType.valueOf(form.getType()));
    }

    @Override
	public Attendance cancel(Attendance attendance) {

        // se payment details for nulo ou paymenteId vazio, retorna sem mais ações
        if (attendance.getPaymentDetails() == null || StringUtils.isEmpty(attendance.getPaymentDetails().getPaymentId()))
            return attendance;

        try {
            List<AttendanceStatus> validStatus = Arrays.asList(
    			AttendanceStatus.SCHEDULED,
    			AttendanceStatus.WAITING_IN_QUEUE,
    			AttendanceStatus.WAITING_INSURED,
    			AttendanceStatus.VIDEOCALL_IN_PROGRESS,
    			AttendanceStatus.VIDEOCALL_ENDED,
    			AttendanceStatus.PAYMENT_APPROVED
            );

            // se status do atendimento for inválido retorna sem mais ações
            if (!validStatus.contains(attendance.getStatus()))
    			return attendance;

            PaymentConfig paymentConfigs = getPaymentConfigs();

            WebClient webClient = clientBuilder(paymentConfigs.getSalesUrl());

            /*
                Faz requisição 
            */
            // FIXME: 03/12/2020 Verificar o motivo da exceção retornar: Only one connection receive subscriber allowed.
            JsonNode response = webClient.put()
                .uri("/1/sales/" + attendance.getPaymentDetails().getPaymentId() + "/void")
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, resp -> resp.bodyToMono(JsonNode.class)
                        .flatMap(bodyError -> {
                            LOG.error("Error :: {}", bodyError.toPrettyString());
                            log(attendance, PaymentTransactionTypeEnum.CANCEL, PaymentTransactionStatusEnum.ERROR, bodyError.path("erro").toString(), null);
                            return Mono.empty();
                        }))
                    .onStatus(HttpStatus::is5xxServerError, resp -> {
                        return Mono.error(new RuntimeException("5xx"));
                    })
                .bodyToMono(JsonNode.class)
                .block();

            if (isCanceled(response)) {
                log(attendance, PaymentTransactionTypeEnum.CANCEL, PaymentTransactionStatusEnum.SUCCESS, response.toString(), null);
                if (attendance.getStatus().equals(AttendanceStatus.FINISHED)) {
                    ChargeBack newChargeBack = new ChargeBack();
                    newChargeBack.setCreatedDate(Utils.currentDate());
                    newChargeBack.setAttendance(attendance);
                    newChargeBack.setPrice(attendance.getPaymentDetails().getPrice());
                    chargeBackRepository.save(newChargeBack);
                }

            }else {
                log(attendance, PaymentTransactionTypeEnum.CANCEL, PaymentTransactionStatusEnum.ERROR, response.toString(), null);
            }

		} catch (Exception e) {
            LOG.error("Error :: {}", e.getMessage());
            log(attendance, PaymentTransactionTypeEnum.CANCEL, PaymentTransactionStatusEnum.ERROR, e.getMessage(), null);
        }finally {
            attendance.getPaymentDetails().setStatus(PaymentDetailsStatusEnum.VOIDED);
        }

        emailService.sendCancelAttendanceMessage(attendance);
        emailService.sendChargebackAttendanceMessage(attendance);
        return attendance;
	}

    private boolean isCanceled(JsonNode responseNode) {
        int statusValue = Optional.ofNullable(responseNode).map(node -> node.get(CieloHelper.TRANSACTION_STATUS)).map(JsonNode::asInt).orElseGet(() -> 0);
        return Objects.equals(PaymentDetailsStatusEnum.VOIDED.getCode(), statusValue);
    }

	private void log(Attendance attendance, PaymentTransactionTypeEnum type, PaymentTransactionStatusEnum status, String details, CardToken cardToken) {
		PaymentTransaction paymentTransaction = new PaymentTransaction.Builder()
													  .attendace(attendance)
													  .type(type)
													  .status(status)
				                                      .details(details)
				                                      .cardToken(cardToken).build();

		paymentTransactionRepository.save(paymentTransaction);
	}

    public Attendance capture(Attendance attendance){

        PaymentConfig paymentConfigs = getPaymentConfigs();

        WebClient webClient = clientBuilder(paymentConfigs.getSalesUrl());
        JsonNode response = webClient.put()
                .uri("/1/sales/"+attendance.getPaymentDetails().getPaymentId()+"/capture")
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, resp -> resp.bodyToMono(JsonNode.class)
                        .flatMap(bodyError -> {
                            log(attendance, PaymentTransactionTypeEnum.CAPTURE,
                                    PaymentTransactionStatusEnum.ERROR, bodyError.path("erro").toString(), null);
                            LOG.error("Error :: {}", bodyError.toPrettyString());
                            return Mono.empty();
                        }))
                .onStatus(HttpStatus::is5xxServerError, resp -> Mono.empty())
                .bodyToMono(JsonNode.class)
                .block();

        PaymentDetailsStatusEnum detailsStatus = PaymentDetailsStatusEnum.PAYMENT_CONFIRMED;
        if (isCaptured(response)) {
            log(attendance, PaymentTransactionTypeEnum.CAPTURE,
                    PaymentTransactionStatusEnum.SUCCESS, response.toString(), null);
        }else {
            log(attendance, PaymentTransactionTypeEnum.CANCEL,
                    PaymentTransactionStatusEnum.ERROR, response.toString(), null);
            detailsStatus = PaymentDetailsStatusEnum.PENDING;
        }
        attendance.getPaymentDetails().setStatus(detailsStatus);

        emailService.sendFinishAttendanceMessage(attendance);
        return attendance;
    }

    private boolean isCaptured(JsonNode responseNode) {
        int statusValue = Optional.ofNullable(responseNode)
                .map(node -> node.get(CieloHelper.TRANSACTION_STATUS)).map(JsonNode::asInt).orElseGet(() -> 0);
        return Objects.equals(PaymentDetailsStatusEnum.PAYMENT_CONFIRMED.getCode(), statusValue);
    }

    public CardBinDto getCardInfo(String number){
        WebClient webClient = clientBuilder(getPaymentConfigs().getQueryUrl());
        JsonNode response = webClient.get()
                .uri("/1/cardBin/"+number)
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, resp -> resp.bodyToMono(JsonNode.class)
                        .flatMap(bodyError -> {
                            LOG.error("Error :: {}", bodyError.toString());
                            return Mono.error(new InvalidException(bodyError.findValuesAsText("Message")
                                    .stream().findFirst().map(String::toString).get()));

                        }))
                .onStatus(HttpStatus::is5xxServerError, resp -> Mono.error(new RuntimeException("5xx")))
                .bodyToMono(JsonNode.class)
                .block();

       return CardBinDto.converterFromBinResponse(response);
    }
}
