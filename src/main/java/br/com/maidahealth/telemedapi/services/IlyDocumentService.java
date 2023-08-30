package br.com.maidahealth.telemedapi.services;

import java.time.Duration;
import java.util.Date;
import java.util.concurrent.TimeoutException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;

import br.com.maidahealth.telemedapi.exceptions.WebClientError;
import br.com.maidahealth.telemedapi.models.ApiConfiguration;
import br.com.maidahealth.telemedapi.utils.Utils;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import reactor.util.retry.Retry;

@Service
public class IlyDocumentService {

    private String API_NAME = "ms-gestao-documento";

    private static final Logger log = LoggerFactory.getLogger(IlyDocumentService.class);
    
    private ApiConfiguration config;

    private String generateIlyJwt() {

        config = Utils.getConfig();

        Date now = new Date();
        Date expiration = new Date(now.getTime() + 5 * 1000 * 60);

        return Jwts.builder().setIssuer("Telemed Client Api").setSubject("1")
                .setIssuedAt(now).setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, config.getIlyAuthJwtKey()).compact();
    }

    public String sendFileToIly(MultipartFile file) {

        String ilyToken = generateIlyJwt();

        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("file", file.getResource());

        WebClient webClient = WebClient.create(config.getIlyDocumentUrl());

        ClientResponse response = webClient.post()
                .uri("/files")
                .header("X-ILY-API-appKey", config.getIlyDocumentAppKey())
                .header("X-ILY-API-appToken", "Bearer " + ilyToken)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(builder.build()))
                .exchange()
                .timeout(Duration.ofSeconds(config.getApiIntegrationTimeoutInSeconds()))
                .retryWhen(Retry.max(config.getApiIntegrationRetryMax())
                    .filter(TimeoutException.class::isInstance))
                .onErrorResume(t-> {
                    
                    String message = String.format("Erro ao enviar arquivo para API '%s'. Mensagem: %s", API_NAME, t.getMessage());
                    log.error(message);
                    throw new WebClientError(message, HttpStatus.INTERNAL_SERVER_ERROR, null);
                })
                .block();

        if(response != null){

            JsonNode responseObj = response.bodyToMono(JsonNode.class).block();

            if (response.statusCode().isError()) {
            
                String message = String.format("Erro ao enviar arquivo para API '%s'", API_NAME);
                throw new WebClientError(message, response.statusCode(), responseObj);
            }
            else{

                return responseObj.get("data").get("FileDto").get("publicId").asText();
            }
        }
        else{

            String message = String.format("Erro ao enviar arquivo: Falha desconhecida na integração com API '%s'. URL: %s", API_NAME, config.getIlyDocumentUrl());
            log.error(message);
            throw new WebClientError(message, HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    public String recoverS3Link(String key) {

        String ilyToken = generateIlyJwt();

        WebClient webClient = WebClient.create(config.getIlyDocumentUrl());

        ClientResponse response = webClient.get()
                .uri("/files/?ids=" + key)
                .header("X-ILY-API-appKey", config.getIlyDocumentAppKey())
                .header("X-ILY-API-appToken", "Bearer " + ilyToken)
                .exchange()
                .timeout(Duration.ofSeconds(config.getApiIntegrationTimeoutInSeconds()))
                .retryWhen(Retry.max(config.getApiIntegrationRetryMax())
                    .filter(TimeoutException.class::isInstance))
                .onErrorResume(t-> {
                    
                    String message = String.format("Erro ao recuperar link do arquivo na API '%s'. Mensagem: %s", API_NAME, t.getMessage());
                    log.error(message);
                    throw new WebClientError(message, HttpStatus.INTERNAL_SERVER_ERROR, null);
                })
                .block();

        if(response != null){

            JsonNode responseObj = response.bodyToMono(JsonNode.class).block();

            if (response.statusCode().isError()) {
            
                String message = String.format("Erro ao recuperar link do arquivo na API '%s'", API_NAME);
                throw new WebClientError(message, response.statusCode(), responseObj);
            }
            else{

                return responseObj.get("data").get("Files").get(0).get("url").asText();
            }
        }
        else{

            String message = String.format("Erro ao recuperar link do arquivo arquivo: Falha desconhecida na integração com API '%s'. URL: %s", API_NAME, config.getIlyDocumentUrl());
            log.error(message);
            throw new WebClientError(message, HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
}
