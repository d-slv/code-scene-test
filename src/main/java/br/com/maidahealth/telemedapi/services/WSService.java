package br.com.maidahealth.telemedapi.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.enums.ParticipantType;
import br.com.maidahealth.telemedapi.models.Participant;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.utils.ParticipantUtils;

@Service
public class WSService {

private final SimpMessagingTemplate messagingTemplate;
	
	@Autowired
	public WSService(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	public void sendTo(String destination, Object content) {
		
		messagingTemplate.convertAndSend(destination, content);
	}
	
	public void sendToParticipants(Set<Participant> participants, String destination, Object content) {
		
		for(Participant p : participants) {
			sendToParticipant(p, destination, content);
		}
	} 
	
	public void sendToParticipant(Participant participant, String destination, Object content) {

			if(participant.getType() == ParticipantType.PATIENT) {
				User user = ParticipantUtils.getUserOfParticipant(participant);
				sendToUser(user.getLogin(), destination, content);
			}
	}

	public void sendToUser(String user, String destination, Object content) {

		messagingTemplate.convertAndSendToUser(user, destination, content);

	}
}
