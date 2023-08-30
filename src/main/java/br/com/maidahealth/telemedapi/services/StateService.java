package br.com.maidahealth.telemedapi.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.dto.StateDto;
import br.com.maidahealth.telemedapi.models.State;
import br.com.maidahealth.telemedapi.repositories.StateRepository;

@Service
public class StateService {
	
	@Autowired
	private StateRepository repository;
	
	public List<StateDto> findByName(String name) {
		List<State> states = repository.findByNameContainingIgnoreCase(name);
		
		List<StateDto> dtos = new ArrayList<StateDto>();
		
		for (State c : states) {
			dtos.add(StateDto.convert(c));
		}
		
		return dtos;
	}
	
	public State findById(Long id) {
		Optional<State> optionalState = repository.findById(id);
		
		return optionalState.isPresent() ? optionalState.get() : null;
	}
	
}
