package br.com.maidahealth.telemedapi.exceptions;

import org.springframework.http.HttpStatus;

public class WebClientError extends RuntimeException{

    private HttpStatus status;

    private Object response;
    
    public WebClientError(){
        super();
    }

    public WebClientError(String message, HttpStatus status, Object response){
        super(message);
        this.status = status;
        this.response = response;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public Object getResponse() {
        return response;
    }

    public void setResponse(Object response) {
        this.response = response;
    }

    
}
