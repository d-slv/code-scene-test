package br.com.maidahealth.telemedapi.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.maidahealth.telemedapi.enums.GenderEnum;

@Entity(name = "usuario")
@Table(indexes = { @Index(name = "usuario_idx_name", columnList = "name"),
		@Index(name = "usuario_idx_insured_id", columnList = "insured_id"),
		@Index(name = "usuario_idx_professional_id", columnList = "professional_id"), })
public class User implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "login não pode ser vazio")
	@Column(unique = true)
	private String login;

	@NotBlank(message = "nome não pode ser vazio")
	private String name;

	private String password;

	@NotBlank(message = "e-mail não pode ser vazio")
	@Column(unique = true)
	private String email;

	private String phoneNumber;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "professional_id")
	private Professional professional;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "insured_id")
	private Insured insured;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "guest_id")
	private Guest guest;

	@ManyToMany(fetch = FetchType.EAGER)
	private List<Profile> profiles = new ArrayList<>();

	private String recoveryPasswordCode;

	@Temporal(TemporalType.TIMESTAMP)
	private Date recoveryPasswordCodeExpirationDate;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
	private Set<Device> devices;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<TelemedNotification> notifications;

	@ManyToMany(mappedBy = "secretaries")
	private Set<Provider> providers = new HashSet<>();

	@Column(columnDefinition = "BOOLEAN DEFAULT false")
	private Boolean termsAccepted;

	@Enumerated(EnumType.STRING)
	private GenderEnum gender;

	@Temporal(TemporalType.DATE)
	private Date birthDate;

	//todo added to relate to the client
	@OneToOne
	@JoinColumn(name = "client_id")
	private Client client;

	public User() {
		super();
	}

	public User(String login, String name, String password, String email, Insured insured, List<Profile> profiles) {
		super();
		this.login = login;
		this.name = name;
		this.password = password;
		this.email = email;
		this.insured = insured;
		this.profiles = profiles;
	}

	public User(String login, String name, String password, String email, Guest guest, List<Profile> profiles) {
		super();
		this.login = login;
		this.name = name;
		this.password = password;
		this.email = email;
		this.guest = guest;
		this.profiles = profiles;
	}

	public Professional getProfessional() {
		return professional;
	}

	public Insured getInsured() {
		return insured;
	}

	public void setProfessional(Professional professional) {
		this.professional = professional;
	}

	public void setInsured(Insured insured) {
		this.insured = insured;
	}

	public Guest getGuest() {
		return guest;
	}

	public void setGuest(Guest guest) {
		this.guest = guest;
	}

	public Long getId() {
		return id;
	}

	public String getLogin() {
		return login;
	}

	public String getName() {
		return name;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public String getEmail() {
		return email;
	}

	public String getPhoneNumber() {
		if (phoneNumber != null)
			return phoneNumber;

		if (isInsured())
			return getInsured().getLastPhoneNumber();

		return null;
	}

	public String getHealthInsuranceNumber() {
		if (isInsured())
			return getInsured().getHealthInsuranceNumber();

		return null;
	}

	public String getInsuredType() {
		if (isInsured())
			return getInsured().getType().getDescription();

		return null;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return profiles;
	}

	@Override
	public String getUsername() {
		return login;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public List<Profile> getProfiles() {
		return profiles;
	}

	public void setProfiles(List<Profile> profiles) {
		this.profiles = profiles;
	}

	public boolean isSecretary() {
		return getProfiles().stream().anyMatch(p -> p.getName().equalsIgnoreCase(UserType.SECRETARY.name()));
	}

	public boolean isProfessional() {
		return getProfiles().stream().anyMatch(p -> p.getName().equalsIgnoreCase(UserType.PROFESSIONAL.name()));
	}

	public boolean isInsured() {
		return getProfiles().stream().anyMatch(p -> p.getName().equalsIgnoreCase(UserType.INSURED.name()));
	}

	public boolean isAdmin() {
		return getProfiles().stream().anyMatch(p -> p.getName().equalsIgnoreCase(UserType.ADMIN.name()));
	}

	public boolean isClientAdmin() {
		return getProfiles().stream().anyMatch(p -> p.getName().equalsIgnoreCase(UserType.CLIENT_ADMIN.name()));
	}

	public boolean isGuest() {
		return getProfiles().stream().anyMatch(p -> p.getName().equalsIgnoreCase(UserType.GUEST.name()));
	}

	public boolean isCallCenter() {
		return getProfiles().stream().anyMatch(p -> p.getName().equalsIgnoreCase(UserType.CALLCENTER.name()));
	}

	public String getCpf() {
		if (isInsured())
			return this.getInsured().getCpf();

		return null;
	}

	public String getRecoveryPasswordCode() {
		return recoveryPasswordCode;
	}

	public void setRecoveryPasswordCode(String recoveryPasswordCode) {
		this.recoveryPasswordCode = recoveryPasswordCode;
	}

	public Date getRecoveryPasswordCodeExpirationDate() {
		return recoveryPasswordCodeExpirationDate;
	}

	public void setRecoveryPasswordCodeExpirationDate(Date recoveryPasswordCodeExpirationDate) {
		this.recoveryPasswordCodeExpirationDate = recoveryPasswordCodeExpirationDate;
	}

	public Set<Device> getDevices() {
		return devices;
	}

	public void setDevices(Set<Device> devices) {
		this.devices = devices;
	}

	public Set<Provider> getProviders() {
		return providers;
	}

	public void setProviders(Set<Provider> providers) {
		this.providers = providers;
	}

	public Boolean getTermsAccepted() {
		return termsAccepted;
	}

	public void setTermsAccepted(Boolean termsAccepted) {
		this.termsAccepted = termsAccepted;
	}

	public Boolean isRecoveryCodeExpired() {
		Date now = new Date();
		return now.after(this.recoveryPasswordCodeExpirationDate);
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public GenderEnum getGender() {
		return gender;
	}

	public void setGender(GenderEnum gender) {
		this.gender = gender;
	}

	public String getPublicIdOfInsuredOrGuest() {
		if (this.isInsured()) {
			return this.insured.getDocwayId();
		} else {
			return this.guest.getPublicId();
		}
	}
}
