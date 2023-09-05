export type GetMedicalSupportNetworkParams = {
	cdEspecialidade: string;
	cdUf: string;
	nmCidade: string;
};

export type GetMedicalSupportNetworkModel = {
	nomeMedico: string;
	enderecoComercial: string;
	nuEnderecoComercial: string;
	complementoEnderecoComercial: string;
	bairro: string;
	nmCidade: string;
	cdUf: string;
	telefone: string;
	ramal: string;
	ordemEndereco: string;
	localAtendimento: string;
	instrucoes: string;
}[];

export interface GetMedicalSupportNetwork {
	get: (params: GetMedicalSupportNetworkParams) => Promise<GetMedicalSupportNetworkModel>;
}
