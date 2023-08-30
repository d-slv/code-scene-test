package br.com.maidahealth.telemedapi.utils;

public class EmailRecipe {
    private final String subject;
    private final String recipient;

    public EmailRecipe(String recipient, String subject) {
        this.subject = subject;
        this.recipient = recipient;
    }

    public String getSubject() {
        return subject;
    }

    public String getRecipient() {
        return recipient;
    }
}
