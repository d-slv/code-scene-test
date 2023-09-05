export type GetOdontoDatesParams = {
	cdUf: string;
	nmCidade: string;
	tipoPesquisa: string;
	cdEspecialidade: string;
	cdSubEspecialidade: string;
	cdPrestadorJuridico: string;
	cdAtendimentoAcessoEspecial: string;
};

export type GetOdontoDatesModel = [];

export interface GetOdontoDates {
	get: (params: GetOdontoDatesParams) => Promise<GetOdontoDatesModel>;
}
