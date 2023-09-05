export type GetSpecialtiesSubSpecialtiesDentalGuideParams = {
	cdUf: string;
	cdPlanoANS: string;
};

export type GetSpecialtiesSubSpecialtiesDentalGuideModel = {
	especialidades: {cdEspecialidade: number; dsEspecialidade: string}[];
};

export interface GetSpecialtiesSubSpecialtiesDentalGuide {
	get: (
		params: GetSpecialtiesSubSpecialtiesDentalGuideParams,
	) => Promise<GetSpecialtiesSubSpecialtiesDentalGuideModel>;
}
