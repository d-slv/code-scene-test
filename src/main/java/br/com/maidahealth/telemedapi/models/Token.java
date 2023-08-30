package br.com.maidahealth.telemedapi.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(indexes = {
        @Index(name = "token_idx_value", columnList = "value"),
})
public class Token implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToOne
    private User user;

    private String value;

    public Token() {
    }

    public Token(User user, String value) {
        this.value = value;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public User getUser() {
        return user;
    }

    public String getValue() {
        return value;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @PrePersist
    protected void prePersist() {
        this.createdAt = new Date();
    }
}
