export type GetProvidersDentalGuideParams = {
	cdEspecialidade: string;
	cdUf: string;
	nmCidade: string;
	nmBairro: string;
	dsTipo: string;
	nmPrestador?: string;
};

export type GetProvidersDentalGuideModel = {
	prestadores: {
		codigo: string;
		nome: string;
		cnpj: string;
		cep: string;
		numero: string;
		logradouro: string;
		complemento: string;
		bairro: string;
		cidade: string;
		uf: string;
		latitude: string;
		longitude: string;
		tipo: string;
		fone: string;
		tipoDocumento: string;
		nuDocumento: string;
		marcadores: [];
		contatos: string[];
		qualificacoes: [
			{
				cdTipoQualificacao: null;
				dsTipoQualificacao: null;
				dsEspecialidade: null;
			},
		];
	}[];
};

export interface GetProvidersDentalGuide {
	get: (params: GetProvidersDentalGuideParams) => Promise<GetProvidersDentalGuideModel>;
}
