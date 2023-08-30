package br.com.maidahealth.telemedapi.models;

import br.com.maidahealth.telemedapi.enums.AccountCancellationReasonEnum;
import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.utils.Utils;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Entity
@Table(indexes = {
		@Index(name = "insured_idx_cpf",  columnList="cpf"),
		@Index(name = "insured_idx_public_token",  columnList="publicToken"),
		@Index(name = "insured_idx_registration_number",  columnList="registrationNumber"),
		@Index(name = "insured_idx_birth_date",  columnList="birthdate"),
		@Index(name = "insured_idx_docway_id",  columnList="docwayId"),
		@Index(name = "insured_idx_name",  columnList="name"),
		@Index(name = "insured_idx_holder_id",  columnList="holder_id")
	  })
public class Insured implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = true)
	private String cpf;
	
	private String name;
	
	@NotBlank(message = "Cartão não pode ser vazio")
	@Column(unique = true)
	private String healthInsuranceNumber;
	
	private String registrationNumber;
	
	private String docwayId;
	
	private String erpId;
	
	private String lastPhoneNumber;

	private String publicToken;

	@Temporal(TemporalType.DATE)
	private Date birthDate;
	
	@Enumerated(EnumType.STRING)
	private InsuredType type;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "insured")
	private Set<Attendance> attendances;
	
	@ManyToOne
	@JoinColumn(name="holder_id")
	private Insured holder;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "holder")
	private Set<Insured> dependents = new HashSet<Insured>();
	
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "insured")
	private User user;
	
	@Enumerated(EnumType.STRING)
	private GenderEnum gender;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<InsuredSituation> situations;

    @OneToMany(mappedBy = "insured", cascade = {CascadeType.PERSIST})
    private Set<CardToken> cardTokens;

	@Enumerated(EnumType.STRING)
	@Column(columnDefinition = "varchar(255) default 'ACTIVE'")
	private InsuredSituationType currentSituation;
	
	/**
	 * Atributo concatenado para facilitar as buscas que utilizam esses dois campos que são bastantes comuns
	 */
	private String cpfAndName;

	private String searchQuery;
	
	private String healthInsuranceIdentificator;
	
	@Column(columnDefinition = "boolean default true")
	public boolean ableToCreateAttendance = true;

	private String email;

	private String rg;

	private String rgIssuer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_id")
	private Client client;	

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address address;

	private String motherName;

	public String getMotherName() {
		return motherName;
	}
	
	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}

	public Address getAddress() {
		return address;
	}
	
	public void setAddress(Address address) {
		this.address = address;
	}
	
	public Client getClient() {
		return client;
	}
	
	public void setClient(Client client) {
		this.client = client;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getRgIssuer() {
		return rgIssuer;
	}

	public void setRgIssuer(String rgIssuer) {
		this.rgIssuer = rgIssuer;
	}

	public Insured() {
		super();
	}

	public Insured(String cpf, String name, String healthInsuranceNumber, InsuredType type, Insured holder, Date birthDate) {
		super();
		this.cpf = cpf;
		this.name = name;
		this.healthInsuranceNumber = healthInsuranceNumber;
		this.type = type;
		this.holder = holder;
		this.birthDate = birthDate;
	}

	public Insured(String cpf, String name, String healthInsuranceNumber, String registrationNumber, Date birthDate,
			InsuredType type) {
		super();
		this.cpf = cpf;
		this.name = name;
		this.healthInsuranceNumber = healthInsuranceNumber;
		this.registrationNumber = registrationNumber;
		this.birthDate = birthDate;
		this.type = type;
	}
	
	@PreUpdate
	public void preUpdate() {
		this.cpfAndName = "";
		String cleanedCpf = Utils.getCleanedCpf(this.cpf);
		if(!StringUtils.isEmpty(cleanedCpf) && !cleanedCpf.equals("00000000000")) {
			this.cpfAndName += cleanedCpf +" - ";
		}
		this.cpfAndName += this.getName();
	}

	public Long getId() {
		return id;
	}

	public String getCpf() {
		return cpf;
	}

	public String getName() {
		return name;
	}

	public String getHealthInsuranceNumber() {
		return healthInsuranceNumber;
	}

	public String getDocwayId() {
		return docwayId;
	}

	public String getErpIP() {
		return erpId;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setHealthInsuranceNumber(String healthInsuranceNumber) {
		this.healthInsuranceNumber = healthInsuranceNumber;
	}

	public void setDocwayId(String docwayId) {
		this.docwayId = docwayId;
	}

	public void setErpIP(String erpIP) {
		this.erpId = erpIP;
	}

	public InsuredType getType() {
		return type;
	}

	public void setType(InsuredType type) {
		this.type = type;
	}

	public Set<Attendance> getAttendances() {
		return attendances;
	}

	public void setAttendances(Set<Attendance> attendances) {
		this.attendances = attendances;
	}

	public synchronized Insured getHolder() {
		return holder;
	}

	public synchronized void setHolder(Insured holder) {
		this.holder = holder;
	}

	public synchronized String getLastPhoneNumber() {
		return lastPhoneNumber;
	}

	public synchronized void setLastPhoneNumber(String lastPhoneNumber) {
		this.lastPhoneNumber = lastPhoneNumber;
	}

	public String getRegistrationNumber() {
		return registrationNumber;
	}

	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}

	public String getErpId() {
		return erpId;
	}

	public void setErpId(String erpId) {
		this.erpId = erpId;
	}

	public Set<Insured> getDependents() {
		return dependents;
	}

	public void setDependents(Set<Insured> dependents) {
		this.dependents = dependents;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public Insured verifyIfInsuredIsDependent(Long dependentId) {
		for (Insured d : dependents) {
			if(d.getId().equals(dependentId)) return d;
		}
		return null;
	}
	
	public Boolean hasDependentWithUser() {
		for (Insured d : dependents) {
			if(d.getUser() != null) return true;
		}
		return false;
	}

	public synchronized String getPublicToken() {
		return publicToken;
	}

	public synchronized void setPublicToken(String publicToken) {
		this.publicToken = publicToken;
	}

	public GenderEnum getGender() {
		return gender;
	}

	public void setGender(GenderEnum gender) {
		this.gender = gender;
	}

	public Set<InsuredSituation> getSituations() {
		return situations;
	}

	public void setSituations(Set<InsuredSituation> situations) {
		this.situations = situations;
	}

	public InsuredSituationType getCurrentSituation() {
		return currentSituation;
	}

	public void setCurrentSituation(InsuredSituationType currentSituation) {
		this.currentSituation = currentSituation;
	}

	@PrePersist
	void prePersist() {
		Set<InsuredSituation> situations = new HashSet<InsuredSituation>();
		InsuredSituation is = new InsuredSituation(InsuredSituationType.ACTIVE, AccountCancellationReasonEnum.INSURED_REGISTRATION, "");
		situations.add(is);
		this.setSituations(situations);
		this.cpfAndName = "";
		String cleanedCpf = Utils.getCleanedCpf(this.cpf);
		if(!StringUtils.isEmpty(cleanedCpf) && !cleanedCpf.equals("00000000000")) {
			this.cpfAndName += cleanedCpf +" - ";
		}
		this.cpfAndName += this.getName();
		concatenateSearchQuery();
	}

	public void manageCurrentSituation(InsuredSituationType type, AccountCancellationReasonEnum reason) {
		Set<InsuredSituation> situations = Optional.ofNullable(this.getSituations()).orElse(new HashSet<>());
		InsuredSituation is = new InsuredSituation(type, reason, "");
		situations.add(is);
		setCurrentSituation(type);
		this.setSituations(situations);
	}

	public void concatenateSearchQuery() {
		String query = "";

		query += this.cpf != null ? this.cpf : "";
		query += this.name != null ? this.name : "";
		query += this.healthInsuranceNumber != null ? this.healthInsuranceNumber : "";
		query += this.lastPhoneNumber != null ? this.lastPhoneNumber : "";
		query += this.birthDate != null ? Utils.parse(this.birthDate) : "";
		
		this.setSearchQuery(Utils.normalizeToQuery(query));
	}

	public Set<CardToken> getCardTokens() {
		return cardTokens;
	}

	public void setCardTokens(Set<CardToken> cardTokens) {
		this.cardTokens = cardTokens;
	}

	public String getCpfAndName() {
		return cpfAndName;
	}

	public void setCpfAndName(String cpfAndName) {
		this.cpfAndName = cpfAndName;
	}
	
	public String getSearchQuery() {
		return searchQuery;
	}

	public void setSearchQuery(String searchQuery) {
		this.searchQuery = searchQuery;
	}

	public boolean isAbleToCreateAttendance() {
		return ableToCreateAttendance;
	}

	public void setAbleToCreateAttendance(boolean ableToCreateAttendance) {
		this.ableToCreateAttendance = ableToCreateAttendance;
	}

	public String getHealthInsuranceIdentificator() {
		return healthInsuranceIdentificator;
	}

	public void setHealthInsuranceIdentificator(String healthInsuranceIdentificator) {
		this.healthInsuranceIdentificator = healthInsuranceIdentificator;
	}
	
	
	
	
}
