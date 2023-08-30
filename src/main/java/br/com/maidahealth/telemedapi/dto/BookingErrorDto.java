package br.com.maidahealth.telemedapi.dto;

public class BookingErrorDto {   
    private String mensagem;
    private String orientacao; 

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getOrientacao() {
        return orientacao;
    }

    public void setOrientacao(String orientacao) {
        this.orientacao = orientacao;
    }   

    public BookingErrorDto(String mensagem, String orientacao){
        this.mensagem = mensagem;
        this.orientacao = orientacao;
    }

    public BookingErrorDto(){};
}
