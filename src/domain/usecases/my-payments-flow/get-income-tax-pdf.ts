export type GetIncomeTaxPDFParams = {
	dtExercicio: string;
};

export type GetIncomeTaxPDFModel = Blob;

export interface GetIncomeTaxPDF {
	get: (params: GetIncomeTaxPDFParams) => Promise<GetIncomeTaxPDFModel>;
}
