export type GetTelehealthSpecialtiesParams = {
	cdUf: string;
	nmCidade: string;
	telemedicina: string;
};

export type GetTelehealthSpecialtiesModel = {
	especialidades: {
		cdEspecialidade: string;
		dsEspecialidade: string;
		telemedicina: string;
		subEspecialidades: [];
	}[];
};

export interface GetTelehealthSpecialties {
	get: (params: GetTelehealthSpecialtiesParams) => Promise<GetTelehealthSpecialtiesModel>;
}
