package br.com.maidahealth.telemedapi.kafka;

import javax.transaction.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.avro.generic.GenericRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.maidahealth.telemedapi.dto.ChatMessageDto;
import br.com.maidahealth.telemedapi.dto.ChatReadMsgDto;
import br.com.maidahealth.telemedapi.form.MsChatCreationForm;
import br.com.maidahealth.telemedapi.services.ChatService;


@Service
public class MsChatConsumerLogic {
    private static final Logger log = LoggerFactory.getLogger(MsChatConsumerLogic.class);

    @Autowired
    private ChatService chatService;

    private ObjectMapper mapper = new ObjectMapper();

    @Transactional
    public void consumeNewChat(GenericRecord genericRecord) {
        try {
            log.info("Processing NewConversationResponse");
            MsChatCreationForm response = mapper.readValue(String.valueOf(genericRecord.toString()),
                    MsChatCreationForm.class);

            chatService.consumeNewChat(response);

            log.info("Sucess Processing NewConversationResponse");

        } catch (Exception e) {
            log.warn("EXCEPTION CONSUMING NEW CHAT :{}", e.getClass());
            e.printStackTrace();
        }
    }

    @Transactional
    public void consumeNewMessage(GenericRecord genericRecord) {
        try {
            log.info("Processing NewMessageResponse");

            ChatMessageDto response = mapper.readValue(String.valueOf(genericRecord.toString()),
                    ChatMessageDto.class);
            
            chatService.consumeNewMessage(response);

        } catch (Exception e) {
            log.warn("EXCEPTION CONSUMING NEW MESSAGE :{}", e.getClass());
            e.printStackTrace();
        }
    }

    @Transactional
    public void consumeMessageRead(GenericRecord genericRecord) {
        try {
            log.info("Processing MessageReadResponse");
            ChatReadMsgDto response = mapper.readValue(String.valueOf(genericRecord.toString()),
            ChatReadMsgDto.class);

            chatService.consumeReadMessage(response);
        } catch (Exception e) {
            log.warn("EXCEPTION CONSUMING MESSAGE READ :{}", e.getClass());
            e.printStackTrace();
        }
    }

    @Transactional
    public void consumeAddParticipant(GenericRecord genericRecord) {
        try {
            log.info("Processing AddParticipantResponse");
        } catch (Exception e) {
            log.warn("EXCEPTION CONSUMING ADD PARTICIPANT :{}", e.getClass());
            e.printStackTrace();
        }
    }
}
