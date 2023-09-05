export type GetTelehealthSupportNetworkParams = {
	cdEspecialidade: string;
	cdUf: string;
	nmCidade: string;
};

export type GetTelehealthSupportNetworkModel = {
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

export interface GetTelehealthSupportNetwork {
	get: (params: GetTelehealthSupportNetworkParams) => Promise<GetTelehealthSupportNetworkModel>;
}
