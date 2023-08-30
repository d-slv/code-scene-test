package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.utils.Utils;

public class ProfessionalDto {

	private Long id;
	
	private String docwayId;

	private String name;

	private String association;

	private String associationNumber;

	private String ufCrm;

	private String cpf;

	private List<SpecialtyDto> specialties = new ArrayList<>();

	private boolean online;

	private String phoneNumber;

	private String email;

	private String nickname;

	private String prescriptionServiceType;

	private String gender;

	public ProfessionalDto() {
		super();
	}

	public ProfessionalDto(Professional professional) {
		super();
		this.id = professional.getId();
		this.name = Utils.convertStringLikePersonName(professional.getName());
		this.association = professional.getAssociation().name();
		this.associationNumber = professional.getAssociationNumber();
		this.ufCrm = professional.getUfCrm();
		this.cpf = professional.getCpf();
		Set<Specialty> specialtiesModel = professional.getSpecialties();
		this.specialties = specialtiesModel.stream().map(SpecialtyDto::new).collect(Collectors.toList());
		this.phoneNumber = professional.getPhoneNumber();
		this.email = professional.getEmail();
		this.nickname = professional.getNickName();
		this.online = professional.isOnline();
		if (professional.getPrescriptionServiceType() != null)
			this.prescriptionServiceType = professional.getPrescriptionServiceType().toString();

		if (professional.getGender() != null) 
			this.gender = professional.getGender().toString();
		
		this.docwayId = professional.getDocwayId() != null ? professional.getDocwayId() : null;

	}

	public String getName() {
		return name;
	}

	public String getAssociation() {
		return association;
	}

	public String getAssociationNumber() {
		return associationNumber;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setAssociation(String association) {
		this.association = association;
	}

	public void setAssociationNumber(String associationNumber) {
		this.associationNumber = associationNumber;
	}

	public static List<ProfessionalDto> convert(List<Professional> professionals) {
		List<ProfessionalDto> professionalsDtos = new ArrayList<ProfessionalDto>();
		professionals.stream().forEach(p -> professionalsDtos.add(convert(p)));
		return professionalsDtos;
	}

	public static Page<ProfessionalDto> convert(Page<Professional> professionals) {
		return professionals.map(ProfessionalDto::new);
	}

	public static ProfessionalDto convert(Professional professional) {
		if (professional == null)
			return null;
		return new ProfessionalDto(professional);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public List<SpecialtyDto> getSpecialties() {
		return specialties;
	}

	public void setSpecialties(List<SpecialtyDto> specialties) {
		this.specialties = specialties;
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

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public boolean isOnline() {
		return this.online;
	}

	public String getPrescriptionServiceType() {
		return prescriptionServiceType;
	}

	public void setPrescriptionServiceType(String prescriptionServiceType) {
		this.prescriptionServiceType = prescriptionServiceType;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDocwayId() {
		return docwayId;
	}

	public void setDocwayId(String docwayId) {
		this.docwayId = docwayId;
	}
	
}
