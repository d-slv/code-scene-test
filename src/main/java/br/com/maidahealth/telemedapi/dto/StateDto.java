package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.State;

public class StateDto {
	
	private Long id;
	
	private String name;
	
	private String uf;

	public StateDto(Long id, String name, String uf) {
		super();
		this.id = id;
		this.name = name;
		this.uf = uf;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}
	
	public static StateDto convert(State state) {
		if(state == null) return null;
		
		return new StateDto(state.getId(), state.getName(), state.getUf());
	}

}
