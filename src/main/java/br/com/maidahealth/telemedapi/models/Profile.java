package br.com.maidahealth.telemedapi.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(indexes = {
		@Index(name = "profile_idx_name",  columnList="name")
	  })
public class Profile implements GrantedAuthority{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;

	public Profile(String name) {
		this.name = name;
	}
	
	public Profile() {}
	
	@Override
	public String getAuthority() {
		return name.toString();
	}

	public String getName() {
		return name.toString();
	}

	public void setName(String name) {
		this.name = name;
	}

}
