export type GetTelehealthStatesModel = {estados: {cdUf: string; nmUf: string}[]};

export interface GetTelehealthStates {
	get: () => Promise<GetTelehealthStatesModel>;
}
