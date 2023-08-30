package br.com.maidahealth.telemedapi.dto;

import java.util.Set;


public class ChatParticipantDto {

    // Campos definidos em snake case para fins de conversão de formatos entre o MS-Chat e o Telehealth
    private Long chat_id;

    private Set<String> participants;

    private ChatMessageDto last_message;

    private long unread_messages;

    public Long getChat_id() {
        return chat_id;
    }

    public void setChat_id(Long chat_id) {
        this.chat_id = chat_id;
    }

    public Set<String> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<String> participants) {
        this.participants = participants;
    }

    public ChatMessageDto getLast_message() {
        return last_message;
    }

    public void setLast_message(ChatMessageDto last_message) {
        this.last_message = last_message;
    }

    public long getUnread_messages() {
        return unread_messages;
    }

    public void setUnread_messages(long unread_messages) {
        this.unread_messages = unread_messages;
    }

}
