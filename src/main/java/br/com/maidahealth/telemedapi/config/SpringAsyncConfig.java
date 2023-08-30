package br.com.maidahealth.telemedapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
public class SpringAsyncConfig implements AsyncConfigurer {
    
//    @Override
//    public Executor getAsyncExecutor() {
//        return new ThreadPoolTaskExecutor();
//    }
    
}