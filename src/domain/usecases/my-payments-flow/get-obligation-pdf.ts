export type GetObligationPdfParams = {
	obrigacao: number;
};

export type GetObligationPdfModel = Blob;

export interface GetObligationPdf {
	get: (params: GetObligationPdfParams) => Promise<GetObligationPdfModel>;
}
