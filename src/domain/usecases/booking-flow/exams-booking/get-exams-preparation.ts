export type GetExamsPreparationParams = {
	cdTipoExame: string;
	nuIdade: string;
};

export type GetExamsPreparationModel = {dsDescricao: string; dsInfoComplementar: string};

export interface GetExamsPreparation {
	get: (params: GetExamsPreparationParams) => Promise<GetExamsPreparationModel>;
}
