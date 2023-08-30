package br.com.maidahealth.telemedapi.scheduler;

import java.util.Calendar;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.quartz.JobDetail;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.quartz.QuartzDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.quartz.*;

import br.com.maidahealth.telemedapi.config.AutoWiringSpringBeanJobFactory;

@Configuration
@EnableAutoConfiguration
@ConditionalOnExpression("'${using.spring.schedulerFactory}'=='true'")
public class SpringQrtzScheduler {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private ApplicationContext applicationContext;

    @PostConstruct
    public void init() {
        logger.info("Initializing scheduler...");
    }

    @Bean
    public SpringBeanJobFactory springBeanJobFactory() {
        AutoWiringSpringBeanJobFactory jobFactory = new AutoWiringSpringBeanJobFactory();
        logger.debug("Configuring Job factory");

        jobFactory.setApplicationContext(applicationContext);
        return jobFactory;
    }

    @Bean
    @Primary
    public SchedulerFactoryBean scheduler(Trigger trigger, JobDetail job, DataSource quartzDataSource) {

        SchedulerFactoryBean schedulerFactory = new SchedulerFactoryBean();
        schedulerFactory.setConfigLocation(new ClassPathResource("quartz.properties"));

        logger.info("Setting the Scheduler up: SchedulerFactoryBean");
        schedulerFactory.setJobFactory(springBeanJobFactory());
        schedulerFactory.setJobDetails(job);
        schedulerFactory.setTriggers(trigger);

        schedulerFactory.setDataSource(quartzDataSource);

        return schedulerFactory;
    }
    
    @Bean("SchedulerFactoryBean2")
    public SchedulerFactoryBean scheduler2(@Qualifier("SimpleTriggerFactoryBean2") Trigger trigger, @Qualifier("JobDetailFactoryBean2") JobDetail job, DataSource quartzDataSource) {

        SchedulerFactoryBean schedulerFactory = new SchedulerFactoryBean();
        schedulerFactory.setConfigLocation(new ClassPathResource("quartz.properties"));

        logger.info("Setting the Scheduler up: SchedulerFactoryBean2");
        schedulerFactory.setJobFactory(springBeanJobFactory());
        schedulerFactory.setJobDetails(job);
        schedulerFactory.setTriggers(trigger);

        schedulerFactory.setDataSource(quartzDataSource);

        return schedulerFactory;
    }

    @Bean("SchedulerFactoryBean3")
    public SchedulerFactoryBean scheduler3(@Qualifier("SimpleTriggerFactoryBean3") Trigger trigger, @Qualifier("JobDetailFactoryBean3") JobDetail job, DataSource quartzDataSource) {

        SchedulerFactoryBean schedulerFactory = new SchedulerFactoryBean();
        schedulerFactory.setConfigLocation(new ClassPathResource("quartz.properties"));

        logger.info("Setting the Scheduler up: SchedulerFactoryBean3");
        schedulerFactory.setJobFactory(springBeanJobFactory());
        schedulerFactory.setJobDetails(job);
        schedulerFactory.setTriggers(trigger);

        schedulerFactory.setDataSource(quartzDataSource);

        return schedulerFactory;
    }

    @Bean("SchedulerFactoryBean4")
    public SchedulerFactoryBean scheduler4(@Qualifier("SimpleTriggerFactoryBean4") Trigger trigger, @Qualifier("JobDetailFactoryBean4") JobDetail job, DataSource quartzDataSource) {

        SchedulerFactoryBean schedulerFactory = new SchedulerFactoryBean();
        schedulerFactory.setConfigLocation(new ClassPathResource("quartz.properties"));

        logger.debug("Setting the Scheduler up");
        schedulerFactory.setJobFactory(springBeanJobFactory());
        schedulerFactory.setJobDetails(job);
        schedulerFactory.setTriggers(trigger);

        schedulerFactory.setDataSource(quartzDataSource);

        return schedulerFactory;
    }
    
