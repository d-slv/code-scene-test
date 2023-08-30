package br.com.maidahealth.telemedapi.enums;

import java.util.Arrays;
import java.util.List;

import org.springframework.util.StringUtils;

import br.com.maidahealth.telemedapi.exceptions.InvalidException;

public enum ReturnAttendanceReasonEnum {
    
    CONTINUE_TREATMENT("Continuar tratamento"),
	SHOW_EXAMS("Mostrar exames"),
	RENEW_PRESCRIPTION("Renovar receita"),
	CHANGE_MEDICATION("Trocar medicação");

	private String description;

	private ReturnAttendanceReasonEnum(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static List<ReturnAttendanceReasonEnum> getReasons() {
		return Arrays.asList(CONTINUE_TREATMENT, SHOW_EXAMS, RENEW_PRESCRIPTION, CHANGE_MEDICATION);
	}	
	
	public static ReturnAttendanceReasonEnum getReasonByDescription(String description) {
		if(StringUtils.isEmpty(description)) {
			return null;
		}
		ReturnAttendanceReasonEnum[] types = ReturnAttendanceReasonEnum.values();
		for (int i = 0; i < types.length; i++) {
			if(types[i].getDescription().equalsIgnoreCase(description)) {
				return types[i];
			}
		}
		throw new InvalidException("Motivo informado é inválido");
	}
}