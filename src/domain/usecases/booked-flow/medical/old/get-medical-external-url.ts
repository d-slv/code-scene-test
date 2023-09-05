export type GetMedicalExternalUrlParams = {
	nuContrato: string | number;
};

export type GetMedicalExternalUrlModel = string;

export interface GetMedicalExternalUrl {
	get: (params: GetMedicalExternalUrlParams) => Promise<GetMedicalExternalUrlModel>;
}
