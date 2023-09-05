export type GetMedicalTimesParams = {
	especialidade: string;
	subEspecialidade: string;
	prestadorJuridico: string;
	dataConsulta: string;
	filtroTurno: string;
};

export type GetMedicalTimesModel = {
	horariosPrestadores: {
		nmPrestadorFisico: string;
		cdPrestadorFisico: string;
		horariosDisponiveis: string[];
	}[];
};

export interface GetMedicalTimes {
	get: (params: GetMedicalTimesParams) => Promise<GetMedicalTimesModel>;
}
