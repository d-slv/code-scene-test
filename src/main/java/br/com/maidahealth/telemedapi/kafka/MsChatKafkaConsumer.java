package br.com.maidahealth.telemedapi.kafka;

import org.apache.avro.generic.GenericRecord;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@EnableAsync
@Service
public class MsChatKafkaConsumer {
    private static final Logger log = LoggerFactory.getLogger(MsChatKafkaConsumer.class);

    @Autowired
    private MsChatConsumerLogic logic;

    @KafkaListener(topics = "${mschat-consumer-topic}", autoStartup = "false")
    public void listener(ConsumerRecord<String, GenericRecord> consumerRecord) {

        GenericRecord genericRecord = consumerRecord.value();
        String schema = genericRecord.getSchema() != null ? genericRecord.getSchema().getName() : "";
        log.info("Consuming schema: {}", schema);
        switch (schema) {
            case "NewConversationResponse":
                logic.consumeNewChat(genericRecord);
                break;
            case "NewMessageResponse":
                logic.consumeNewMessage(genericRecord);
                break;
            case "MessageReadResponse":
                logic.consumeMessageRead(genericRecord);
                break;
            case "AddParticipantResponse":
                logic.consumeAddParticipant(genericRecord);
                break;
            default:
                break;
        }
    }

}
