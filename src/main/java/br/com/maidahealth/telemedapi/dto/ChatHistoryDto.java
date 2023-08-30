package br.com.maidahealth.telemedapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatHistoryDto {

    @JsonProperty("chat_id")    
    private Long chatId;

    @JsonProperty("requester_uuid")
    private String requesterUuid;

    @JsonProperty("last_viewed_offset")
    private Long lastViewedOffSet;

    @JsonProperty("unread_messages")
    private Long unreadMessages;

    @JsonProperty("total_messages")
    private Long totalMessages;

    @JsonProperty("messages")
    private CustomChatHistoryPage<ChatMessageDto> messages;

    public ChatHistoryDto() {

    }

    public ChatHistoryDto(Long chatId, String requesterUuid, Long lastViewedOffSet, Long unreadMessages, Long totalMessages,
            CustomChatHistoryPage<ChatMessageDto> messages) {
        this.chatId = chatId;
        this.requesterUuid = requesterUuid;
        this.lastViewedOffSet = lastViewedOffSet;
        this.unreadMessages= unreadMessages;
        this.totalMessages = totalMessages;
        this.messages = messages;
    }

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public String getRequesterUuid() {
        return requesterUuid;
    }

    public void setRequesterUuid(String requesterUuid) {
        this.requesterUuid = requesterUuid;
    }

    public Long getLastViewedOffSet() {
        return lastViewedOffSet;
    }

    public void setLastViewedOffSet(Long lastViewedOffSet) {
        this.lastViewedOffSet = lastViewedOffSet;
    }

    public Long getUnreadMessages() {
        return unreadMessages;
    }

    public void setUnreadMessages(Long unreadMessages) {
        this.unreadMessages = unreadMessages;
    }

    public Long getTotalMessages() {
        return totalMessages;
    }

    public void setTotalMessages(Long totalMessages) {
        this.totalMessages = totalMessages;
    }

    public CustomChatHistoryPage<ChatMessageDto> getMessages() {
        return messages;
    }

    public void setMessages(CustomChatHistoryPage<ChatMessageDto> messages) {
        this.messages = messages;
    }

}
