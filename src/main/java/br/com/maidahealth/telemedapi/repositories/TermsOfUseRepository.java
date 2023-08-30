package br.com.maidahealth.telemedapi.repositories;

import br.com.maidahealth.telemedapi.models.TermsOfUse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TermsOfUseRepository extends JpaRepository<TermsOfUse, Long>{

}
