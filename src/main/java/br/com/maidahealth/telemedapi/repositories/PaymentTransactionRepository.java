package br.com.maidahealth.telemedapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.maidahealth.telemedapi.models.PaymentTransaction;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction,Long>{
}
