export type GetExamsTimesParams = {
	dtData: string;
	cdTipoExame: string;
	filtroTurno: string;
	cdPrestadorJuridico: string;
};

export type ExamTimes = {
	nmPrestadorFisico: string;
	cdPrestadorFisico: number;
	horariosDisponiveis: [];
};

export type GetExamsTimesModel = {
	horariosDisponiveis: ExamTimes[];
};

export interface GetExamsTimes {
	get: (params: GetExamsTimesParams) => Promise<GetExamsTimesModel>;
}
