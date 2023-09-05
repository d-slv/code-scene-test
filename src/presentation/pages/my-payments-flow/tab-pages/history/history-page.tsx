import React from 'react';
import {useRecoilValue} from 'recoil';

import {translations} from 'presentation/translations';
import {HistoryCardDesktop, HistoryCardMobile} from 'presentation/components/history-card';
import {CardEmpty} from 'presentation/components/card-empty/card-empty';
import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {ContentHeader} from '../components/content-header';
import {DesktopContainer, MobileContainer} from './history.styles';
import {availableYearsState, paymentsHistoryState} from '../../atoms';

const HistoryPage = () => {
	const {isResponsive} = useWindowDimensions();
	const payments = useRecoilValue(paymentsHistoryState);
	const availableYears = useRecoilValue(availableYearsState);

	const showHeader = availableYears.length !== 0;
	const isEmpty = payments.length === 0;
	const PageContainer = isResponsive ? MobileContainer : DesktopContainer;
	const Card = isResponsive ? HistoryCardMobile : HistoryCardDesktop;

	return (
		<>
			{showHeader && <ContentHeader />}
			{isEmpty ? (
				<CardEmpty>{translations['pt-br'].myPaymentsPage.emptyCardTextHistory}</CardEmpty>
			) : (
				<PageContainer>
					{payments.map((payment, index) => (
						<Card
							key={index}
							mes={payment.mes}
							dtPagamento={payment.dtPagamento}
							vlObrigacao={payment.vlObrigacao}
							dtVencimento={payment.dtVencimento}
						/>
					))}
				</PageContainer>
			)}
		</>
	);
};

export default HistoryPage;
