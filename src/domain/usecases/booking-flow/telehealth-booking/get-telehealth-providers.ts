export type GetTelehealthProvidersParams = {
	uf: string;
	cidade: string;
	especialidade: string;
	subEspecialidade: string;
	telemedicina: string;
};

export type GetTelehealthProvidersModel = {
	unidades: {
		codigo: string;
		nmPrestador: string;
		cep: string;
		numero: string;
		logradouro: string;
		complemento: string;
		bairro: string;
		latitude: string;
		longitude: string;
		telemedicina: string;
	}[];
};

export interface GetTelehealthProviders {
	get: (params: GetTelehealthProvidersParams) => Promise<GetTelehealthProvidersModel>;
}
