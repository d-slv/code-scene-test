package br.com.maidahealth.telemedapi.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.maidahealth.telemedapi.enums.ChatType;

@Entity
public class Chat {
    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    @Column(unique=true) 
    private Long msChatId;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	@Enumerated(EnumType.STRING)
    private ChatType type;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="id", nullable=true)
    private Set<Participant> participants = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public ChatType getType() {
        return type;
    }

    public void setType(ChatType type) {
        this.type = type;
    }

    public Set<Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<Participant> participants) {
        this.participants = participants;
    }
    
    public Set<String> getParticipantPublicIds() {
        Set<String> participantIds = new HashSet<>();
        for (Participant participant : this.getParticipants()) {
            participantIds.add(participant.getPublicId());
        }
        return participantIds;
    }

    public Set<String> getParticipantNames() {
        Set<String> participantNames = new HashSet<>();
        for (Participant participant : this.getParticipants()) {
            participantNames.add(participant.getName());
        }
        return participantNames;
    }

}
