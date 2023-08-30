package br.com.maidahealth.telemedapi.repositories;


import br.com.maidahealth.telemedapi.models.SpecialtyHistoryPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialtyHistoryPriceRepository extends JpaRepository<SpecialtyHistoryPrice, Long> {


}
