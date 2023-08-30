package br.com.maidahealth.telemedapi.dto;

import br.com.maidahealth.telemedapi.models.Attendance;

public class NoticeDto {
	
	private String typeMessage;
	
	private String title;
	
	private String subtitle;
	
	private String typeAction;
	
	private Object metadata;
	
	public String getTypeMessage() {
		return typeMessage;
	}

	public void setTypeMessage(String typeMessage) {
		this.typeMessage = typeMessage;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSubtitle() {
		return subtitle;
	}

	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}

	public String getTypeAction() {
		return typeAction;
	}

	public void setTypeAction(String typeAction) {
		this.typeAction = typeAction;
	}

	public Object getMetadata() {
		return metadata;
	}

	public void setMetadata(Object metadata) {
		this.metadata = metadata;
	}

	public static NoticeDto convert(Object objMetadata, String typeMessage, String title, String subtitle,
			String typeAction) {
		
		NoticeDto noticeDto = new NoticeDto();
		
		if(objMetadata instanceof Attendance)
			noticeDto.setMetadata(AttendanceDto.convert((Attendance) objMetadata, false, null, null, null, null));
		
		noticeDto.setTypeMessage(typeMessage);
		noticeDto.setTitle(title);
		noticeDto.setSubtitle(subtitle);
		noticeDto.setTypeAction(typeAction);
		
		return noticeDto;
	}

}
