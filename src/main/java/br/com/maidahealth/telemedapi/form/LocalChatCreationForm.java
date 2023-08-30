package br.com.maidahealth.telemedapi.form;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import br.com.maidahealth.telemedapi.models.Chat;
import br.com.maidahealth.telemedapi.models.Participant;

public class LocalChatCreationForm {
    
    private Long msChatId;

    private Date createdAt;

    private List<LocalChatParticipantForm> participants;

    public LocalChatCreationForm() {
        
    }

    public LocalChatCreationForm(Chat chat) {
        this.msChatId = chat.getMsChatId();
        this.createdAt = chat.getCreatedAt();
        this.participants = chat.getParticipants().stream().map(LocalChatParticipantForm::new).collect(Collectors.toList());
    }

    public Long getMsChatId() {
        return msChatId;
    }

    public void setMsChatId(Long msChatId) {
        this.msChatId = msChatId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<LocalChatParticipantForm> getParticipants() {
        return participants;
    }

    public void setParticipants(List<LocalChatParticipantForm> participants) {
        this.participants = participants;
    }

    public Set<Participant> getParticipantsList() {
        return participants.stream().map(LocalChatParticipantForm::convertToParticipant).collect(Collectors.toSet());
    }
}
