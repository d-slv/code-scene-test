package br.com.maidahealth.telemedapi.dto;

import java.util.Set;
import java.util.stream.Collectors;

import br.com.maidahealth.telemedapi.models.Guest;
import br.com.maidahealth.telemedapi.models.Professional;

public class GuestDto {
	
	private String publicId;

    private String cpf;

    private String name;

    private String association;

    private String associationNumber;

    private String associationUf;

    private String email;

    public GuestDto() {
    }

    public GuestDto(Guest guest) {
    	this.publicId = guest.getPublicId();
        this.cpf = guest.getCpf();
        this.name = guest.getName();
        this.association = guest.getAssociation()!= null ? guest.getAssociation().toString() : "";
        this.associationNumber = guest.getAssociationNumber();
        this.associationUf = guest.getAssociationUf();
        this.email = guest.getEmail();
    }

    public GuestDto(Professional professional) {
    	this.publicId = professional.getDocwayId();
        this.cpf = professional.getCpf();
        this.name = professional.getName();
        this.association = professional.getAssociation().toString();
        this.associationNumber = professional.getAssociationNumber();
        this.email = professional.getEmail();
    }

    public String getPublicId() {
		return publicId;
	}

	public void setPublicId(String publicId) {
		this.publicId = publicId;
	}

	public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAssociation() {
        return association;
    }

    public void setAssociation(String association) {
        this.association = association;
    }

    public String getAssociationNumber() {
        return associationNumber;
    }

    public void setAssociationNumber(String associationNumber) {
        this.associationNumber = associationNumber;
    }

    public String getAssociationUf() {
        return associationUf;
    }

    public void setAssociationUf(String associationUf) {
        this.associationUf = associationUf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

	public static Set<GuestDto> convert(Set<Guest> guestSet){
		return guestSet.stream().map(GuestDto::new).collect(Collectors.toSet());
	}

}
