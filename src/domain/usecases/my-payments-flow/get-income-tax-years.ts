export type GetIncomeTaxYearsModel = {ano: string}[];

export interface GetIncomeTaxYears {
	get: () => Promise<GetIncomeTaxYearsModel>;
}
