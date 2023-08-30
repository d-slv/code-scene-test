package br.com.maidahealth.telemedapi.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import br.com.maidahealth.telemedapi.repositories.UserRepository;
import br.com.maidahealth.telemedapi.services.AuthenticationService;
import br.com.maidahealth.telemedapi.services.TokenService;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfigurations extends WebSecurityConfigurerAdapter{
	
	@Autowired
	AuthenticationService authenticationService;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UserRepository userRepository;

	@Value("${x.white-list-paths}")
	private String whiteList;

	protected static final String[] AUTH_WHITELIST_ON = {"/api-ws/**","/webjars/**","/app.js","/main.css","/favicon.ico","/websocket-test.html"};

	protected static final String[] AUTH_WHITELIST_OFF = {"/"};
	
	@Override
	@Bean
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(authenticationService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
		.antMatchers(HttpMethod.POST, "/auth").permitAll()
		.antMatchers(HttpMethod.GET, "/auth/{token}").permitAll()
		.antMatchers(HttpMethod.GET, "/user/hello").permitAll()
		.antMatchers(HttpMethod.POST, "/webhook/**").permitAll()
		.antMatchers(HttpMethod.POST, "/auth/token").permitAll()
		.antMatchers(HttpMethod.POST, "/auth/refresh-token").permitAll()
		.antMatchers(HttpMethod.GET, "/").permitAll()
		.antMatchers(HttpMethod.GET, "/health_insurer").permitAll()
		.antMatchers(HttpMethod.GET, "/hello").permitAll()
		.antMatchers(HttpMethod.POST, "/user/recovery_pass", "/user/validate_recovery_code", "/user/new_pass", "/user/activate_account").permitAll()
		.antMatchers(HttpMethod.POST, "/insured/signup").permitAll()
		
		.antMatchers(HttpMethod.POST, "/insured/save").permitAll()
		
		.antMatchers(HttpMethod.POST, "/client/**").permitAll()
		.antMatchers(HttpMethod.PUT, "/client/**").permitAll()
		.antMatchers(HttpMethod.GET, "/client/**").permitAll()
		.antMatchers(HttpMethod.GET, "/user/terms").permitAll()
		.antMatchers(HttpMethod.GET, "/actuator/**").permitAll()
		
        .antMatchers(HttpMethod.GET, "/attendance/*/invite/*").permitAll()
        .antMatchers(HttpMethod.POST, "/attendance/*/invite/*").permitAll()
        .antMatchers(HttpMethod.GET, "/attendance/guests/*").permitAll()
		.antMatchers(HttpMethod.GET, "/attendance/public-id/*").permitAll()
		.antMatchers(HttpMethod.GET, "/attendance/{id}/public-id/*").permitAll()
		.antMatchers(HttpMethod.GET, "/state/**").permitAll()
		.antMatchers(HttpMethod.POST, "/attendance/{id}/cancel").permitAll()

		.antMatchers(HttpMethod.GET, "/city/**").permitAll()
		
		.antMatchers(HttpMethod.POST, "/server-notifications/**").permitAll()
		
		.antMatchers(HttpMethod.GET, "/insured/eligible-on-client/{cpf}").permitAll()

		.antMatchers(HttpMethod.POST, "/booking/**").permitAll()

		.antMatchers(HttpMethod.GET, "/room/**").permitAll()

		.antMatchers("/h2/**").permitAll()

		.antMatchers(whitelist()).permitAll()

		.anyRequest().authenticated()
		.and().csrf().disable()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and().addFilterBefore(new TokenAuthenticationFilter(tokenService, userRepository), UsernamePasswordAuthenticationFilter.class);
		
		
		
	
	http.csrf().disable();
    http.headers().frameOptions().disable();
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
	
	}

	@Bean
	protected GrantedAuthorityDefaults grantedAuthorityDefaults() {
		return new GrantedAuthorityDefaults("");
	}

	private String[] whitelist() {
        if(whiteList.equals("ON")) {
            return AUTH_WHITELIST_ON;
        } else {
            return AUTH_WHITELIST_OFF;
        }
    }

}
