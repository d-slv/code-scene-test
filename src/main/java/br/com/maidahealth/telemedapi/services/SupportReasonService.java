package br.com.maidahealth.telemedapi.services;

import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.form.ReasonForm;
import br.com.maidahealth.telemedapi.models.SupportReason;
import br.com.maidahealth.telemedapi.repositories.SupportReasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupportReasonService {

    @Autowired
    private SupportReasonRepository repository;

    public SupportReason createReason(ReasonForm form) {
        if(form.getSupportReason().length() > 5){
            SupportReason supportReason = new SupportReason();
            supportReason.setDescription(form.getSupportReason());
            return repository.save(supportReason);
        }else {
            throw new InvalidException("O motivo deve ter mais que 5 caracteres");
        }
    }

    public List<SupportReason> getSupportReasons() {

        List<SupportReason> supportReasons = repository.findAll();
        if (supportReasons.size() > 0){
            return supportReasons;
        }else {
            throw new InvalidException("Nenhum motivo encontrado.");
        }
    }

}
