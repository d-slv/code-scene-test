package br.com.maidahealth.telemedapi.kafka;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.avro.AddParticipantRequest;
import br.com.maidahealth.telemedapi.avro.MessageReadRequest;
import br.com.maidahealth.telemedapi.avro.NewConversationRequest;
import br.com.maidahealth.telemedapi.avro.NewMessageRequest;
import br.com.maidahealth.telemedapi.utils.Utils;


@Service
public class MsChatKafkaProducer {
    
    private static final Logger log = LoggerFactory.getLogger(MsChatKafkaProducer.class);

    private final KafkaTemplate<String, Object> template;

    public MsChatKafkaProducer(KafkaTemplate<String, Object> template, @Value("${mschat-producer-topic}") final String topic){
        this.template = template;
        this.topic = topic;
    }

    
    private final String topic;

    private String getApikey(){
        return Utils.getConfig().getMsChatApiKey();
    }

    @Async
    public void newChat(List<String>participantUuids, String genericId){

        log.info("Producing {}", "NEW CHAT");

        NewConversationRequest request = new NewConversationRequest(getApikey(), participantUuids, genericId);

        template.send(topic,getApikey(),request);
    }

    @Async
    public void newMessage(Long chatId, String senderUuid, String type, String textOrAttachmentName, String attachmentBase64) {
        log.info("Producing {}", "NEW MESSAGE");

        NewMessageRequest request = new NewMessageRequest(getApikey(), chatId.toString(), senderUuid, type,  textOrAttachmentName,  attachmentBase64);

        template.send(topic,getApikey(),request);
    }

    @Async
    public void readMessage(Long chatId, String participantUUid, Long offset){
        log.info("Producing {}", "READ MESSAGE");

        MessageReadRequest request = new MessageReadRequest(getApikey(), chatId.toString(), participantUUid, offset.intValue());

        template.send(topic,getApikey(),request);
    }

    @Async
    public void addParticipant(Long chatId, List<String> participantUuids){
        log.info("Producing {}", "ADD PARTICIPANT");

        AddParticipantRequest request = new AddParticipantRequest(getApikey(), chatId.toString(), participantUuids);

        template.send(topic,getApikey(),request);
    }
}
