package br.com.maidahealth.telemedapi.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class SupportReason implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String adminTitle;

    private String description;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private SupportConfig config;

    public SupportReason() {
    }

    public SupportReason(Long id, String description) {
        this.id = id;
        this.description = description;
    }

    public SupportReason(Long id, String description, String adminTitle, SupportConfig config) {
        this(id, description);

        this.adminTitle = adminTitle;
        this.config = config;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SupportConfig getConfig() {
        return config;
    }

    public String getAdminTitle() {
        return adminTitle;
    }

    public void setAdminTitle(String adminTitle) {
        this.adminTitle = adminTitle;
    }
}
