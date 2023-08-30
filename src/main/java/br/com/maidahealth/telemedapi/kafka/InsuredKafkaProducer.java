package br.com.maidahealth.telemedapi.kafka;


import org.apache.kafka.clients.producer.RecordMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaTemplate;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.avro.InsuredUpdate;
import br.com.maidahealth.telemedapi.models.Attendance;
import br.com.maidahealth.telemedapi.models.Insured;

@Configuration
public class InsuredKafkaProducer {

    private Logger log = LoggerFactory.getLogger(InsuredKafkaProducer.class);
    private final KafkaTemplate<String, InsuredUpdate> producer;

    @Autowired
    private TelemedClientApiContext context;

    public InsuredKafkaProducer(KafkaTemplate<String, InsuredUpdate> producer) {
        this.producer = producer;
    }

    public void produce(Attendance attendance,Insured insured) {
        final String key = attendance.getDocwayId();
        final InsuredUpdate message = new InsuredUpdate(insured.getPublicToken(), insured.getCpf(), insured.getLastPhoneNumber());
        log.info("Producing record: {}\t{}", key, message);
        producer.send(context.getApiConfiguration().getKafkaInsuredUpdateTopic(), key, message).addCallback(
                result -> {
                    final RecordMetadata m;
                    if (result != null) {
                        m = result.getRecordMetadata();
                        log.info("Produced record to topic {} partition {} @ offset {}",
                                m.topic(),
                                m.partition(),
                                m.offset());
                    }
                },
                exception -> log.error("Failed to produce to kafka", exception));
        producer.flush();
        log.info("Atendimento {} enviado para o topico " + context.getApiConfiguration().getKafkaInsuredUpdateTopic(), key);
    }
}