package br.com.maidahealth.telemedapi;

import java.util.TimeZone;
import java.util.concurrent.Executor;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import br.com.maidahealth.telemedapi.seeders.DefaultSeeder;

@SpringBootApplication
@EnableAsync
@EnableSpringDataWebSupport
public class TelemedApiApplication {
	
	@Autowired
	private TelemedClientApiContext context;
	
	@Autowired
	private DefaultSeeder seeder;

	public static void main(String[] args) {
		SpringApplication.run(TelemedApiApplication.class, args);
	}

	@PostConstruct
	public void start() {
		
		context.load();
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		seeder.seedSpecialties();
		seeder.updateSpecialtiesWithExternalIds();
		seeder.seedProfiles();
		seeder.seedUsers();
		seeder.seedStatesAndCities();
		seeder.seedSupportReasons();
	}

	@Bean
	public Executor taskExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

		executor.setCorePoolSize(2);
		executor.setMaxPoolSize(2);
		executor.setQueueCapacity(500);
		executor.setThreadNamePrefix("telemed-client-async-thread");
		executor.initialize();

		return executor;
	}
}
