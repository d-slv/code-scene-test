package br.com.maidahealth.telemedapi.models;

import br.com.maidahealth.telemedapi.enums.PaymentType;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(indexes = {
		@Index(name = "client_idx_public_id",  columnList="public_id"),
		@Index(name = "client_idx_name",  columnList="name"),
		@Index(name = "client_idx_access_token",  columnList="accessToken")
	  })
public class Client extends BaseEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String name;
	
	private String accessToken;
	
	@ManyToMany(fetch = FetchType.LAZY)
	private Set<Professional> professionals = new HashSet<>();
	
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "client", cascade = CascadeType.ALL)
	private User user;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "client")
	private Set<Insured> insureds;
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address address;

	private String phoneNumber;	

	@Enumerated(EnumType.STRING)
	private PaymentType paymentType;
	
	private String cnpj;
	
	private String sibrareApiKey;

	private String airmedApiKey;

	private String airmedOriginId;

	private String kafkaTopicName;

	@OneToMany(mappedBy = "client")
	private Set<SpecialtyAppointmentValue> specialtyAppointmentValues;

	public Client() {
		super();
	}
	
	public Client(Long id, String publicId){
		this.setId(id);
		this.setPublicId(publicId);
	}

	public Client(String publicId) {
		super();
		this.setPublicId(publicId);
	}

	public Client(String name, String accessToken, Set<Professional> professionals, User user) {
		super();
		this.name = name;
		this.accessToken = accessToken;
		this.professionals = professionals;
		this.user = user;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public Set<Professional> getProfessionals() {
		return professionals;
	}

	public void setProfessionals(Set<Professional> professionals) {
		this.professionals = professionals;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Insured> getPatients() {
		return insureds;
	}

	public void setPatients(Set<Insured> insureds) {
		this.insureds = insureds;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
	@Override
	public String getPublicId() {
		return super.getPublicId();
	}
	
	@Override
	public int hashCode() {
		return super.hashCode();
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Set<SpecialtyAppointmentValue> getSpecialtyAppointmentValues() {
		return specialtyAppointmentValues;
	}

	public void setSpecialtyAppointmentValues(Set<SpecialtyAppointmentValue> specialtyAppointmentValues) {
		this.specialtyAppointmentValues = specialtyAppointmentValues;
	}

	public PaymentType getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(PaymentType paymentType) {
		this.paymentType = paymentType;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}
	
	public String getSibrareApiKey() {
		return sibrareApiKey;
	}

	public void setSibrareApiKey(String sibrareApiKey) {
		this.sibrareApiKey = sibrareApiKey;
	}

	public String getAirmedApiKey() {
		return airmedApiKey;
	}

	public void setAirmedApiKey(String airmedApiKey) {
		this.airmedApiKey = airmedApiKey;
	}

	public String getKafkaTopicName() {
		return kafkaTopicName;
	}

	public void setKafkaTopicName(String kafkaTopicName) {
		this.kafkaTopicName = kafkaTopicName;
	}

	public String getAirmedOriginId() {
		return airmedOriginId;
	}

	public void setAirmedOriginId(String airmedOriginId) {
		this.airmedOriginId = airmedOriginId;
	}
}
