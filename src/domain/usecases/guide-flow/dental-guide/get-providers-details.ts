export type GetProvidersDetailsDentalGuideParams = {
	cdUf: string;
	dsTipo: string;
	nmCidade: string;
	cdPrestador: string;
};

export type GetProvidersDetailsDentalGuideModel = {
	detalhamento: {
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
};

export interface GetProvidersDetailsDentalGuide {
	get: (
		params: GetProvidersDetailsDentalGuideParams,
	) => Promise<GetProvidersDetailsDentalGuideModel>;
}
