package br.com.maidahealth.telemedapi.services;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.dto.SensediaDto;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import reactor.core.publisher.Mono;

@Service
public class SensediaService {

    private static final Logger LOG = LoggerFactory.getLogger(SensediaService.class);

	private static String REDIRECT_URI = "https://localhost";
	
	@Autowired
	private TelemedClientApiContext context;

    public SensediaDto checkCpf(String cpf){
    	try {
        	String accessToken = getAccessToken();
        	LOG.info(accessToken);

            MultiValueMap<String, String> basicHeaders = new HttpHeaders();
            basicHeaders.add("Content-Type", MediaType.APPLICATION_JSON_VALUE);
            basicHeaders.add("client_id", context.getSensediaConfiguration().getSensediaClientId());
            basicHeaders.add("access_token", accessToken);

            WebClient webClient = WebClient.builder()
                    .baseUrl(context.getSensediaConfiguration().getSensediaUrl())
                    .defaultHeaders(httpHeaders -> httpHeaders.addAll(basicHeaders))
                    .build();

            JsonObject root = JsonParser.parseString("{}").getAsJsonObject();
            root.addProperty("cpf", cpf);
            root.addProperty("codEmprPlano", context.getSensediaConfiguration().getSensediaEmPlano());

            JsonNode response = webClient.post()
                    .uri(context.getSensediaConfiguration().getSensediaEnv())
                    .body(BodyInserters.fromValue(root.toString()))
                    .retrieve()
                    .onStatus(HttpStatus::is4xxClientError, resp -> resp.bodyToMono(JsonNode.class)
                            .flatMap(bodyError -> {
                                LOG.error("Error :: {}", bodyError.toString());
                                return Mono.error(new InvalidException("Verifique os dados de acesso à Sensedia"));
                            }))
                    .onStatus(HttpStatus::is5xxServerError, resp -> Mono.error(new RuntimeException("5xx")))
                    .bodyToMono(JsonNode.class)
                    .block();
            
            LOG.info(response.toPrettyString());

            String status = response.path("ds_situacao").asText();
            if("ATIVO".equals(status)) 
        		return new SensediaDto(response);		
		} catch (Exception e) {
			LOG.error("Error :: {}", e.toString());
		}
        return null;
    }

    private String getAccessToken() {
    	String authorizationCode = getGrantCode();
    	LOG.info(authorizationCode);

        MultiValueMap<String, String> basicHeaders = new HttpHeaders();
        basicHeaders.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE);
        basicHeaders.add("Authorization", "Basic " + context.getSensediaConfiguration().getSensediaClientToken());

        WebClient webClient = WebClient.builder()
                .baseUrl(context.getSensediaConfiguration().getSensediaUrl())
                .defaultHeaders(httpHeaders -> httpHeaders.addAll(basicHeaders))
                .build();

        JsonNode response = webClient.post()
                .uri("/sandbox/oauth/access-token")
                .body(BodyInserters.fromFormData("grant_type", "authorization_code")
		                .with("code", authorizationCode))
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, resp -> resp.bodyToMono(JsonNode.class)
                        .flatMap(bodyError -> {
                            LOG.error("Error :: {}", bodyError.toString());
                            return Mono.error(new InvalidException("Verifique os dados de acesso para a Sensedia"));
                        }))
                .onStatus(HttpStatus::is5xxServerError, resp -> Mono.error(new RuntimeException("5xx")))
                .bodyToMono(JsonNode.class)
                .block();
        
        LOG.info(response.toPrettyString());
        String accessToken = response.path("access_token").asText();
        return accessToken;
    }

    private String getGrantCode() {
        MultiValueMap<String, String> basicHeaders = new HttpHeaders();
        basicHeaders.add("Content-Type", MediaType.APPLICATION_JSON_VALUE);

        WebClient webClient = WebClient.builder()
                .baseUrl(context.getSensediaConfiguration().getSensediaUrl())
                .defaultHeaders(httpHeaders -> httpHeaders.addAll(basicHeaders))
                .build();

        JsonObject root = JsonParser.parseString("{}").getAsJsonObject();
        root.addProperty("client_id", context.getSensediaConfiguration().getSensediaClientId());
        root.addProperty("redirect_uri", REDIRECT_URI);

        JsonNode response = webClient.post()
                .uri("/sandbox/oauth/grant-code")
                .body(BodyInserters.fromValue(root.toString()))
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, resp -> resp.bodyToMono(JsonNode.class)
                        .flatMap(bodyError -> {
                            LOG.error("Error :: {}", bodyError.toString());
                            return Mono.error(new InvalidException("Verifique os dados de acesso à Sensedia"));
                        }))
                .onStatus(HttpStatus::is5xxServerError, resp -> Mono.error(new RuntimeException("5xx")))
                .bodyToMono(JsonNode.class)
                .block();
        
        LOG.info(response.toPrettyString());
        String code = StringUtils.remove(response.path("redirect_uri").asText(), REDIRECT_URI + "/?code=");
        return code;
    }

}
