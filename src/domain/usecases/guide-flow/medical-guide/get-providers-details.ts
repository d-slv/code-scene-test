export type GetProvidersDetailsMedicalGuideParams = {
	cdPrestador: string;
	cdRedeHap: string;
	cdUf: string;
	nmCidade: string;
	dsTipo: string;
};

export type GetProvidersDetailsMedicalGuideModel = {
	especialidades: [
		{
			codigo: number;
			descricao: string;
		},
	];
	informativo: {
		titulo: string;
		descricao: string;
		prestadoresSubstitutos: {
			codigo: number;
			nome: string;
		}[];
	};
};

export interface GetProvidersDetailsMedicalGuide {
	get: (
		params: GetProvidersDetailsMedicalGuideParams,
	) => Promise<GetProvidersDetailsMedicalGuideModel>;
}
