export type GetMedicalCitiesParams = {
	state_code: string;
};

export type GetMedicalCitiesModel = {
	content: {
		state: {
			code: string;
			name: string;
		};
		city: string;
	}[];
};

export interface GetMedicalCities {
	get: (params: GetMedicalCitiesParams) => Promise<GetMedicalCitiesModel>;
}
