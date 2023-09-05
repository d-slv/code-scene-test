export type GetMedicalStatesModel = {
	content: {
		code: string;
		name: string;
	}[];
};

export interface GetMedicalStates {
	get: () => Promise<GetMedicalStatesModel>;
}
