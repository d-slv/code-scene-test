package br.com.maidahealth.telemedapi.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "professional_specialties")
public class ProfessionalSpecialties implements Serializable{
    private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "specialties_id") 
    private long specialtiesId;
	
	@Column(name = "professionals_id") 
	private long professionalsId;

    public long getSpecialtiesId() {
		return specialtiesId;
    }
	
	public void setSpecialtiesId(long specialtiesId) {
		this.specialtiesId = specialtiesId;
	}

    public long getProfessionalsId() {
		return professionalsId;
	}
	
	public void setProfessionalsId(long professionalId) {
		this.professionalsId = professionalId;
	}
}
