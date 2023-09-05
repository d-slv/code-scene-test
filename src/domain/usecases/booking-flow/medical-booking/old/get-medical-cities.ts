// o parametro original era cdUf
export type GetMedicalCitiesParams = {
	cdUf: string;
};

export type GetMedicalCitiesModel = {cidades: {nmCidade: string}[]};

export interface GetMedicalCities {
	get: (params: GetMedicalCitiesParams) => Promise<GetMedicalCitiesModel>;
}
