export type BillData = {
	dtPrevista: string;
	cdObrigacao: number;
	status: string;
	linhaDigitavel: {
		dsSiteBanco: string;
		cdBarra: string;
		vlObrigacao: string;
		qtDiasBaixa: number;
		dtVencimento: string;
		dtAtual: string;
		qtDiasAtraso: number;
		dsMensagemAtraso: string;
	};
};

export type GetOpenObligationListModel = BillData[];

export interface GetOpenObligationList {
	get: () => Promise<GetOpenObligationListModel>;
}
