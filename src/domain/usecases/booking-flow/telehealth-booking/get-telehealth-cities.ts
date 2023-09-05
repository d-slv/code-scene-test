export type GetTelehealthCitiesParams = {
	uf: string;
};

export type GetTelehealthCitiesModel = {cidades: {nmCidade: string}[]};

export interface GetTelehealthCities {
	get: (params: GetTelehealthCitiesParams) => Promise<GetTelehealthCitiesModel>;
}
