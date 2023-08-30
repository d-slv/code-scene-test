package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class CustomChatPage<ChatParticipantDto> extends PageImpl<ChatParticipantDto>{

    private static final long serialVersionUID = 3248189030448292002L;

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public CustomChatPage(@JsonProperty("content") List<ChatParticipantDto> content, @JsonProperty("number") int number, @JsonProperty("size") int size,
                    @JsonProperty("totalElements") Long totalElements, @JsonProperty("pageable") JsonNode pageable, @JsonProperty("last") boolean last,
                    @JsonProperty("totalPages") int totalPages, @JsonProperty("sort") JsonNode sort, @JsonProperty("first") boolean first,
                    @JsonProperty("numberOfElements") int numberOfElements) {
        super(content, PageRequest.of(number, size), totalElements);
    }

    public CustomChatPage(List<ChatParticipantDto> content, Pageable pageable, long total) {
        super(content, pageable, total);
    }

    public CustomChatPage(List<ChatParticipantDto> content) {
        super(content);
    }

    public CustomChatPage() {
        super(new ArrayList<ChatParticipantDto>());
    }
}