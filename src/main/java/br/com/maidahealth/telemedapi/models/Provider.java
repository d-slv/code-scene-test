package br.com.maidahealth.telemedapi.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(indexes = {
		@Index(name = "provider_idx_cnpj",  columnList="cnpj"),
		@Index(name = "provider_idx_name",  columnList="name")
	  })
public class Provider implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String cnpj;
	
	private String name;
	
	private boolean makeUrgencyCare;
	
	private boolean makeElectiveCare;
	
	private String erpId;
	
	@ManyToMany(fetch = FetchType.LAZY)
	private Set<Professional> professionals = new HashSet<Professional>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "provider")
	private Set<Attendance> attendances;
	
	@ManyToMany(fetch = FetchType.LAZY)
	private Set<User> secretaries;
	
	public Provider() {
		super();
	}

	public Provider(String cnpj, String name, boolean makeUrgencyCare, boolean makeElectiveCare) {
		super();
		this.cnpj = cnpj;
		this.name = name;
		this.makeUrgencyCare = makeUrgencyCare;
		this.makeElectiveCare = makeElectiveCare;
	}



	public Long getId() {
		return id;
	}

	public String getCnpj() {
		return cnpj;
	}

	public String getName() {
		return name;
	}

	public boolean isMakeUrgencyCare() {
		return makeUrgencyCare;
	}

	public boolean isMakeElectiveCare() {
		return makeElectiveCare;
	}

	public String getErpId() {
		return erpId;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setMakeUrgencyCare(boolean makeUrgencyCare) {
		this.makeUrgencyCare = makeUrgencyCare;
	}

	public void setMakeElectiveCare(boolean makeElectiveCare) {
		this.makeElectiveCare = makeElectiveCare;
	}

	public void setErpId(String erpId) {
		this.erpId = erpId;
	}

	public Set<Professional> getProfessionals() {
		return professionals;
	}

	public void setProfessionals(Set<Professional> professionals) {
		this.professionals = professionals;
	}

	public Set<Attendance> getAttendances() {
		return attendances;
	}

	public void setAttendances(Set<Attendance> attendances) {
		this.attendances = attendances;
	}

	public Set<User> getSecretaries() {
		return secretaries;
	}

	public void setSecretaries(Set<User> secretaries) {
		this.secretaries = secretaries;
	}
	

}