    @Bean("SchedulerFactoryBean5")
    public SchedulerFactoryBean scheduler5(@Qualifier("SimpleTriggerFactoryBean5") Trigger trigger, @Qualifier("JobDetailFactoryBean5") JobDetail job, DataSource quartzDataSource) {

        SchedulerFactoryBean schedulerFactory = new SchedulerFactoryBean();
        schedulerFactory.setConfigLocation(new ClassPathResource("quartz.properties"));

        logger.debug("Setting the Scheduler up");
        schedulerFactory.setJobFactory(springBeanJobFactory());
        schedulerFactory.setJobDetails(job);
        schedulerFactory.setTriggers(trigger);

        schedulerFactory.setDataSource(quartzDataSource);

        return schedulerFactory;
    }

    @Bean("DeleteOldAccessTokenScheduler")
    public SchedulerFactoryBean deleteOldAccessTokenScheduler(@Qualifier("DeleteOldAccessTokenTrigger") Trigger trigger,
                                                              @Qualifier("DeleteOldAccessTokenJob") JobDetail job,
                                                              DataSource quartzDataSource) {

        SchedulerFactoryBean schedulerFactory = new SchedulerFactoryBean();
        schedulerFactory.setConfigLocation(new ClassPathResource("quartz.properties"));

        logger.debug("Setting the Scheduler up");
        schedulerFactory.setJobFactory(springBeanJobFactory());
        schedulerFactory.setJobDetails(job);
        schedulerFactory.setTriggers(trigger);

        schedulerFactory.setDataSource(quartzDataSource);

        return schedulerFactory;
    }

    @Bean
    @Primary
    public JobDetailFactoryBean jobDetail() {

        JobDetailFactoryBean jobDetailFactory = new JobDetailFactoryBean();
        jobDetailFactory.setJobClass(AttendancesOfTomorrow.class);
        jobDetailFactory.setName("Qrtz_Job_Detail");
        jobDetailFactory.setDescription("Invoke Sample Job service...");
        jobDetailFactory.setDurability(true);
        return jobDetailFactory;
    }
    
    @Bean("JobDetailFactoryBean2")
    public JobDetailFactoryBean jobDetail2() {

        JobDetailFactoryBean jobDetailFactory = new JobDetailFactoryBean();
        jobDetailFactory.setJobClass(AttendancesAlmostCancelled.class);
        jobDetailFactory.setName("Qrtz_Job_Detail");
        jobDetailFactory.setDescription("Invoke Sample Job service...");
        jobDetailFactory.setDurability(true);
        return jobDetailFactory;
    }

    @Bean("JobDetailFactoryBean3")
    public JobDetailFactoryBean jobDetail3() {

        JobDetailFactoryBean jobDetailFactory = new JobDetailFactoryBean();
        jobDetailFactory.setJobClass(SyncDirtyAttendances.class);
        jobDetailFactory.setName("Qrtz_Job_Detail");
        jobDetailFactory.setDescription("Invoke Sample Job service...");
        jobDetailFactory.setDurability(true);
        return jobDetailFactory;
    }

    @Bean("JobDetailFactoryBean4")
    public JobDetailFactoryBean jobDetail4() {

        JobDetailFactoryBean jobDetailFactory = new JobDetailFactoryBean();
        jobDetailFactory.setJobClass(GenerateDefaultSchedules.class);
        jobDetailFactory.setName("Qrtz_Job_Detail");
        jobDetailFactory.setDescription("Invoke Sample Job service...");
        jobDetailFactory.setDurability(true);
        return jobDetailFactory;
    }

    @Bean("JobDetailFactoryBean5")
    public JobDetailFactoryBean jobDetail5() {

        JobDetailFactoryBean jobDetailFactory = new JobDetailFactoryBean();
        jobDetailFactory.setJobClass(GenerateScheduleFromProfessionalAvailability.class);
        jobDetailFactory.setName("Qrtz_Job_Detail");
        jobDetailFactory.setDescription("Invoke Sample Job service...");
        jobDetailFactory.setDurability(true);
        return jobDetailFactory;
    }

    
    @Bean("DeleteOldAccessTokenJob")
    public JobDetailFactoryBean deleteOldAccessTokenJob() {

        JobDetailFactoryBean jobDetailFactory = new JobDetailFactoryBean();
        jobDetailFactory.setJobClass(DeleteOldAccessTokenTask.class);
        jobDetailFactory.setName("DeleteOldAccessTokenJob");
        jobDetailFactory.setDescription("Invoke Sample Job service...");
        jobDetailFactory.setDurability(true);
        return jobDetailFactory;
    }

