export type GetMedicalProvidersParams = {
	uf: string;
	cidade: string;
	especialidade: string;
	subEspecialidade: string;
	telemedicina?: string;
};

export type GetMedicalProvidersModel = {
	rede: string;
	unidades: {
		nmPrestador: string;
		cdUf: string;
		nmCidade: string;
		nmBairro: string;
		logradouro: string;
		numero: string;
		complemento: string;
		nuTelefone: string;
		codigo: string;
		latitude: string;
		longitude: string;
	}[];
};

export interface GetMedicalProviders {
	get: (params: GetMedicalProvidersParams) => Promise<GetMedicalProvidersModel>;
}
