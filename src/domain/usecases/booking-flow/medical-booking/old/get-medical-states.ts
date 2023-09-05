export type GetMedicalStatesModel = {estados: {cdUf: string; nmUf: string}[]};

export interface GetMedicalStates {
	get: () => Promise<GetMedicalStatesModel>;
}
