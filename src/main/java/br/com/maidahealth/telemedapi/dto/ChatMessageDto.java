package br.com.maidahealth.telemedapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatMessageDto {

    @JsonProperty("chat_id")
    private Long chatId;

    @JsonProperty("sender_uuid")
    private String senderUuid;

    private String senderName;

    @JsonProperty("type")
    private String type;

    @JsonProperty("text_or_attachment_name")
    private String text;

    @JsonProperty("attachment_url")
    private String url;

    @JsonProperty("offset")
    private Long offset;

    @JsonProperty("date_sended")
    private String dateSended;

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public String getSenderUuid() {
        return senderUuid;
    }

    public void setSenderUuid(String senderUuid) {
        this.senderUuid = senderUuid;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getOffset() {
        return offset;
    }

    public void setOffset(Long offset) {
        this.offset = offset;
    }

    public String getDateSended() {
        return dateSended;
    }

    public void setDateSended(String dateSended) {
        this.dateSended = dateSended;
    }

}
