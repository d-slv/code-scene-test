export type GetMedicalDatesParams = {
	especialidade: string;
	subEspecialidade: string;
	prestadorJuridico: string;
};

export type GetMedicalDatesModel = string[];

export interface GetMedicalDates {
	get: (params: GetMedicalDatesParams) => Promise<GetMedicalDatesModel>;
}
