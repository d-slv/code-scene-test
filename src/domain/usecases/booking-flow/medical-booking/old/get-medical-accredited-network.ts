export type GetMedicalAccreditedNetworkParams = {
	cdEspecialidade: string;
	cdUf: string;
	nmCidade: string;
	dsTipo: string;
	nmPrestador?: string;
};

export type GetMedicalAccreditedNetworkModel = {
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
		codigoQualificacao: number;
		dsQualificacao: string;
		crmcnes: string;
		cep: string;
		cgccpf: number;
	}[];
}[];

export interface GetMedicalAccreditedNetwork {
	get: (params: GetMedicalAccreditedNetworkParams) => Promise<GetMedicalAccreditedNetworkModel>;
}
