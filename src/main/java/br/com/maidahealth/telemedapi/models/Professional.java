package br.com.maidahealth.telemedapi.models;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import br.com.maidahealth.telemedapi.enums.PrescriptionServiceType;
import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.utils.Utils;

@Entity
@Table(indexes = { @Index(name = "professional_idx_association_number", columnList = "associationNumber"),
		@Index(name = "professional_idx_docway_id", columnList = "docwayId"),
		@Index(name = "professional_idx_cpf", columnList = "cpf"),
		@Index(name = "professional_idx_email", columnList = "email"),
		@Index(name = "professional_idx_name", columnList = "name"),
		@Index(name = "professional_idx_cpf_and_name", columnList = "cpfAndName"),
		@Index(name = "professional_idx_search_query", columnList = "searchQuery"),
		@Index(name = "professional_idx_nickname", columnList = "nickname") })
public class Professional implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3905580836026315135L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Enumerated(EnumType.STRING)
	private Association association;

	private String associationNumber;

	private String erpId;

	private String docwayId;

	private String ufCrm;

	private String cpf;

	@ManyToMany(mappedBy = "professionals")
	private Set<Provider> providers;

	@ManyToMany(fetch = FetchType.LAZY)
	private Set<Specialty> specialties;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "professional")
	private Set<Attendance> attendances;

	private Date lastSeenAt;

	private String phoneNumber;

	private String email;

	private String nickname;

	private String cpfAndName;

	private String searchQuery;

	@Enumerated(EnumType.STRING)
	private PrescriptionServiceType prescriptionServiceType;

	@Enumerated(EnumType.STRING)
	private GenderEnum gender;
	
	@OneToMany(mappedBy = "professional")
	private List<ProfessionalAvailability> professionalAvailability = new ArrayList<>();

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "professionals")
	private Set<Client> clients = new HashSet<>();

	
	public Set<Client> getClients() {
		return clients;
	}

	public void setClients(Set<Client> clients) {
		this.clients = clients;
	}


	public Professional() {
		super();
		providers = new HashSet<Provider>();
		specialties = new HashSet<Specialty>();
		attendances = new HashSet<Attendance>();
	}

	public Professional(String name, Association association, String associationNumber,
			Set<Provider> providers, Set<Specialty> specialties, Set<Attendance> attendances, GenderEnum gender) {
		super();
		this.name = name;
		this.association = association;
		this.associationNumber = associationNumber;
		this.providers = providers;
		this.specialties = specialties;
		this.attendances = attendances;
		this.gender = gender;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getAssociationNumber() {
		return associationNumber;
	}

	public String getErpId() {
		return erpId;
	}

	public String getDocwayId() {
		return docwayId;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setAssociationNumber(String associationNumber) {
		this.associationNumber = associationNumber;
	}

	public void setErpId(String erpId) {
		this.erpId = erpId;
	}

	public void setDocwayId(String docwayId) {
		this.docwayId = docwayId;
	}

	public Set<Provider> getProviders() {
		return providers;
	}

	public void setProviders(Set<Provider> providers) {
		this.providers = providers;
	}

	public Set<Specialty> getSpecialties() {
		return specialties;
	}

	public void setSpecialties(Set<Specialty> specialties) {
		this.specialties = specialties;
	}

	public Set<Attendance> getAttendances() {
		return attendances;
	}

	public void setAttendances(Set<Attendance> attendances) {
		this.attendances = attendances;
	}

	public Association getAssociation() {
		return association;
	}

	public void setAssociation(Association association) {
		this.association = association;
	}

	public String getUfCrm() {
		return ufCrm;
	}

	public void setUfCrm(String ufCrm) {
		this.ufCrm = ufCrm;
	}

	public synchronized String getCpf() {
		return cpf;
	}

	public synchronized void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNickName() {
		return nickname;
	}

	public void setNickName(String nickName) {
		this.nickname = nickName;
	}

	public String getCpfAndName() {
		return cpfAndName;
	}

	public void setCpfAndName(String cpfAndName) {
		this.cpfAndName = cpfAndName;
	}

	@PreUpdate
	@PrePersist
	public void prePersist() {
		concatenateCpfAndName();
		concatenateSearchQuery();
	}

	public void concatenateCpfAndName() {
		this.cpfAndName = Utils.getCleanedCpf(this.cpf) + " - " + this.getName();
	}

	public void concatenateSearchQuery() {
		String query = "";
		query += this.cpf != null ? this.cpf : "";
		query += this.name != null ? this.name : "";
		query += this.associationNumber != null ? this.associationNumber : "";
		this.setSearchQuery(Utils.normalizeToQuery(query));
	}

	public Date getLastSeenAt() {
		return lastSeenAt;
	}

	public void setLastSeenAt(Date lastSeenAt) {
		this.lastSeenAt = lastSeenAt;
	}

	public String getSearchQuery() {
		return searchQuery;
	}

	public void setSearchQuery(String searchQuery) {
		this.searchQuery = searchQuery;
	}

	public PrescriptionServiceType getPrescriptionServiceType() {
		return prescriptionServiceType;
	}

	public void setPrescriptionServiceType(PrescriptionServiceType prescriptionServiceType) {
		this.prescriptionServiceType = prescriptionServiceType;
	}

	public boolean isOnline() {
		AtomicBoolean online = new AtomicBoolean(false);
		Optional.ofNullable(this.lastSeenAt).ifPresent(date -> {
			LocalDateTime ldt = LocalDateTime.ofInstant(date.toInstant(), ZoneOffset.UTC);
			LocalDateTime now = LocalDateTime.now();
			LocalDateTime finalLdt = ldt.plusSeconds(Utils.ONLINE_ACTIVITY_DURATION_IN_SECONDS);

			online.set(now.isBefore(finalLdt) || now.isEqual(finalLdt));
		});

		return online.get();
	}

	public List<ProfessionalAvailability> getProfessionalAvailability() {
		return professionalAvailability;
	}

	public GenderEnum getGender() {
		return gender;
	}

	public void setGender(GenderEnum gender) {
		this.gender = gender;
	}
}
