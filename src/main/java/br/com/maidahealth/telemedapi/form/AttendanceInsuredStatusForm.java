package br.com.maidahealth.telemedapi.form;


import br.com.maidahealth.telemedapi.customvalidations.ConnectionStatus;
import br.com.maidahealth.telemedapi.enums.ConnectionStatusEnum;

import static br.com.maidahealth.telemedapi.enums.ConnectionStatusEnum.OFFLINE;
import static br.com.maidahealth.telemedapi.enums.ConnectionStatusEnum.ONLINE;

public class AttendanceInsuredStatusForm {

    @ConnectionStatus(enumClass = ConnectionStatusEnum.class, any = {ONLINE, OFFLINE})
    private String status;

    public AttendanceInsuredStatusForm() {
    }

    public AttendanceInsuredStatusForm(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isOnline(){
        return ONLINE.equals(this.getStatus());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AttendanceInsuredStatusForm that = (AttendanceInsuredStatusForm) o;

        return status == that.status;
    }

    @Override
    public int hashCode() {
        return status != null ? status.hashCode() : 0;
    }
}
