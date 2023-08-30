package br.com.maidahealth.telemedapi.form;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MsChatCreationForm {

    @JsonProperty("chat_id")
    private Long chatId;

    @JsonProperty("participant_uuids")
    private List<String> participants;

    @JsonProperty("generic_id")
    private String genericId;

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public String getGenericId() {
        return genericId;
    }

    public void setGenericId(String genericId) {
        this.genericId = genericId;
    }

    public List<String> getParticipants() {
        return participants;
    }

    public void setParticipants(List<String> participants) {
        this.participants = participants;
    }

}
