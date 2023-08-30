package br.com.maidahealth.telemedapi.form;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.maidahealth.telemedapi.enums.TwilioOriginEnum;
import br.com.maidahealth.telemedapi.models.TwilioLog;

public class TwilioLogForm {

	@NotNull(message = "Origin é obrigatório")
	@Enumerated(EnumType.STRING)
	private TwilioOriginEnum origin;

	private String userAgentBrowser;

	@NotNull(message = "ID do Atendimento é obrigatório")
    private Long attendanceId;
	
	@NotBlank
	private String twilioEvent;
	
	@NotBlank
	private String twilioCode;
	
	private String stackTrace;
	
	public TwilioLogForm() {
		super();
	}

	public TwilioOriginEnum getOrigin() {
		return origin;
	}

	public void setOrigin(TwilioOriginEnum origin) {
		this.origin = origin;
	}

	public String getUserAgentBrowser() {
		return userAgentBrowser;
	}

	public void setUserAgentBrowser(String userAgentBrowser) {
		this.userAgentBrowser = userAgentBrowser;
	}

	public Long getAttendanceId() {
		return attendanceId;
	}

	public void setAttendanceId(Long attendanceId) {
		this.attendanceId = attendanceId;
	}

	public String getTwilioEvent() {
		return twilioEvent;
	}

	public void setTwilioEvent(String twilioEvent) {
		this.twilioEvent = twilioEvent;
	}

	public String getStackTrace() {
		return stackTrace;
	}

	public void setStackTrace(String stackTrace) {
		this.stackTrace = stackTrace;
	}

	public String getTwilioCode() {
		return twilioCode;
	}

	public void setTwilioCode(String twilioCode) {
		this.twilioCode = twilioCode;
	}

	public TwilioLog toTwilioLog() {
		TwilioLog twilioLog = new TwilioLog();
		return merge(twilioLog);
	}

	public TwilioLog merge(TwilioLog twilioLog) {
		twilioLog.setOrigin(this.origin);
		twilioLog.setStackTrace(this.stackTrace);
		twilioLog.setTwilioEvent(this.twilioEvent);
		twilioLog.setTwilioCode(this.twilioCode);
		twilioLog.setUserAgentBrowser(this.userAgentBrowser);
		return twilioLog;
	}

}
