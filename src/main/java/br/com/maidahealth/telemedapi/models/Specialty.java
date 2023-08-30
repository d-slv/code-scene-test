package br.com.maidahealth.telemedapi.models;

import javax.persistence.*;

import br.com.maidahealth.telemedapi.utils.Utils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(indexes = {
		@Index(name = "specialty_idx_name",  columnList="name"),
		@Index(name = "specialty_idx_code",  columnList="code"),
		@Index(name = "specialty_idx_external_id",  columnList="externalId"),
		@Index(name = "specialty_idx_available_for_urgency",  columnList="availableForUrgency")
	  })
public class Specialty implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1042782999346165433L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String code;
	
	private String docwayId;
	
	private String externalId;
	
	private Boolean availableForUrgency;
	
	private Boolean availableForElective;

	private Integer electiveAverageTime;

	@ManyToMany(mappedBy = "specialties")
	private Set<Professional> professionals;

	@OneToMany(mappedBy = "specialty")
	private Set<SpecialtyHistoryPrice> historyPrice;

	private Double currentUrgencyValue;

	private Double currentElectiveValue;
	
	private String searchQuery;
	
	public String getSearchQuery() {
		return searchQuery;
	}

	public void setSearchQuery(String searchQuery) {
		this.searchQuery = searchQuery;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "specialty")
	private List<ProfessionalAvailability> professionalAvailability = new ArrayList<>();

	public Specialty() {
		super();
		availableForUrgency = false;
		availableForElective = false;
		professionals = new HashSet<Professional>();
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getCode() {
		return code;
	}

	public Set<Professional> getProfessionals() {
		return professionals;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setProfessionals(Set<Professional> professionals) {
		this.professionals = professionals;
	}

	public String getDocwayId() {
		return docwayId;
	}

	public void setDocwayId(String docwayId) {
		this.docwayId = docwayId;
	}

	public String getExternalId() {
		return externalId;
	}

	public void setExternalId(String externalId) {
		this.externalId = externalId;
	}

	public Boolean isAvailableForUrgency() {
		return availableForUrgency;
	}

	public void setAvailableForUrgency(Boolean availableForUrgency) {
		this.availableForUrgency = availableForUrgency;
	}

	public Integer getElectiveAverageTime() {
		return electiveAverageTime;
	}

	public void setElectiveAverageTime(Integer electiveAverageTime) {
		this.electiveAverageTime = electiveAverageTime;
	}

	public Boolean isAvailableForElective() {
		return availableForElective;
	}

	public Double getCurrentUrgencyValue() {
		return currentUrgencyValue;
	}

	public void setCurrentUrgencyValue(Double currentUrgencyValue) {
		this.currentUrgencyValue = currentUrgencyValue;
	}

	public Boolean getAvailableForElective() {
		return availableForElective;
	}

	public Double getCurrentElectiveValue() {
		return currentElectiveValue;
	}

	public void setCurrentElectiveValue(Double currentElectiveValue) {
		this.currentElectiveValue = currentElectiveValue;
	}

	public Boolean getAvailableForUrgency() {
		return availableForUrgency;
	}

	public void setAvailableForElective(Boolean availableForElective) {
		this.availableForElective = availableForElective;
	}

	public List<ProfessionalAvailability> getProfessionalAvailability() {
		return professionalAvailability;
	}

	public void concatenateSearchQuery() {
		String query = "";

		query += this.name != null ? this.name : "";
		query += this.code != null ? this.code : "";
		
		this.setSearchQuery(Utils.normalizeToQuery(query));
	}
	
}
