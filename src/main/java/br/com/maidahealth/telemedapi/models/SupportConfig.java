package br.com.maidahealth.telemedapi.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class SupportConfig implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer deadline;

    public SupportConfig(Integer deadline) {
        this.deadline = deadline;
    }

    public SupportConfig() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDeadline() {
        return deadline;
    }

    public void setDeadline(Integer deadline) {
        this.deadline = deadline;
    }

}
