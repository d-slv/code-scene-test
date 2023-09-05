export type GetMedicalGuideProvidersParams = {
	cdEspecialidade: string;
	cdUf: string;
	cdUsuario: string;
	nmCidade: string;
};

export type GetMedicalGuideProvidersModel = unknown;

export interface GetMedicalGuideProviders {
	getMedicalGuideProviders: () => Promise<GetMedicalGuideProvidersModel>;
}
