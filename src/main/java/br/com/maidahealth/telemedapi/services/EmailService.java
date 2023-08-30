package br.com.maidahealth.telemedapi.services;

import br.com.maidahealth.telemedapi.TelemedClientApiContext;
import br.com.maidahealth.telemedapi.models.*;
import br.com.maidahealth.telemedapi.utils.EmailRecipe;
import br.com.maidahealth.telemedapi.utils.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Optional;

import static java.nio.charset.StandardCharsets.UTF_8;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TelemedClientApiContext context;

    @Autowired
    private TemplateEngine htmlTemplateEngine;

    private static final String ACTIVATION_ACC_HTML_TEMPLATE_NAME = "html/activation_account";
    private static final String RECOVERY_ACC_HTML_TEMPLATE_NAME = "html/recovery_pass_code";
    private static final String ATTENDANCE_SCHEDULE_HTML_TEMPLATE_NAME = "html/attendance_schedule";
    private static final String ATTENDANCE_CANCEL_HTML_TEMPLATE_NAME = "html/attendance_cancel";
    private static final String ATTENDANCE_FINISH_HTML_TEMPLATE_NAME = "html/attendance_finish";
    private static final String PAYMENT_REVERSAL_HTML_TEMPLATE_NAME = "html/payment_reversal";

    @Async
    public void sendRecoveryPasswordCode(User user, String recoveryPasswordCode) throws MessagingException {
        final Context ctx = new Context();
        ctx.setVariable("userName", user.getName());
        ctx.setVariable("activationCode", recoveryPasswordCode);

        EmailRecipe emailRecipe = new EmailRecipe(user.getEmail(), recoveryPasswordCode + " é o seu código de recuperação");
        MimeMessage message = createDefaultHtmlMessage(RECOVERY_ACC_HTML_TEMPLATE_NAME, ctx, emailRecipe);

        mailSender.send(message);
    }

    @Async
    public void sendAttendanceSchedulingMessage(Attendance attendance) {
        try {
            final Context ctx = new Context();

            String specialtyName = attendance.getSpecialty().getName();
            String professionalName = attendance.getProfessional().getName();
            String insuredName = attendance.getInsured().getName();
            Date schedulingDate = attendance.getSchedulingDate();
            String schedulingDateString = Utils.dateWithHourAndWeekday(schedulingDate, context.getApiConfiguration().getTimezone());

            ctx.setVariable("insuredName", insuredName);
            ctx.setVariable("specialtyName", specialtyName);
            ctx.setVariable("professionalName", professionalName);
            ctx.setVariable("schedulingDateString", schedulingDateString);

            EmailRecipe emailRecipe = new EmailRecipe(attendance.getInsured().getUser().getEmail(),
                    "Consulta agendada no Maida.Telehealth");
            MimeMessage message = createDefaultHtmlMessage(ATTENDANCE_SCHEDULE_HTML_TEMPLATE_NAME, ctx, emailRecipe);

            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Async
    public void sendActivationAccountCode(User user, String activationCode) throws MessagingException {
        final Context ctx = new Context();
        ctx.setVariable("userName", user.getName());
        ctx.setVariable("activationCode", activationCode);

        EmailRecipe emailRecipe = new EmailRecipe(user.getEmail(), activationCode + " é o seu código de ativação de conta");
        MimeMessage message = createDefaultHtmlMessage(ACTIVATION_ACC_HTML_TEMPLATE_NAME, ctx, emailRecipe);

        mailSender.send(message);
    }

    @Async
    public void sendCancelAttendanceMessage(Attendance attendance)  {
        try {
            final Context ctx = new Context();
            Optional<Attendance> optionalAttendance = Optional.of(attendance);
            optionalAttendance.map(Attendance::getInsured).map(Insured::getName).ifPresent(i -> ctx.setVariable("insuredName", i));
            optionalAttendance.map(Attendance::getSpecialty).map(Specialty::getName).ifPresent(s ->  ctx.setVariable("specialtyName", s));
            optionalAttendance.map(Attendance::getProfessional).map(Professional::getName).ifPresent(p -> ctx.setVariable("professionalName", p));

            EmailRecipe emailRecipe = new EmailRecipe(attendance.getInsured().getUser().getEmail(),  "Atendimento cancelado.");
            MimeMessage message = createDefaultHtmlMessage(ATTENDANCE_CANCEL_HTML_TEMPLATE_NAME, ctx, emailRecipe);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Async
    public void sendFinishAttendanceMessage(Attendance attendance)  {
//        try {
//            final Context ctx = new Context();
//            Optional<Attendance> optionalAttendance = Optional.of(attendance);
//            optionalAttendance.map(Attendance::getInsured).map(Insured::getName).ifPresent(i -> ctx.setVariable("insuredName", i));
//            optionalAttendance.map(Attendance::getSpecialty).map(Specialty::getName).ifPresent(s ->  ctx.setVariable("specialtyName", s));
//            optionalAttendance.map(Attendance::getProfessional).map(Professional::getName).ifPresent(p -> ctx.setVariable("professionalName", p));
//            optionalAttendance.map(Attendance::getPaymentDetails).map(AttendancePaymentDetails::getPrice).ifPresent(pd -> ctx.setVariable("attendancePrice", pd));
//            optionalAttendance.map(Attendance::getPaymentDetails).map(AttendancePaymentDetails::getInstallments).ifPresent(i -> ctx.setVariable("attendanceInstallments", i));
//
//            EmailRecipe emailRecipe = new EmailRecipe(attendance.getInsured().getUser().getEmail(),  "Atendimento finalizado com sucesso.");
//
//                MimeMessage message = createDefaultHtmlMessage(ATTENDANCE_FINISH_HTML_TEMPLATE_NAME, ctx, emailRecipe);
//
//            mailSender.send(message);
//
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
    }

    @Async
    public void sendChargebackAttendanceMessage(Attendance attendance)  {
        try {
            final Context ctx = new Context();
            Optional<Attendance> optionalAttendance = Optional.of(attendance);
            optionalAttendance.map(Attendance::getInsured).map(Insured::getName).ifPresent(i -> ctx.setVariable("insuredName", i));
            optionalAttendance.map(Attendance::getSpecialty).map(Specialty::getName).ifPresent(s ->  ctx.setVariable("specialtyName", s));
            optionalAttendance.map(Attendance::getPaymentDetails).map(AttendancePaymentDetails::getPrice).ifPresent(pd -> ctx.setVariable("attendancePrice", pd));

            EmailRecipe emailRecipe = new EmailRecipe(attendance.getInsured().getUser().getEmail(), "Valor estornado.");
            MimeMessage message = createDefaultHtmlMessage(PAYMENT_REVERSAL_HTML_TEMPLATE_NAME, ctx, emailRecipe);

            mailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


    private MimeMessage createDefaultHtmlMessage(String templateName, Context context, EmailRecipe recipe) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false);
        helper.setSubject(recipe.getSubject());
        helper.setTo(recipe.getRecipient());

        final String htmlContent = this.htmlTemplateEngine.process(templateName, context);
        message.setText(htmlContent, UTF_8.toString(), "html");
        return message;
    }
}
