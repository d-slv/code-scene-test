package br.com.maidahealth.telemedapi.utils;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import br.com.maidahealth.telemedapi.dto.GuestDto;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.Guest;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.Participant;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.repositories.GuestRepository;
import br.com.maidahealth.telemedapi.repositories.InsuredRepository;
import br.com.maidahealth.telemedapi.repositories.ParticipantRepository;
import br.com.maidahealth.telemedapi.services.TelemedServerService;

@Component
public class ParticipantUtils {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private TelemedServerService telemedServerService;

    @Autowired
    private InsuredRepository insuredRepository;

    @Autowired
    private GuestRepository guestRepository;

    private static ParticipantRepository repository;
    private static TelemedServerService telemedService;
    private static InsuredRepository iRepository;
    private static GuestRepository gRepository;
    


    @PostConstruct
    public void init() {
        ParticipantUtils.repository = participantRepository;
        ParticipantUtils.telemedService = telemedServerService;
        ParticipantUtils.iRepository = insuredRepository;
        ParticipantUtils.gRepository = guestRepository;
    }

    public static Participant getProfessionalParticipant(Attendance attendance) {
        String professionalId = attendance.getProfessional().getDocwayId();
        return doesParticipantExist(professionalId) ? repository.findByPublicId(professionalId).get() : new Participant(attendance.getProfessional());
    }

    public static Participant getInsuredParticipant(Insured insured) {
        String insuredId = insured.getDocwayId();
        return doesParticipantExist(insuredId) ? repository.findByPublicId(insuredId).get() : new Participant(insured);
    }

    public static Set<Participant> getClientGuestParticipants(Attendance attendance) {
        Set<Participant> guestParticipants = new HashSet<>();
        for (Guest g : attendance.getGuests()) {
            Participant guestParticipant = doesParticipantExist(g.getPublicId()) ? repository.findByPublicId(g.getPublicId()).get() : new Participant(g);
            guestParticipants.add(guestParticipant);
        }

        return guestParticipants;
    }

    public static Set<Participant> getServerGuestParticipants(Attendance attendance) {
    	Set<GuestDto> guestsDtos = telemedService.getAppointmentGuests(attendance.getDocwayId()).getGuests();
        Set<Participant> guestParticipants = new HashSet<>();
        for (GuestDto dto : guestsDtos) {
            Participant guestParticipant = doesParticipantExist(dto.getPublicId()) ? repository.findByPublicId(dto.getPublicId()).get() 
                                                                                   : new Participant(dto);
            guestParticipants.add(guestParticipant);
        }

        return guestParticipants;
    }

    public static Participant getParticipant(Participant participant) {
        return doesParticipantExist(participant.getPublicId()) ? repository.findByPublicId(participant.getPublicId()).get() : participant;
    }


    public static Boolean doesParticipantExist(String publicId) {
        return repository.findByPublicId(publicId).isPresent();
    }

    public static User getUserOfParticipant(Participant participant) {

        Optional<Insured> insuredOptional = iRepository.findByDocwayId(participant.getPublicId());
        Optional<Guest> guestOptional = gRepository.findByPublicId(participant.getPublicId());

        if(insuredOptional.isPresent()) {
            return insuredOptional.get().getUser();
        } else if(guestOptional.isPresent()){
            return guestOptional.get().getUser();
        } else {
            throw new InvalidException("Usuário não encontrado ou de tipo inválido");
        }
    }
}
