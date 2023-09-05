export type TelehealthBookingParams = {
	cdPontoEntrada: string;
	cdEspecialidade: string;
	cdPrestadorFisico: string;
	cdPrestadorJuridico: string;
	dtAgendamento: string;
	horarioAgendamento: string;
};

export type TelehealthBookingModel = {
	consultaMarcada: {
		nuProtocolo: string;
	};
};

export interface PostTelehealthBooking {
	post: (params: TelehealthBookingParams) => Promise<TelehealthBookingModel>;
}
