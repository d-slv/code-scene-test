export type GetExamsDatesParams = {
	cdTipoExame: number;
	cdProcedimento: string;
	cdPrestadorJuridico: string;
};

export type GetExamsDatesModel = string[];

export interface GetExamsDates {
	get: (params: GetExamsDatesParams) => Promise<GetExamsDatesModel>;
}
