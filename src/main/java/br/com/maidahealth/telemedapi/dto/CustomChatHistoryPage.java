package br.com.maidahealth.telemedapi.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class CustomChatHistoryPage<ChatMessageDto> extends PageImpl<ChatMessageDto>{

    private static final long serialVersionUID = 3248189030448292002L;

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public CustomChatHistoryPage(@JsonProperty("content") List<ChatMessageDto> content, @JsonProperty("number") int number, @JsonProperty("size") int size,
                    @JsonProperty("totalElements") Long totalElements, @JsonProperty("pageable") JsonNode pageable, @JsonProperty("last") boolean last,
                    @JsonProperty("totalPages") int totalPages, @JsonProperty("sort") JsonNode sort, @JsonProperty("first") boolean first,
                    @JsonProperty("numberOfElements") int numberOfElements) {
        super(content, PageRequest.of(number, size), totalElements);
    }

    public CustomChatHistoryPage(List<ChatMessageDto> content, Pageable pageable, long total) {
        super(content, pageable, total);
    }

    public CustomChatHistoryPage(List<ChatMessageDto> content) {
        super(content);
    }

    public CustomChatHistoryPage() {
        super(new ArrayList<ChatMessageDto>());
    }
}