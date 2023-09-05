export type PostMedicalBookingConfirmParams = {
	cdEspecialidade: string;
	cdPrestadorJuridico: string;
	cdPrestadorFisico: string;
	horarioAgendamento: string;
	dtAgendamento: string;
	nuCelular?: string;
};

export type PostMedicalBookingConfirmModel = {
	consultaMarcada: {
		nuProtocolo: string;
	};
};

export interface PostMedicalBookingConfirm {
	post: (params: PostMedicalBookingConfirmParams) => Promise<PostMedicalBookingConfirmModel>;
}
