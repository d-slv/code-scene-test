export type PostExamsRebookParams = {
	nuExame: string;
	cdTipoExame: number;
	dtAgendamento: string;
	cdPontoEntrada: string;
	cdPrestadorFisico: string;
	horarioAgendamento: string;
	cdPrestadorJuridico: string;
};

export type PostExamsRebookModel = {
	reagendamentoExame: {
		nuExameRemarcado: string;
		protocoloAgendamento: string;
		protocoloCancelamento: string;
	};
};

export interface PostExamsRebook {
	post: (params: PostExamsRebookParams) => Promise<PostExamsRebookModel>;
}
