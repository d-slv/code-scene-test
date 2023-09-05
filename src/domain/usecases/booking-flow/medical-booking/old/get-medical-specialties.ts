export type GetMedicalSpecialtiesParams = {
	cdUf: string;
	nmCidade: string;
};

export type GetMedicalSpecialtiesModel = {
	especialidades: {
		cdEspecialidade: string;
		dsEspecialidade: string;
		telemedicina: string;
		subEspecialidades: [];
	}[];
};

export interface GetMedicalSpecialties {
	get: (params: GetMedicalSpecialtiesParams) => Promise<GetMedicalSpecialtiesModel>;
}
