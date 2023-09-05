export type GetOdontoTimesParams = {
	cdUf: string;
	nmCidade: string;
	filtroTurno: string;
	dataConsulta: string;
	cdEspecialidade: string;
	cdSubEspecialidade: string;
	cdPrestadorJuridico: string;
	cdAtendimentoAcessoEspecial: string;
};

export type GetOdontoTimesModel = {
	horariosDisponiveis: {
		horariosDisponiveis: [];
		nmPrestadorFisico: string;
		cdPrestadorFisico: string;
	}[];
};

export interface GetOdontoTimes {
	get: (params: GetOdontoTimesParams) => Promise<GetOdontoTimesModel>;
}
