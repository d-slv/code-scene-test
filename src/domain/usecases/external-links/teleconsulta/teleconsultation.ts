export type GetTeleconsulLinkParams = {
	nuContrato: string;
};

export type GetTeleconsulLinkModel = string;

export interface GetTeleconsulLink {
	get: (params: GetTeleconsulLinkParams) => Promise<GetTeleconsulLinkModel>;
}
