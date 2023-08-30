package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.City;
import br.com.maidahealth.telemedapi.models.State;

public class CityDto {
	
	private Long id;

	private String name;
	
	private Integer ibgeCode;
	
	private String cityUf;
	
	private StateDto state;

	public CityDto(Long id, String name, Integer ibgeCode, String cityUf, State state) {
		this.id = id;
		this.name = name;
		this.ibgeCode = ibgeCode;
		this.cityUf = cityUf;
		this.state = StateDto.convert(state);
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

	public Integer getIbgeCode() {
		return ibgeCode;
	}

	public void setIbgeCode(Integer ibgeCode) {
		this.ibgeCode = ibgeCode;
	}

	public String getCityUf() {
		return cityUf;
	}

	public void setCityUf(String cityUf) {
		this.cityUf = cityUf;
	}

	public StateDto getState() {
		return state;
	}

	public void setState(StateDto state) {
		this.state = state;
	}

	public static CityDto convert(City c) {
		String cityUf = c.getName() + ", " + c.getState().getUf();
		return new CityDto(c.getId(), c.getName(), c.getIbgeCode(), cityUf, c.getState());
	}

}
