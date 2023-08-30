package br.com.maidahealth.telemedapi.utils;

import org.springframework.http.HttpStatus;

public class TelemedServerResponseUtil {

	public TelemedServerResponseUtil() {}
	
	public TelemedServerResponseUtil(HttpStatus status, String body) {
		super();
		this.status = status;
		this.body = body;
	}

	private HttpStatus status;
	
	private String body;

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}
	
}
