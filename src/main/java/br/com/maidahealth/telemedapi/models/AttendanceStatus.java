package br.com.maidahealth.telemedapi.models;

public enum AttendanceStatus {
	SCHEDULED("Agendado"), // No momento que é criada
	WAITING_IN_QUEUE("Paciente aguardando na fila"), // Quando é feita a confirmação. Provavelmente não será necessário
	WAITING_INSURED("Aguardando Paciente"), // Quando o médico entra na sala
	VIDEOCALL_IN_PROGRESS("Andamento"), // Quando paciente entra na sala
	VIDEOCALL_ENDED("Vídeochamada encerrada"), // Quando o médico finaliza a Video Chamada
	FINISHED("Finalizado"), // Quando o médico finaliza o atendimento (informações da chamada + prescrição)
	CANCELED("Cancelado"), // Quando o atendimento é cancelado
	WAITING_PAYMENT("Aguardando Pagamento"), // Quando o paciente entra na fila e ainda não pagou o atendimento
	PAYMENT_APPROVED("Pagamento Aprovado"), // Quando o pagamento do paciente é aprovado
	PAYMENT_CANCELED("Pagamento Cancelado"); // Quando o pagamento do paciente não é aprovado
	
	private AttendanceStatus(String description) {
		this.description = description;
	}

	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static AttendanceStatus getStatusByName(String status) {
		AttendanceStatus[] values = AttendanceStatus.values();
		for (AttendanceStatus attendanceStatus : values) {
			if(attendanceStatus.name().equals(status)) {
				return attendanceStatus;
			}
		}
		
		return null;
	}
}
