export type GetExamsStatesModel = {
	estados: {
		cdUf: string;
		nmUf: string;
	}[];
};

export interface GetExamsStates {
	get: () => Promise<GetExamsStatesModel>;
}
