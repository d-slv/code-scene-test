export type GetTelehealthDatesParams = {
	especialidade: string;
	subEspecialidade: string;
	prestadorJuridico: string;
};

export type GetTelehealthDatesModel = string[];

export interface GetTelehealthDates {
	get: (params: GetTelehealthDatesParams) => Promise<GetTelehealthDatesModel>;
}
