import React from 'react';
import {useRecoilValue} from 'recoil';

import {translations} from 'presentation/translations';
import {BillCardDesktop, BillCardMobile} from 'presentation/components/bill-card';
import {CardEmpty} from 'presentation/components/card-empty/card-empty';
import {GetObligationPdf} from 'domain/usecases';
import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {DesktopContainer, MobileContainer} from './open-bills.styles';
import {openBillsState} from '../../atoms';

type OpenBillsPageProps = {
	pdf: GetObligationPdf;
};

const OpenBillsPage = (props: OpenBillsPageProps) => {
	const {pdf} = props;
	const {isResponsive} = useWindowDimensions();
	const openBills = useRecoilValue(openBillsState);

	const isEmpty = openBills.length === 0;
	const PageContainer = isResponsive ? MobileContainer : DesktopContainer;
	const Card = isResponsive ? BillCardMobile : BillCardDesktop;

	return (
		<>
			{isEmpty ? (
				<CardEmpty>{translations['pt-br'].myPaymentsPage.emptyCardTextPayments}</CardEmpty>
			) : (
				<PageContainer data-testid="open-bills-tab">
					{openBills.map(bill => (
						<Card key={bill.cdObrigacao} bill={bill} pdf={pdf} />
					))}
				</PageContainer>
			)}
		</>
	);
};

export default OpenBillsPage;
