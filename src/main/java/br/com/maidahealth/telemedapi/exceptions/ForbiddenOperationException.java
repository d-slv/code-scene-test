package br.com.maidahealth.telemedapi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenOperationException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 235391054702026802L;

	public ForbiddenOperationException() {
		super();
	}

	public ForbiddenOperationException(String message) {
		super(message);
	}

	

}
