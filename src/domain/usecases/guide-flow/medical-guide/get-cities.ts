export type GetCitiesMedicalGuideParams = {
	cdUf: string;
	cdPlanoANS: string;
};
interface StatesProps {
	cdUf: string;
	nmUf: string;
}
export interface GetCitiesMedicalGuideModel {
	cidades: {
		estado: StatesProps;
		nmCidade: string;
	}[];
}
export interface GetCitiesMedicalGuide {
	get: (params: GetCitiesMedicalGuideParams) => Promise<GetCitiesMedicalGuideModel>;
}
