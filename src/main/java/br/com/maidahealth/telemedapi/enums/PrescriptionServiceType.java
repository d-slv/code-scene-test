package br.com.maidahealth.telemedapi.enums;

import br.com.maidahealth.telemedapi.exceptions.InvalidException;

public enum PrescriptionServiceType {
	AIRMED, SIBRARE;

	public static PrescriptionServiceType getEnum(String string) {

		if (string != null) {
			if (PrescriptionServiceType.SIBRARE.toString().equals(string.toUpperCase())) {
				return PrescriptionServiceType.SIBRARE;
			}
			if (PrescriptionServiceType.AIRMED.toString().equals(string.toUpperCase())) {
				return PrescriptionServiceType.AIRMED;
			}
		}
		throw new InvalidException("prescriptionServiceType inválido");
	}
}