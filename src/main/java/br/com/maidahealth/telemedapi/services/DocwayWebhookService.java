package br.com.maidahealth.telemedapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.models.DocwayWebhook;
import br.com.maidahealth.telemedapi.repositories.DocwayWebhookRepository;

@Service
public class DocwayWebhookService {

	@Autowired
	private DocwayWebhookRepository repository;
	
	public DocwayWebhook save(DocwayWebhook docwayWebhook) {
		return repository.save(docwayWebhook);
	}
	
}
