package br.com.maidahealth.telemedapi.controllers;

import java.util.concurrent.TimeoutException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ClientControllerAdvice {

	@ExceptionHandler(value = { TimeoutException.class, java.sql.SQLTransientConnectionException.class,
			org.springframework.transaction.CannotCreateTransactionException.class })
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseEntity<Object> handleTimeoutException(TimeoutException ex) {
		return new ResponseEntity<>(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
