package br.com.maidahealth.telemedapi.form;

import br.com.maidahealth.telemedapi.enums.AccountCancellationReasonEnum;

import javax.validation.constraints.NotNull;

public class AccountCancellationReasonForm {


	@NotNull(message = "Obrigatorio informar o motivo")
	private AccountCancellationReasonEnum reason;

	private String detail;

	public AccountCancellationReasonEnum getReason() {
		return reason;
	}

	public void setReason(AccountCancellationReasonEnum reason) {
		this.reason = reason;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}
}
