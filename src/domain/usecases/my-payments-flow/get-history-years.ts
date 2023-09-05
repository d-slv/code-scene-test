export type GetHistoryYearsModel = {ano: string}[];

export interface GetHistoryYears {
	get: () => Promise<GetHistoryYearsModel>;
}
