package br.com.maidahealth.telemedapi.form;

import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.br.CPF;

import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.enums.PrescriptionServiceType;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.models.Association;
import br.com.maidahealth.telemedapi.models.Professional;
import br.com.maidahealth.telemedapi.utils.Utils;

public class ProfessionalForm {

	@NotBlank(message = "Campo 'name' não pode ser vazio")
	private String name;

	@NotBlank(message = "Campo 'association' não pode ser vazio")
	private String association;

	@NotBlank(message = "Campo 'associationNumber' não pode ser vazio")
	private String associationNumber;

	@NotBlank(message = "Campo 'cpf' não pode ser vazio")
	@CPF(message = "numero de CPF inválido")
	private String cpf;

	@NotBlank(message = "Campo 'phoneNumber' não pode ser vazio")
	private String phoneNumber;

	@NotBlank(message = "Campo 'email' não pode ser vazio")
	@Email(message = "endereço de EMAIL inválido")
	private String email;

	@NotBlank(message = "Campo 'nickname' não pode ser vazio")
	private String nickname;

	@NotBlank(message = "Campo 'associatonZone' não pode ser vazio")
	private String associatonZone;

    private String gender;

	@NotEmpty(message = "Campo 'specialties' não pode ser vazio")
	private List<String> specialties;

	private String prescriptionServiceType;

	public ProfessionalForm() {
		super();
	}

	public ProfessionalForm(String name, String association, String associationNumber) {
		super();
		this.name = name;
		this.association = association;
		this.associationNumber = associationNumber;
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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getPhoneNumber() {
		return phoneNumber.replaceAll("[\\s()-]", "");
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

	public String getAssociatonZone() {
		return associatonZone;
	}

	public void setAssociatonZone(String associatonZone) {
		this.associatonZone = associatonZone;
	}

	public List<String> getSpecialties() {
		return specialties;
	}

	public void setSpecialties(List<String> specialties) {
		this.specialties = specialties;
	}

	public String getPrescriptionServiceType() {
		return prescriptionServiceType;
	}

	public void setPrescriptionServiceType(String prescriptionServiceType) {
		this.prescriptionServiceType = prescriptionServiceType;
	}

	public Association getAssociationEnum() {
		Association[] values = Association.values();
		for (Association association : values) {
			if (this.association.toUpperCase().equals(association.name())) {
				return association;
			}
		}
		throw new InvalidException("Associção não encontrada");
	}

	public Professional toProfessional() {
		Professional professional = new Professional();
		professional.setName(name);
		professional.setAssociation(Association.valueOf(association));
		professional.setAssociationNumber(associationNumber);
		professional.setUfCrm(associatonZone);
		professional.setCpf(cpf);
		professional.setPhoneNumber(getPhoneNumber());
		professional.setEmail(email);
		professional.setNickName(nickname);
		if (prescriptionServiceType == null || prescriptionServiceType.isEmpty()) {
			professional.setPrescriptionServiceType(PrescriptionServiceType.AIRMED);
		} else {
			professional.setPrescriptionServiceType(PrescriptionServiceType.getEnum(prescriptionServiceType));
		}
        professional.setGender(GenderEnum.getGenderByName(gender));
		return professional;
	}

	public void merge(Professional professional) {
		if (!Utils.isEmpty(name)) {
			professional.setName(name);
		}
		if (!Utils.isEmpty(association)) {
			professional.setAssociation(getAssociationEnum());
		}
		if (!Utils.isEmpty(associationNumber)) {
			professional.setAssociationNumber(associationNumber);
		}
		if (!Utils.isEmpty(associatonZone)) {
			professional.setUfCrm(associatonZone);
		}
		if (!Utils.isEmpty(cpf)) {
			professional.setCpf(cpf);
		}
		if (!Utils.isEmpty(phoneNumber)) {
			professional.setPhoneNumber(getPhoneNumber());
		}
		if (!Utils.isEmpty(email)) {
			professional.setEmail(email);
		}
		if (!Utils.isEmpty(nickname)) {
			professional.setNickName(nickname);
		}
		if (!Utils.isEmpty(prescriptionServiceType)) {
			professional.setPrescriptionServiceType(PrescriptionServiceType.getEnum(prescriptionServiceType));
		}
        if (!Utils.isEmpty(gender)) {
            professional.setGender(GenderEnum.getGenderByName(gender));
        }
	}

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
