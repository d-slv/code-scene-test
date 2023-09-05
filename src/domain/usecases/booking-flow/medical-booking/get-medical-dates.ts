export type GetMedicalDatesParams = {
	clinic_code: string;
	specialty_code: string;
};

export type GetMedicalDatesModel = {
	content: string[];
};

export interface GetMedicalDates {
	get: (params: GetMedicalDatesParams) => Promise<GetMedicalDatesModel>;
}
