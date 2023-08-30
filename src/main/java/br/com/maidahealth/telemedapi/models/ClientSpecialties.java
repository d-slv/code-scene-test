package br.com.maidahealth.telemedapi.models;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class ClientSpecialties {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "specialty_id")
	private Specialty specialty;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_id")
	private Client client;

	private Long clientSpecialtyId;

	private String description;

	public ClientSpecialties() {}

	public ClientSpecialties(Specialty specialty, Long clientSpecialtyId, String description) {
		super();
		this.specialty = specialty;
		this.clientSpecialtyId = clientSpecialtyId;
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Specialty getSpecialty() {
		return specialty;
	}

	public void setSpecialty(Specialty specialty) {
		this.specialty = specialty;
	}

	public Long getClientSpecialtyId() {
		return clientSpecialtyId;
	}

	public void setClientSpecialtyId(Long clientSpecialtyId) {
		this.clientSpecialtyId = clientSpecialtyId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}
}
