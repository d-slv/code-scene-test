export type CoparticipationExtract = {
	servico: string;
	autorizacao: string;
	dataEvento: string;
	nomePrestador: string;
	procedimentoRealizado: string;
	valorUtilizacao: string;
	valorParticipacao: string;
	tipoAtendimento: string;
};

export type CoparticipationDueDate = {
	vencimento: string;
	extratos: CoparticipationExtract[];
};

export type CoparticipationContract = {
	contrato: string;
	nmUsuario: string;
	matricula: string;
	valorTotalUtilizacao: string;
	valorTotalParticipacao: string;
	vencimentos: CoparticipationDueDate[];
};

export type GetCoparticipationModel = {
	cpf: string;
	titular: string;
	contratos: CoparticipationContract[];
};

export type GetCoparticipationParams = {
	ano: string;
	mes: string;
};

export interface GetCoparticipation {
	get: (params: GetCoparticipationParams) => Promise<GetCoparticipationModel>;
}
