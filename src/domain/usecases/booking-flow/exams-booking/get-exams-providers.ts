export type GetProvidersExamsParams = {
	cdUf: string;
	nmCidade: string;
	cdTipoExame: number;
};

export type ExamProvider = {
	codigo: number;
	nome: string;
	cep: string;
	numero: number;
	logradouro: string;
	complemento: string;
	bairro: string;
	nmCidade: string;
	cdUf: string;
	latitude: string;
	longitude: string;
};

export type GetProvidersExamsModel = {unidades: ExamProvider[]};

export interface GetExamsProviders {
	get: (params: GetProvidersExamsParams) => Promise<GetProvidersExamsModel>;
}
