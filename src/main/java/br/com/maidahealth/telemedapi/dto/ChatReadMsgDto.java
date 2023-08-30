package br.com.maidahealth.telemedapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatReadMsgDto {

    @JsonProperty("chat_id")
    private Long chatId;

    @JsonProperty("reader_uuid")
    private String readerUuid;

    @JsonProperty("offset")
    private Long offSet;

    @JsonProperty("viewed_date")
    private String viewedDate;

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public String getReaderUuid() {
        return readerUuid;
    }

    public void setReaderUuid(String readerUuid) {
        this.readerUuid = readerUuid;
    }

    public Long getOffSet() {
        return offSet;
    }

    public void setOffSet(Long offSet) {
        this.offSet = offSet;
    }

    public String getViewedDate() {
        return viewedDate;
    }

    public void setViewedDate(String viewedDate) {
        this.viewedDate = viewedDate;
    }
}
