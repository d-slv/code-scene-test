package br.com.maidahealth.telemedapi.models;

public enum AttendanceType {
	ELECTIVE("Eletiva"), 
	URGENCY("Urgência");
	
	private AttendanceType(String description) {
		this.description = description;
	}

	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
