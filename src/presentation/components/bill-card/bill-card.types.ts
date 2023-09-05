import {GetObligationPdf, BillData} from 'domain/usecases';

export type BillCardProps = {
	pdf: GetObligationPdf;
	bill: BillData;
};
