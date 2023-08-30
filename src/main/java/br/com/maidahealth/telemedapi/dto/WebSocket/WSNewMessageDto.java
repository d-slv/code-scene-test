package br.com.maidahealth.telemedapi.dto.WebSocket;

import br.com.maidahealth.telemedapi.dto.ChatMessageDto;
import br.com.maidahealth.telemedapi.enums.WSChatEventType;

public class WSNewMessageDto {

    private WSChatEventType eventType = WSChatEventType.NEW_MESSAGE;
    
    private Long chatId;

    private String senderUuid;

    private String senderName;

    private String messageType;

    private String text;

    private String url;

    private Long offSet;

    private String dateSended;

    public WSNewMessageDto(ChatMessageDto dto, String senderName) {
        this.chatId = dto.getChatId();
        this.senderUuid = dto.getSenderUuid();
        this.senderName = senderName;
        this.messageType = dto.getType();
        this.text = dto.getText();
        this.url = dto.getUrl();
        this.offSet = dto.getOffset();
        this.dateSended = dto.getDateSended();
    }

    public WSChatEventType getEventType() {
        return eventType;
    }

    public void setEventType(WSChatEventType eventType) {
        this.eventType = eventType;
    }

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

    public String getMessageType() {
        return messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
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

    public Long getOffSet() {
        return offSet;
    }

    public void setOffSet(Long offSet) {
        this.offSet = offSet;
    }

    public String getDateSended() {
        return dateSended;
    }

    public void setDateSended(String dateSended) {
        this.dateSended = dateSended;
    }

}
