export type OdontoBookedModel = {
	agendamentos: {
		cdStatus: string;
		dsEspecialidade: string;
		cdEspecialidade: string;
		cdSubEspecialidade: string;
		dsSubEspecialidade: string;
		dtConsulta: string;
		nmPrestadorJuridico: string;
		nmPrestadorFisico: string;
		confirmado: string;
		nuConsulta: string;
		nuProtocolo: string;
		urlconsulta: string;
		tipoLogradouro: string;
		logradouro: string;
		numero: number;
		bairro: string;
		nmCidade: string;
		cdUf: string;
		telemedicina: string;
		tipoConsulta: string;
		complemento: string;
		pontoReferencia: string;
		nuTelefone: string[];
	}[];
};

export interface GetOdontoBooked {
	get: () => Promise<OdontoBookedModel>;
}
