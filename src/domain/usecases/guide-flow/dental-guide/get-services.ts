export type GetServicesDentalGuideParams = {
	cdUf: string;
	nmCidade: string;
};

export type GetServicesDentalGuideModel = {
	servicos: {nome: string}[];
};

export interface GetServicesDentalGuide {
	get: (params: GetServicesDentalGuideParams) => Promise<GetServicesDentalGuideModel>;
}
