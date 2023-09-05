export type GetExamsBookedParams = {
	dtFinal: string;
	cdStatus: string;
	dtInicial: string;
};

export type ExamBooked = {
	nuExame: number;
	nuProtocolo: string;
	status: number;
	dtExameMarcado: string;
	flConfirmado: string;
	cdPrestadorFisico: number;
	nmPrestadorFisico: string;
	cdPrestadorJuridico: number;
	nmPrestadorJuridico: string;
	dsEnderecoPrestadorJuridico: string;
	senhaExame: string;
	statusAutorizacao: string;
	cdTipoExame: string;
	nmTipoExame: string;
	tipoConsulta: string;
};

export type GetExamsBookedModel = {
	exames: ExamBooked[];
};

export interface GetExamsBooked {
	get: (params?: GetExamsBookedParams) => Promise<GetExamsBookedModel>;
}
