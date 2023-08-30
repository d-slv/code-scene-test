package br.com.maidahealth.telemedapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.dto.CityDto;
import br.com.maidahealth.telemedapi.models.City;
import br.com.maidahealth.telemedapi.models.State;
import br.com.maidahealth.telemedapi.repositories.CityRepository;

@Service
public class CityService {
	
	@Autowired
	private CityRepository repository;

	public List<CityDto> findByName(String name) {
		List<City> cities = repository.findByNameContainingIgnoreCase(name);
		
		List<CityDto> dtos = new ArrayList<CityDto>();
		
		for (City c : cities) {
			dtos.add(CityDto.convert(c));
		}
		
		return dtos;
	}
	
	public List<CityDto> findByNameAndState(String name, State state) {
		List<City> cities = repository.findByNameContainingIgnoreCaseAndState(name, state);
		
		List<CityDto> dtos = new ArrayList<CityDto>();
		
		for (City c : cities) {
			dtos.add(CityDto.convert(c));
		}
		
		return dtos;
	}

}
