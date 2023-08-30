package br.com.maidahealth.telemedapi.form;

import java.util.Objects;

import br.com.maidahealth.telemedapi.enums.CancellingAttendanceReasonEnum;

public class ClientAttendanceCancelingForm {

    public CancellingAttendanceReasonEnum reason;

    public String additionalInfo;

    public ClientAttendanceCancelingForm() {
    }

    public ClientAttendanceCancelingForm(CancellingAttendanceReasonEnum reason, String additionalInfo) {
        this.reason = reason;
        this.additionalInfo = additionalInfo;
    }

    public CancellingAttendanceReasonEnum getReason() {
        return reason;
    }

    public void setReason(CancellingAttendanceReasonEnum reason) {
        this.reason = reason;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ClientAttendanceCancelingForm)) return false;

        ClientAttendanceCancelingForm that = (ClientAttendanceCancelingForm) o;

        return Objects.equals(reason, that.reason);
    }

    @Override
    public int hashCode() {
        return reason != null ? reason.hashCode() : 0;
    }

    @Override
    public String toString() {
        return new StringBuilder().append("AppointmentCancelingForm{").append("cancelReason='").append(reason).append('\'').append(", additionalInformation='").append(additionalInfo).append('\'').append('}').toString();
    }
}
