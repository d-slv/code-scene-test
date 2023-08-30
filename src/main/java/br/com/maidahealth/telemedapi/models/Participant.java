package br.com.maidahealth.telemedapi.models;

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
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.maidahealth.telemedapi.dto.GuestDto;
import br.com.maidahealth.telemedapi.enums.ParticipantType;

@Entity
public class Participant {
    
    @JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "participants")
    private Set<Chat> chats = new HashSet<>();

    @Column(unique = true)
    private String publicId;

    private String name;

	@Enumerated(EnumType.STRING)
    private ParticipantType type;

    public Participant() {
        
    }

    public Participant(String publicId, String name, ParticipantType type) {
        this.publicId = publicId;
        this.name = name;
        this.type = type;
    }

    public Participant(Insured insured) {
        this.publicId = insured.getDocwayId();
        this.name = insured.getName();
        this.type = ParticipantType.PATIENT;
    }

    public Participant(User user) {
        this.publicId = user.getInsured().getDocwayId();
        this.name = user.getInsured().getName();
        this.type = ParticipantType.PATIENT;
    }

    public Participant(Professional professional) {
        this.publicId = professional.getDocwayId();
        this.name = professional.getName();
        this.type = ParticipantType.PROFESSIONAL;
    }

    public Participant(Guest guest) {
        this.publicId = guest.getPublicId();
        this.name = guest.getName();
        this.type = ParticipantType.PATIENT;
    }
    
    public Participant(GuestDto guest) {
        this.publicId = guest.getPublicId();
        this.name = guest.getName();
        this.type = ParticipantType.PROFESSIONAL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Chat> getChats() {
        return chats;
    }

    public void setChats(Set<Chat> chats) {
        this.chats = chats;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ParticipantType getType() {
        return type;
    }

    public void setType(ParticipantType type) {
        this.type = type;
    }

}
