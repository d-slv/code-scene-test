export type GetCitiesDentalGuideParams = {
	cdUf: string;
	cdPlanoANS: string;
};

interface StatesProps {
	cdUf: string;
	nmUf: string;
}

export interface GetCitiesDentalGuideModel {
	cidades: {
		estado: StatesProps;
		nmCidade: string;
	}[];
}

export interface GetCitiesDentalGuide {
	get: (params: GetCitiesDentalGuideParams) => Promise<GetCitiesDentalGuideModel>;
}
