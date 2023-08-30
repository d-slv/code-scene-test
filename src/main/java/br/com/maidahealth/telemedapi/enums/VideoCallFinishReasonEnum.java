package br.com.maidahealth.telemedapi.enums;

public enum VideoCallFinishReasonEnum {
	
	FINISHED_SUCCESSFULLY("Chamada de vídeo realizada com sucesso"),
	AUDIO_OR_VIDEO_ERROR("Paciente teve problemas com aúdio ou vídeo"),
	FORWARDED_TO_PRESENTIAL("Encaminhado para Presencial"),
	OTHER_REASON("Outros"),
	NO_SHOW("Paciente não compareceu")
	;
	
	private VideoCallFinishReasonEnum(String description) {
		this.description = description;
	}

	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static VideoCallFinishReasonEnum getReasonByName(String reason) {
		VideoCallFinishReasonEnum[] values = VideoCallFinishReasonEnum.values();
		for (VideoCallFinishReasonEnum attendanceFinishReason : values) {
			if(attendanceFinishReason.name().equals(reason)) {
				return attendanceFinishReason;
			}
		}
		
		return null;
	}

}
