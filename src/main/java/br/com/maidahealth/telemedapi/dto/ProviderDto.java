package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;

import br.com.maidahealth.telemedapi.models.Provider;

public class ProviderDto {
	
	private Long id;
	
	private String cnpj;
	
	private String name;
	
	private boolean makeUrgencyCare;
	
	private boolean makeElectiveCare;
	
	public ProviderDto(Provider provider) {
		super();
		this.id = provider.getId();
		this.cnpj = provider.getCnpj();
		this.name = provider.getName();
		this.makeUrgencyCare = provider.isMakeUrgencyCare();
		this.makeElectiveCare = provider.isMakeElectiveCare();
	}
	
	

	public ProviderDto() {
		super();
	}



	public String getCnpj() {
		return cnpj;
	}

	public String getName() {
		return name;
	}

	public boolean isMakeUrgencyCare() {
		return makeUrgencyCare;
	}

	public boolean isMakeElectiveCare() {
		return makeElectiveCare;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setMakeUrgencyCare(boolean makeUrgencyCare) {
		this.makeUrgencyCare = makeUrgencyCare;
	}

	public void setMakeElectiveCare(boolean makeElectiveCare) {
		this.makeElectiveCare = makeElectiveCare;
	}

	public static ProviderDto convert(Provider provider) {
		if(provider == null)
			return null;
		return new ProviderDto(provider);
	}

	public static List<ProviderDto> convert(List<Provider> providers) {
		List<ProviderDto> providersDto = new ArrayList<ProviderDto>();
		providers.stream().forEach(
					p-> providersDto.add(convert(p))
				);
		return providersDto;
	}

	public static Page<ProviderDto> convert(Page<Provider> providers) {
		return providers.map(ProviderDto::new);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
}
