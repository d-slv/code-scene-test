package br.com.maidahealth.telemedapi.services;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.dto.TokenDto;
import br.com.maidahealth.telemedapi.exceptions.NotAuthorizedException;
import br.com.maidahealth.telemedapi.models.Token;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {


	@Autowired
	private TelemedClientApiContext context;

	@Autowired
	private TokenRepository tokenRepository;

	public String generateToken(Authentication authenticate) {
		User user = (User) authenticate.getPrincipal();
		return generateToken(user);
	}

	public String generateToken(User user) {
		Date now = new Date();
		Integer expirationTime = context.getApiConfiguration().getJwtExpirationInMinutes();
		Date expiration = new Date(now.getTime() + expirationTime * 1000 * 60);
		return Jwts.builder().setIssuer("API de telemedicina maida").setSubject(user.getId().toString())
				.setIssuedAt(now).setExpiration(expiration)
				.signWith(SignatureAlgorithm.HS256, context.getApiConfiguration().getJwtSecret()).compact();
	}

	public boolean isValid(String token, HttpServletRequest request) {
		try {
			Jwts.parser().setSigningKey(context.getApiConfiguration().getJwtSecret()).parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public Long getUserId(String token) {
		Claims claims = Jwts.parser().setSigningKey(context.getApiConfiguration().getJwtSecret()).parseClaimsJws(token)
				.getBody();
		return Long.valueOf(claims.getSubject());

	}

	private boolean isPublicResource(HttpServletRequest request) {
		List<String> publicUrls = Arrays.asList("auth", "webhook", "health_insurer", "user/recovery_pass",
				"user/validate_recovery_code", "user/new_pass", "insured/save", "client/", "city", "state");
		String url = request.getRequestURL().toString();
		Pattern pattern = Pattern.compile("(http[s]?:\\/\\/)?([^\\/\\s]+\\/)(.*)");
		Matcher m = pattern.matcher(url);
		if (m.find() && m.groupCount() >= 3) {
			String resource = m.group(3);
			if (checkStartingWith(publicUrls, resource)) {
				return true;
			}
		}
		return false;
	}

	private boolean checkStartingWith(List<String> urls, String target) {
		for (String url : urls) {
			if (target.startsWith(url) || target.startsWith("telemed/" + url)) {
				return true;
			}
		}
		return false;
	}

	public ResponseEntity<Object> refreshAccessToken(String oldAccessToken) throws UnsupportedEncodingException {
		if (StringUtils.isEmpty(oldAccessToken)) {
			return new ResponseEntity<>(new MessageDto("É necessário informar uma chave de acesso anterior."),
					HttpStatus.UNAUTHORIZED);
		}
		Token oldToken = tokenRepository.findByValue(oldAccessToken)
				.orElseThrow(() -> new NotAuthorizedException("Chave de acesso inválida"));
		User user = oldToken.getUser();

		String newToken = generateToken(user);
		saveToken(user, newToken);

		return ResponseEntity.ok(new TokenDto(newToken, "Bearer", user));
	}

	public void saveToken(User user, String token) {
		Token tokenModel = new Token(user, token);
		tokenRepository.save(tokenModel);
	}
}
