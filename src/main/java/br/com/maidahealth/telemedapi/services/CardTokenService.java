package br.com.maidahealth.telemedapi.services;

import br.com.maidahealth.telemedapi.models.CardToken;
import br.com.maidahealth.telemedapi.repositories.CardTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CardTokenService {

    @Autowired
    private CardTokenRepository cardTokenRepository;

    public CardToken save(CardToken cardToken) {
        CardToken storedCardToken = findByToken(cardToken.getToken());
        if (storedCardToken == null) {
            return cardTokenRepository.save(cardToken);
        }

        return storedCardToken;
    }

    public CardToken findByToken(String token) {
        return cardTokenRepository.findByToken(token).orElse(null);
    }

    public Optional<CardToken> findByTokenId(Long id) {
        return cardTokenRepository.findById(id);
    }
}
