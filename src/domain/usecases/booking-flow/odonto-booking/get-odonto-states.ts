export type GetOdontoStatesModel = {
	estados: {
		cdUf: string;
		nmUf: string;
	}[];
};

export interface GetOdontoStates {
	get: () => Promise<GetOdontoStatesModel>;
}
