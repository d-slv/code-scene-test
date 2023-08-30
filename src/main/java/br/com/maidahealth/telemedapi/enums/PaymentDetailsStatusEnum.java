package br.com.maidahealth.telemedapi.enums;

public enum PaymentDetailsStatusEnum {

    NOT_FINISHED("Aguardando atualização de status", 0),
    AUTHORIZED("Pagamento apto a ser capturado ou definido como pago", 1),
    PAYMENT_CONFIRMED("Pagamento confirmado e finalizado", 2),
    DENIED("Pagamento negado pelo Autorizador", 3),
    VOIDED("Pagamento cancelado", 10),
    REFUNDED("Pagamento cancelado após 23:59 do dia de autorização", 11),
    PENDING("Aguardando status da instituição financeira", 12),
    ABORTED("Pagamento cancelado por falha no processamento ou por ação do AF", 13),
    SCHEDULED("Recorrência agendada", 20)
    ;


    private final String description;
    private final int code;

    PaymentDetailsStatusEnum(String description, int code) {
        this.description = description;
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public int getCode() {
        return code;
    }

}
