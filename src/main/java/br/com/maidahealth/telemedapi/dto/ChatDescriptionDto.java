package br.com.maidahealth.telemedapi.dto;

public class ChatDescriptionDto {

    // Campos definidos em snake case para fins de conversão de formatos entre o MS-Chat e o Telehealth
	private String descricao;

	private Long chat_id;

    private String participante_id;

    private long unread_messages;
    
    public ChatDescriptionDto() {
	}
    
    public ChatDescriptionDto(Long chat_id, String participante_id, String descricao, long unread_messages) {
		this.chat_id = chat_id;
		this.participante_id = participante_id;
		this.descricao = descricao;
		this.unread_messages = unread_messages;
	}

	public Long getChat_id() {
        return chat_id;
    }

    public void setChat_id(Long chat_id) {
        this.chat_id = chat_id;
    }

    public String getParticipante_id() {
		return participante_id;
	}

	public void setParticipante_id(String participante_id) {
		this.participante_id = participante_id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public long getUnread_messages() {
        return unread_messages;
    }

    public void setUnread_messages(long unread_messages) {
        this.unread_messages = unread_messages;
    }

}
