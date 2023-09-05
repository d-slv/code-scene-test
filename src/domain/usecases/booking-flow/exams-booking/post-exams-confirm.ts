export type MakeExamsConfirmParams = {
	nuIdade: number;
	cdTipoExame: number;
	dtAgendamento: string;
	cdPontoEntrada: string;
	cdPrestadorFisico: string;
	horarioAgendamento: string;
	cdPrestadorJuridico: string;
};

export type MakeExamsConfirmParamsModel = {
	nuProtocolo: string;
	dsDescricao: string;
	dsInfoComplementar: string;
};

export interface PostExamsConfirm {
	post: (params: MakeExamsConfirmParams) => Promise<MakeExamsConfirmParamsModel>;
}
