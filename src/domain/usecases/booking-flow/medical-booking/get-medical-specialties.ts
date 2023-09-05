export type GetMedicalSpecialtiesParams = {
	state_code: string;
	city: string;
};

export type GetMedicalSpecialtiesModel = {
	content: {
		code: number;
		description: string;
		telemedicine: string;
		subspecialties: {
			subspecialtyCode: number;
			subspecialtyDescription: string;
			operationDate: string;
			activeFlag: number;
			riskPregnancyFlag: string;
		}[];
	}[];
};

export interface GetMedicalSpecialties {
	get: (params: GetMedicalSpecialtiesParams) => Promise<GetMedicalSpecialtiesModel>;
}
