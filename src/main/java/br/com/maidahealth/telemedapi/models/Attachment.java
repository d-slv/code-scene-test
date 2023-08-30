package br.com.maidahealth.telemedapi.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

@Entity
@Table(indexes = { @Index(name = "attachment_idx_key", columnList = "key") })
public class Attachment extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private String name;

    @Column(unique = true)
    private String key;

    @Column(length = 511)
    private String lastUrl;

    public Attachment() {
        super();
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getLastUrl() {
        return lastUrl;
    }

    public void setLastUrl(String lastUrl) {
        this.lastUrl = lastUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
