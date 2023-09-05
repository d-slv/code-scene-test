export type GetMedicalCardParams = {
	cdPessoa: string;
};

export type Carteirinha = {
	logoCarteirinha: string;
	nmUsuarioC: string;
	cdUsuarioC: string;
	dtNascimentoUsuarioC: string;
	nuCNS: string;
	dtAdesaoC: string;
	dtCpt: string;
	nomeEmpresa: string;
	nuMatriculaEmpresa: string;
	nmPlano: string;
	nomePlano: string;
	segmentacaoPlano: string;
	tipoAcomodacaoPlano: string;
	registroPlanoAns: string;
	nmOpeContratada: string;
	flPlanoIntegrado: boolean;
};

export type GetMedicalCardModel = Carteirinha[];

export interface GetMedicalCard {
	get: (params: GetMedicalCardParams) => Promise<GetMedicalCardModel>;
}
