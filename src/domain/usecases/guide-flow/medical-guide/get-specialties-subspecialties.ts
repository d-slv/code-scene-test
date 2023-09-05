export type GetSpecialtiesSubSpecialtiesMedicalGuideParams = {
	cdPlanoANS: string;
	cdUf: string;
	nmCidade: string;
	nmServico: string;
};

export type GetSpecialtiesSubSpecialtiesMedicalGuideModel = {
	especialidades: {nmEspecialidade: string}[];
};

export interface GetSpecialtiesSubSpecialtiesMedicalGuide {
	get: (
		params: GetSpecialtiesSubSpecialtiesMedicalGuideParams,
	) => Promise<GetSpecialtiesSubSpecialtiesMedicalGuideModel>;
}
