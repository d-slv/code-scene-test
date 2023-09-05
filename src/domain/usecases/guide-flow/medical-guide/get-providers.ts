export type GetProvidersMedicalGuideParams = {
	dsEspecialidade: string;
	cdUf: string;
	nmCidade: string;
	dsTipo: string;
	nmPrestador?: string;
};

export type GetProvidersMedicalGuideModel = {
	prestadores: {
		codigo: number;
		nmPrestador: string;
		logradouro: string;
		dsComplEndereco: string;
		nmBairro: string;
		nmCidade: string;
		cdUf: string;
		tipo: string;
		nuTelefone: string;
		qualificacoes: [
			{
				cdTipoQualificacao: null;
				dsTipoQualificacao: null;
				dsEspecialidade: null;
			},
		];
		crmcnes: string;
		cep: string;
		cgccpf: number;
	}[];
};

export interface GetProvidersMedicalGuide {
	get: (params: GetProvidersMedicalGuideParams) => Promise<GetProvidersMedicalGuideModel>;
}
