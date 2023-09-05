export type GetObligationHistoryParams = {
	exercicio: string;
};

export type HistoryCardProps = {
	mes: string;
	dtPagamento: string;
	vlObrigacao: string;
	dtVencimento: string;
};

export type GetObligationHistoryModel = HistoryCardProps[];

export interface GetObligationHistory {
	get: (params: GetObligationHistoryParams) => Promise<GetObligationHistoryModel>;
}
