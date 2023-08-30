package br.com.maidahealth.telemedapi.repositories;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.models.Insured;

public interface InsuredRepositoryCustom {

	public Page<Insured> findInsureds(String filter, String cpf, GenderEnum gender, Date startDate, Date finishDate, Pageable pagination);

	public int migrateCpfAndName();
}
