package br.com.maidahealth.telemedapi.dto.projections;

public class AttendanceIntegrationSchedule {
	private Long id;

	private String erpId;

	public AttendanceIntegrationSchedule(Long id, String erpId) {
		super();
		this.id = id;
		this.erpId = erpId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getErpId() {
		return erpId;
	}

	public void setErpId(String erpId) {
		this.erpId = erpId;
	}

}
