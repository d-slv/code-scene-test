package br.com.maidahealth.telemedapi.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.domain.Page;

import br.com.maidahealth.telemedapi.models.Attachment;
import br.com.maidahealth.telemedapi.utils.Utils;

public class AttachmentDto {

    private Long id;

    private String name;

    private Date createdAt;

    private String createdAtFormatted;

    private Boolean viewed;

    private Date viewDate;

    private String key;

    private String url;

    public AttachmentDto() {
    }

    public AttachmentDto(Attachment attachment) {
        this.id = attachment.getId();
        this.name = attachment.getName();
        this.key = attachment.getKey();
        this.createdAt = attachment.getCreatedAt();
        this.createdAtFormatted = Utils.parseToPrettyDate(attachment.getCreatedAt());
        this.viewed = false;
        this.viewDate = null;
        
    }

    public AttachmentDto(Attachment attachment, Date viewDate, boolean links) {
        this.id = attachment.getId();
        this.name = attachment.getName();
        this.key = attachment.getKey();
        this.createdAt = attachment.getCreatedAt();
        this.createdAtFormatted = Utils.parseToPrettyDate(attachment.getCreatedAt());
        this.viewed = true;
        this.viewDate = viewDate;
        if (links)
            this.url = attachment.getLastUrl();        
    }

    public AttachmentDto(Attachment attachment, boolean links) {
        this.id = attachment.getId();
        this.name = attachment.getName();
        this.key = attachment.getKey();
        this.createdAt = attachment.getCreatedAt();
        this.createdAtFormatted = Utils.parseToPrettyDate(attachment.getCreatedAt());
        this.viewed = false;
        this.viewDate = null;
        if (links)
            this.url = attachment.getLastUrl();        
    }
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getCreatedAtFormatted() {
        return createdAtFormatted;
    }

    public void setCreatedAtFormatted(String createdAtFormatted) {
        this.createdAtFormatted = createdAtFormatted;
    }

    public Boolean getViewed() {
        return viewed;
    }

    public void setViewed(Boolean viewed) {
        this.viewed = viewed;
    }

    public Date getViewDate() {
        return viewDate;
    }

    public void setViewDate(Date viewDate) {
        this.viewDate = viewDate;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public static Set<AttachmentDto> convert(Set<Attachment> attachments) {
        Set<AttachmentDto> attachmentDto = new HashSet<>();
        attachments.stream().forEach(i -> attachmentDto.add(convert(i)));
        return attachmentDto;
    }

    public static Set<AttachmentDto> convert(Set<Attachment> attachments, boolean links) {
        Set<AttachmentDto> attachmentDto = new HashSet<>();
        attachments.stream().forEach(i -> attachmentDto.add(convert(i, links)));
        return attachmentDto;
    }

    public static AttachmentDto convert(Attachment attachment, boolean links) {
        return new AttachmentDto(attachment, links);
    }

    public static AttachmentDto convert(Attachment attachment) {
        return new AttachmentDto(attachment);
    }

    public static Page<AttachmentDto> convert(Page<Attachment> attachments) {
        return attachments.map(AttachmentDto::new);
    }
}
