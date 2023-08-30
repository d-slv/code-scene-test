package br.com.maidahealth.telemedapi.dto;

public class NotificationUnreadDto {

	private Integer count;
	
	public NotificationUnreadDto(Integer count) {
		super();
		this.count= count;
	}
	
	public synchronized Integer getCount() {
		return count;
	}

	public synchronized void setCount(Integer count) {
		this.count = count;
	}


	public static NotificationUnreadDto convert(Integer count) {
		return new NotificationUnreadDto(count);
	}
}
