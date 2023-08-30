package br.com.maidahealth.telemedapi.dto;

import java.util.Date;

import br.com.maidahealth.telemedapi.utils.Utils;

public class CurrentDateDto {
	
	private Date currentDate;
	
	private String currentDatePretty;
	
	public CurrentDateDto() {
        this.currentDate = new Date();
        this.currentDatePretty = Utils.parseToPretty(currentDate, "yyyy-MM-dd HH:mm");
	}

	public Date getCurrentDate() {
		return currentDate;
	}

	public String getCurrentDatePretty() {
		return currentDatePretty;
	}
	
}
