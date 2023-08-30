package br.com.maidahealth.telemedapi.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import static javax.persistence.GenerationType.*;
import static javax.persistence.TemporalType.*;

@Entity
@Table(name = "ticket_comment")
public class TicketComment implements Serializable {

    @Id @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Temporal(TIMESTAMP)
    private Date createdAt;

    @ManyToOne(optional = false)
    private User user;

    @ManyToOne(optional = false)
    private Ticket ticket;


    public TicketComment() {
    }

    public TicketComment(Long id, String text, Date createdAt, User user, Ticket ticket) {
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
        this.user = user;
        this.ticket = ticket;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TicketComment that = (TicketComment) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
