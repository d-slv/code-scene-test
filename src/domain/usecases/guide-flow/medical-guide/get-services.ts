export type GetServicesMedicalGuideParams = {
	cdUf: string;
	nmCidade: string;
};

export interface GetServicesMedicalGuideModel {
	servicos: {nome: string}[];
}

export interface GetServicesMedicalGuide {
	get: (params: GetServicesMedicalGuideParams) => Promise<GetServicesMedicalGuideModel>;
}
