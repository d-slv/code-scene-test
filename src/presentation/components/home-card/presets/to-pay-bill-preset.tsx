import React from 'react';
import {AlertIcon} from 'presentation/components/icons';
import {translations} from 'presentation/translations';
import {GetOpenObligationListModel} from 'domain/usecases';
import {convertToReal} from 'presentation/utils';
import {MdChevronRight} from 'react-icons/md';
import {HomeCard} from '..';
import {Link} from '../home-card.styles';

const localTranslations = translations['pt-br'].homePage;

type PresetProps = {
	billList: GetOpenObligationListModel;
	linkAction: () => void;
};

export const ToPayBillPreset = ({billList, linkAction}: PresetProps) => {
	const sumBillList = billList.reduce(
		(partialSum, bill) => partialSum + parseFloat(bill.linhaDigitavel.vlObrigacao),
		0,
	);

	return (
		<HomeCard
			title={localTranslations.billsToPayTitle}
			content={
				<>
					{localTranslations.billsToPayText} <b>{billList.length}</b>&nbsp;
					{localTranslations.billsToPayText2} <b>R${convertToReal(sumBillList)}</b>
				</>
			}
			rightIcon={<AlertIcon width={86} height={101} />}
			footer={
				<span style={{marginTop: '5px'}}>
					<Link onClick={linkAction}>
						{localTranslations.solveNow}
						<MdChevronRight />
					</Link>
				</span>
			}
		/>
	);
};
