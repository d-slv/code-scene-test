export type GetNeighborhoodsDentalGuideParams = {
	cdUf: string;
	nmCidade: string;
	dsServico: string;
	cdPlanoANS: string;
	cdEspecialidade: string;
};

export interface GetNeighborhoodsDentalGuideModel {
	bairros: {
		nmBairro: string;
	}[];
}

export interface GetNeighborhoodsDentalGuide {
	get: (params: GetNeighborhoodsDentalGuideParams) => Promise<GetNeighborhoodsDentalGuideModel>;
}
