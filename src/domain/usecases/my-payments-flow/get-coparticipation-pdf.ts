export type GetCoparticipationPdfParams = {
	contrato: string;
	ano: string;
	mes: string;
};

export type GetCoparticipationPdfModel = Blob;

export interface GetCoparticipationPdf {
	get: (params: GetCoparticipationPdfParams) => Promise<GetCoparticipationPdfModel>;
}
