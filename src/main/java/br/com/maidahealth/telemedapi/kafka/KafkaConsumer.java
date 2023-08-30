package br.com.maidahealth.telemedapi.kafka;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Locale;

import org.apache.avro.generic.GenericRecord;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.enums.EventType;
import br.com.maidahealth.telemedapi.form.WebhookForm;
// import br.com.maidahealth.telemedapi.services.ApiService;
import br.com.maidahealth.telemedapi.services.TelemedServerService;

@EnableKafka
@Configuration
public class KafkaConsumer {
	
	private Logger log = LoggerFactory.getLogger(KafkaConsumer.class);
	
	private final TelemedServerService service;

    public KafkaConsumer(@Qualifier("docwayService") TelemedServerService service) {
        this.service = service;
    }

    @KafkaListener(topics = "#{'${io.confluent.developer.config.topic.name}'}")
    public void consume(final ConsumerRecord<String, GenericRecord> consumerRecord) throws ParseException {
        log.info("Messagem recebida do telehealth: {} {}", consumerRecord.key(), consumerRecord.value());

        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").create();

        WebhookForm form = new WebhookForm();
        form.setAppointment((String) consumerRecord.value().get("appointment"));
        form.setEventType(EventType.valueOf((String) consumerRecord.value().get("eventType")));
        form.setDate(new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.ENGLISH).parse((String) consumerRecord.value().get("date")));

        JsonObject jsonObject = JsonParser.parseString(gson.toJson(form)).getAsJsonObject();

        service.handleWebhook(jsonObject);
    }
}