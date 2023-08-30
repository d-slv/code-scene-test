package br.com.maidahealth.telemedapi.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.UserRepository;
import br.com.maidahealth.telemedapi.services.TokenService;

public class TokenAuthenticationFilter extends OncePerRequestFilter {

	private TokenService tokenService;

	private UserRepository userRepository;

	public TokenAuthenticationFilter(TokenService service, UserRepository userRepository) {
		super();
		this.tokenService = service;
		this.userRepository = userRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token = getToken(request);
		boolean valid = tokenService.isValid(token, request);
		if (valid) {
			authenticate(token);
		}
		filterChain.doFilter(request, response);
	}

	public void authenticate(String token) {
		Long userId = tokenService.getUserId(token);
		User user = userRepository.findById(userId).get();
		UsernamePasswordAuthenticationToken userAuthentication = new UsernamePasswordAuthenticationToken(user, null,
				user.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(userAuthentication);
	}

	private String getToken(HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		if (StringUtils.isEmpty(header) || !header.startsWith("Bearer")) {
			return null;
		}

		return header.replace("Bearer ", "");
	}

}
