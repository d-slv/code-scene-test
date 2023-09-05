export type GetOdontoProvidersParams = {
	cdUf: string;
	nmCidade: string;
	nmBairro?: string;
	cdEspecialidade: string;
	incluirBairrosVizinhos: string;
	cdAtendimentoAcessoEspecial: string;
};

export type GetOdontoProvidersModel = {unidades: unknown[]};

export interface GetOdontoProviders {
	get: (params: GetOdontoProvidersParams) => Promise<GetOdontoProvidersModel>;
}
