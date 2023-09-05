export type GetExamsTypesParams = {
	cdUf: string;
	sexo: string;
	nmCidade: string;
	nuIdade: number;
};

export type ExamType = {
	cdTipoExame: string;
	dsTipoExame: string;
	flPreparo: boolean;
	dsPreparo: string;
	dsInformacaoComplementar: string;
	flAutorizacao: boolean;
	flCarencia: boolean;
	dtCarencia: string;
	cdProcedimento: string;
};

export type GetExamsTypesModel = {
	tiposExames: ExamType[];
};

export interface GetExamsTypes {
	get: (params: GetExamsTypesParams) => Promise<GetExamsTypesModel>;
}
