export type GetOdontoCitiesParams = {
	cdUf: string;
};

export type GetOdontoCitiesModel = {
	cidades: {
		nmCidade: string;
	}[];
};

export interface GetOdontoCities {
	get: (params: GetOdontoCitiesParams) => Promise<GetOdontoCitiesModel>;
}
