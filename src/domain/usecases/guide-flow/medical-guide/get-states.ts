export type GetStatesMedicalGuideParams = {
	cdPlanoANS: string;
};

export interface GetStatesMedicalGuideModel {
	estados: {cdUf: string; nmUf: string}[];
}

export interface GetStatesMedicalGuide {
	get: (params: GetStatesMedicalGuideParams) => Promise<GetStatesMedicalGuideModel>;
}
