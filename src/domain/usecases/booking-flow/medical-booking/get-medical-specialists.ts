export type GetMedicalSpecialistsParams = {
	clinic_code: string;
	specialty_code: string;
	date: string;
	shiftType: string;
};

export type GetMedicalSpecialistsModel = {
	content: {
		providers: {
			code: number;
			name: string;
			availableTimes: string[];
		}[];
	};
};

export interface GetMedicalSpecialists {
	get: (params: GetMedicalSpecialistsParams) => Promise<GetMedicalSpecialistsModel>;
}
