export type GetMedicalBookedParams = {
	telemedicina?: string;
};

export type GetMedicalBookedModel = {
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
		tipoConsulta: string;
		complemento: string;
		telemedicina: string;
		pontoReferencia: string;
		nuTelefone: string[];
	}[];
};

export interface GetMedicalBooked {
	get: (params?: GetMedicalBookedParams) => Promise<GetMedicalBookedModel>;
}
