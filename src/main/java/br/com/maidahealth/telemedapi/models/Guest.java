package br.com.maidahealth.telemedapi.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(indexes = {
        @Index(name = "guest_idx_cpf", columnList = "cpf"),
        @Index(name = "guest_idx_email", columnList = "email")
})
public class Guest extends BaseEntity{

	private static final long serialVersionUID = 1L;

	private String cpf;

    private String name;

    @Enumerated(EnumType.STRING)
    private Association association;

    private String associationNumber;

    private String associationUf;

    private String email;

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "guest")
	private User user;

    public Guest() {
    super();
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

    public Association getAssociation() {
        return association;
    }

    public void setAssociation(Association association) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}

