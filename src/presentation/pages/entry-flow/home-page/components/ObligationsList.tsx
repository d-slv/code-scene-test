import React from 'react';
import {useRecoilValue} from 'recoil';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';

import {CardEmpty} from 'presentation/components/card-empty/card-empty';
import {OpenBillPreset, ToPayBillPreset} from 'presentation/components/home-card';
import {Slider} from 'presentation/components/slider';
import {translations} from 'presentation/translations';
import {GetObligationPdf, GetOpenObligationListModel} from 'domain/usecases';
import {obligationsState} from '../../atoms';

interface ObligationsListProps {
	obligationPdf: GetObligationPdf;
}

const localTranslations = translations['pt-br'].homePage;

function getOldestBill(billList: GetOpenObligationListModel) {
	if (billList.length === 1) return billList[0];
	const copiedBillList = [...billList];

	copiedBillList.sort((a, b) =>
		moment(a.linhaDigitavel.dtVencimento, 'DD-MM-YYYY').diff(
			moment(b.linhaDigitavel.dtVencimento, 'DD-MM-YYYY'),
		),
	);
	return copiedBillList[0];
}

export function ObligationsList({obligationPdf}: ObligationsListProps) {
	const obligations = useRecoilValue(obligationsState);
	const oldestBill = getOldestBill(obligations);

	const navigate = useNavigate();

	function goToMyPayments() {
		navigate('/meu-financeiro');
	}

	return (
		<>
			{obligations.length !== 0 ? (
				<Slider useArrows={false} step={0} spaceBetween={30}>
					<ToPayBillPreset billList={obligations} linkAction={goToMyPayments} />
					{oldestBill.status !== 'Em Negociação' && (
						<OpenBillPreset pdf={obligationPdf} cardData={oldestBill} />
					)}
				</Slider>
			) : (
				<CardEmpty title={localTranslations.financialEmptyTitle}>
					{localTranslations.financialEmpty}
				</CardEmpty>
			)}
		</>
	);
}
