package br.com.maidahealth.telemedapi.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import br.com.maidahealth.telemedapi.form.LoginForm;
import br.com.maidahealth.telemedapi.form.LogoutForm;
import br.com.maidahealth.telemedapi.services.AuthenticationService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	@Autowired
	private AuthenticationService service;
	
	@PostMapping
	public ResponseEntity<Object> authenticate(@RequestBody @Valid LoginForm form, BindingResult result) throws MethodArgumentNotValidException, NoSuchMethodException, SecurityException {
		if(result.hasErrors()) {
			throw new MethodArgumentNotValidException(
					new MethodParameter(this.getClass().getDeclaredMethod("authenticate", LoginForm.class, BindingResult.class), 0), 
					result
					);
		}

		return service.authenticate(form);
	}
	
	@GetMapping("/{token}")
	public ResponseEntity<Object> authenticateByToken(@PathVariable String token) {
		return service.authenticateByToken(token);
	}
	
	@PostMapping("logout")
	public void logout(@RequestBody @Valid LogoutForm form) {
		service.logout(form);
	}

	@PostMapping("token")
	public ResponseEntity<Object> authenticateByClientToken(@RequestHeader("accessKey") String accessKey) {
		JsonNode accessToken = service.authenticateByClientToken(accessKey);
		return ResponseEntity.ok(accessToken);
	}

	@PostMapping("/refresh-token")
	public ResponseEntity<Object> refreshToken(@RequestHeader(value = "Authorization") String authorization) throws SecurityException {
		return service.refreshAccessToken(authorization);
	}
}
