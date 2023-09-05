export type GetExamsCitiesParams = {
	cdUf: string;
};

export type GetExamsCitiesModel = {cidades: {nmCidade: string}[]};

export interface GetExamsCities {
	get: (params: GetExamsCitiesParams) => Promise<GetExamsCitiesModel>;
}
