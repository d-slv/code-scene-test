export type GetTelehealthTimesParams = {
	especialidade: string;
	subEspecialidade: string;
	prestadorJuridico: string;
	dataConsulta: string;
	filtroTurno: string;
};

export type GetTelehealthTimesModel = {
	horariosPrestadores: {
		nmPrestadorFisico: string;
		cdPrestadorFisico: string;
		horariosDisponiveis: string[];
	}[];
};

export interface GetTelehealthTimes {
	get: (params: GetTelehealthTimesParams) => Promise<GetTelehealthTimesModel>;
}
