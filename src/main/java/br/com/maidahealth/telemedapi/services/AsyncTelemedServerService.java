package br.com.maidahealth.telemedapi.services;

import java.util.concurrent.CompletableFuture;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import reactor.core.publisher.Mono;

@Service
public class AsyncTelemedServerService {
    
    private static final Logger LOG = LoggerFactory.getLogger(TelemedServerService.class);
    
	@Autowired
	private TelemedClientApiContext context;
	
    @Async
	public CompletableFuture<JsonNode> getAttendancePrescriptionSicknoteExam(String uri) {

		String accessToken = context.getApiConfiguration().getClientAccessKey();
		WebClient webClient = WebClient.create(context.getApiConfiguration().getServerApiUrl());

        JsonNode jsonNode = webClient.get()
            .uri(uri)
            .headers(httpHeaders -> {
                httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
                httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
                httpHeaders.add("accessKey", accessToken);
            })
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError, response -> response.bodyToMono(JsonNode.class)
                    .flatMap(body -> {
                        LOG.error("Error :: {}", body.toPrettyString());
                        return Mono.error(new EntityNotFoundException(body.path("erro").toString()));
                    })
            )
            .onStatus(HttpStatus::is5xxServerError, response -> {
                return Mono.error(new RuntimeException("5xx"));
            })
            .bodyToMono(JsonNode.class)
            .block();

		return CompletableFuture.completedFuture(jsonNode);
	}
}