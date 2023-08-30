package br.com.maidahealth.telemedapi.validator;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.util.StringUtils;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.maidahealth.telemedapi.exceptions.ForbiddenOperationException;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.exceptions.InvalidUserException;
import br.com.maidahealth.telemedapi.exceptions.NotAuthorizedException;
import br.com.maidahealth.telemedapi.exceptions.WebClientError;

@RestControllerAdvice
public class RestResponseErrorHandler {
	
	@Autowired
	private MessageSource messageSource;
	
	@ResponseStatus(code = HttpStatus.UNPROCESSABLE_ENTITY)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public List<ErrorFormDto> handle(MethodArgumentNotValidException exception) {
		List<ErrorFormDto> dto = new ArrayList<>();
		
		List<ObjectError> fieldErrors = exception.getBindingResult().getAllErrors();
		fieldErrors.forEach(e -> {
			String fieldName = e.getObjectName();

			try {
				fieldName = ((FieldError) e).getField();
			} catch (Exception e2) {}

			String mensagem = messageSource.getMessage(e, LocaleContextHolder.getLocale());
			ErrorFormDto erro = new ErrorFormDto(fieldName, mensagem);
			dto.add(erro);
		});
		
		return dto;
	}
	
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ErrorFormDto handle(DataIntegrityViolationException exception) {
		String rootMsg = exception.getRootCause().getMessage();
		if(!StringUtils.isEmpty(rootMsg)) {
			Pattern patternKey = Pattern.compile("Key\\s+\\((\\w+)\\)");
			Matcher m = patternKey.matcher(rootMsg);
			if(m.find()) {
				String uniqueAttribute = m.group(1);	
				return new ErrorFormDto(uniqueAttribute, "Já existe um outro registro com o "+ uniqueAttribute +" informado.");
			}			
		}
		
		return new ErrorFormDto("desconhecido", "ocorreu um erro desconhecido. Confira os dados informados e tente novamente.");
	}
	
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(InvalidUserException.class)
	public ErrorFormDto handle(InvalidUserException exception) {
		String message = !StringUtils.isEmpty(exception.getMessage()) ? exception.getMessage() : "Já existe um cadastro com os dados informados"; 
		return new ErrorFormDto("Error", message);
	}

	@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
	@ExceptionHandler(MissingRequestHeaderException.class)
	public ErrorFormDto handle(MissingRequestHeaderException exception) {
		String message = !StringUtils.isEmpty(exception.getMessage()) ? exception.getMessage() : "Já existe um cadastro com os dados informados"; 
		return new ErrorFormDto("Error", message);
	}
	
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(InvalidException.class)
	public ErrorFormDto handle(InvalidException exception) {
		String message = !StringUtils.isEmpty(exception.getMessage()) ? exception.getMessage() : "Já existe um cadastro com os dados informados"; 
		return new ErrorFormDto("Error", message);
	}
	
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	@ExceptionHandler(EntityNotFoundException.class)
	public ErrorFormDto handle(EntityNotFoundException exception) {
		String message = exception.getMessage();
		String error = !StringUtils.isEmpty(message) ? message : "Não foi encontrado registros com os dados informados."; 
		ErrorFormDto errorFormDto = new ErrorFormDto("Error", error);
		return errorFormDto; 
	}
	
	@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
	@ExceptionHandler(NotAuthorizedException.class)
	public ErrorFormDto handle(NotAuthorizedException exception) {
		String message = exception.getMessage();
		String error = !StringUtils.isEmpty(message) ? message : "Acesso negado"; 
		ErrorFormDto errorFormDto = new ErrorFormDto("Error", error);
		return errorFormDto; 
	}
	
	@ResponseStatus(code = HttpStatus.FORBIDDEN)
	@ExceptionHandler(AccessDeniedException.class)
	public ErrorFormDto handle(AccessDeniedException exception) {
		return new ErrorFormDto("Error", "Usuário não tem permissão para acessar o recurso.");
	}
	
	@ResponseStatus(code = HttpStatus.FORBIDDEN)
	@ExceptionHandler(ForbiddenOperationException.class)
	public ErrorFormDto handle(ForbiddenOperationException exception) {
		String message = exception.getMessage();
		ErrorFormDto errorFormDto = new ErrorFormDto("Url", message);
		return errorFormDto; 
	}
	@ExceptionHandler(WebClientError.class)
	public ResponseEntity<?> handle(WebClientError error){
		Map<String,Object> map = new HashMap<>();
		map.put("error", "WebClientError");
		map.put("message", error.getMessage());
		map.put("response_status", error.getStatus());
		map.put("response_body", error.getResponse());

		return ResponseEntity.status(error.getStatus()).body(map);
	}
}
