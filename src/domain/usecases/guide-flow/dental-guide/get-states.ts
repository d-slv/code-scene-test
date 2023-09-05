export type GetStatesDentalGuideParams = {
	cdPlanoANS: string;
};

export interface GetStatesDentalGuideModel {
	estados: {cdUf: string; nmUf: string}[];
}

export interface GetStatesDentalGuide {
	get: (params: GetStatesDentalGuideParams) => Promise<GetStatesDentalGuideModel>;
}
