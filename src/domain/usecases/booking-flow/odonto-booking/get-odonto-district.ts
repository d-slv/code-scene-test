export type GetOdontoDistrictsParams = {
	cdUf: string;
	nmCidade: string;
	cdEspecialidade: string;
	cdSubEspecialidade: string;
	cdAtendimentoAcessoEspecial: string;
};

export type GetOdontoDistrictsModel = {
	bairros: {
		cdUF: string;
		nmUF: string;
		nmCidade: string;
		nmBairro: string;
		cdEspecialidade: string;
		dsEspecialidade: string;
	}[];
};

export interface GetOdontoDistricts {
	get: (params: GetOdontoDistrictsParams) => Promise<GetOdontoDistrictsModel>;
}