    @Bean
    @Primary
    public SimpleTriggerFactoryBean trigger(JobDetail job) {
    	SimpleTriggerFactoryBean trigger = new SimpleTriggerFactoryBean();
        trigger.setJobDetail(job);
        
        int frequencyInSec = 86400;
        logger.info("Configuring trigger to fire every {} seconds", frequencyInSec);

        
        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, 20);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);

        trigger.setStartTime(c.getTime());
        trigger.setRepeatInterval(frequencyInSec * 1000);
        
        trigger.setRepeatCount(SimpleTrigger.REPEAT_INDEFINITELY);
        return trigger;
    }
    
    @Bean("SimpleTriggerFactoryBean2")
    public SimpleTriggerFactoryBean trigger2(@Qualifier("JobDetailFactoryBean2") JobDetail job) {
    	SimpleTriggerFactoryBean trigger = new SimpleTriggerFactoryBean();
        trigger.setJobDetail(job);
        
        int frequencyInSec = 60;
        logger.info("Configuring trigger to fire every {} seconds", frequencyInSec);

        trigger.setRepeatInterval(frequencyInSec * 1000);
        trigger.setRepeatCount(SimpleTrigger.REPEAT_INDEFINITELY);
        return trigger;
    }

    @Bean("SimpleTriggerFactoryBean3")
    public SimpleTriggerFactoryBean trigger3(@Qualifier("JobDetailFactoryBean3") JobDetail job) {
    	SimpleTriggerFactoryBean trigger = new SimpleTriggerFactoryBean();
        trigger.setJobDetail(job);
        
        int frequencyInSec = 3600;
        logger.info("Configuring trigger to fire every {} seconds", frequencyInSec);

        trigger.setRepeatInterval(frequencyInSec * 1000);
        trigger.setRepeatCount(SimpleTrigger.REPEAT_INDEFINITELY);
        return trigger;
    }

    @Bean("SimpleTriggerFactoryBean4")
    public SimpleTriggerFactoryBean trigger4(@Qualifier("JobDetailFactoryBean4") JobDetail job) {
    	SimpleTriggerFactoryBean trigger = new SimpleTriggerFactoryBean();
        trigger.setJobDetail(job);
        
        int frequencyInSec = 86400;
        logger.info("Configuring trigger to fire every {} seconds", frequencyInSec);

        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, 6);
        c.set(Calendar.MINUTE, 5);
        c.set(Calendar.SECOND, 0);

        trigger.setStartTime(c.getTime());
        trigger.setRepeatInterval(frequencyInSec * 1000);
        
        trigger.setRepeatCount(SimpleTrigger.REPEAT_INDEFINITELY);

        return trigger;
    }
    
    @Bean("SimpleTriggerFactoryBean5")
    public SimpleTriggerFactoryBean trigger5(@Qualifier("JobDetailFactoryBean5") JobDetail job) {
    	SimpleTriggerFactoryBean trigger = new SimpleTriggerFactoryBean();
        trigger.setJobDetail(job);
        
        int frequencyInSec = 86400;
        logger.info("Configuring trigger to fire every {} seconds", frequencyInSec);

        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, 6);
        c.set(Calendar.MINUTE, 5);
        c.set(Calendar.SECOND, 0);

        trigger.setStartTime(c.getTime());
        trigger.setRepeatInterval(frequencyInSec * 1000);
        
        trigger.setRepeatCount(SimpleTrigger.REPEAT_INDEFINITELY);

        return trigger;
    }

    @Bean("DeleteOldAccessTokenTrigger")
    public CronTriggerFactoryBean deleteOldAccessTokenTrigger(@Qualifier("DeleteOldAccessTokenJob") JobDetail job) {

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        CronTriggerFactoryBean factory = new CronTriggerFactoryBean();
        factory.setJobDetail(job);
        factory.setCronExpression("0 0 3 * * ?");
        factory.setStartTime(calendar.getTime());
        factory.setStartDelay(0L);
        factory.setName("DeleteOldAccessTokenTrigger");

        return factory;
    }

    @Bean
    @QuartzDataSource
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource quartzDataSource() {
        return DataSourceBuilder.create().build();
    }

}

