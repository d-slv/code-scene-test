import React, {Suspense} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Link} from 'react-router-dom';

import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {TabNavbar} from 'presentation/components/tab-navbar';
import {translations} from 'presentation/translations';
import {ArrowIcon} from 'presentation/components/icons';

import {Loading} from 'presentation/components/loading';
import {GetObligationPdf} from 'domain/usecases';
import {CoparticipationPage} from './tab-pages/coparticipation-extract';
import {IncomeTaxPage} from './tab-pages/income-tax';
import {HistoryPage} from './tab-pages/history';
import {OpenBillsPage} from './tab-pages/open-bills';
import {
	BackButtonContainer,
	Content,
	MobileHeader,
	MobileTitle,
	MyPaymentsContainer,
	TabContainer,
	Title,
} from './styles';
import {PaymentsWarningBar} from './tab-pages/components/warning-bar';
import {accountDataState} from '../entry-flow/atoms';
import {tabIndexState, tabState, warningBarState, allTabs} from './atoms';

const localTranslations = translations['pt-br'].myPaymentsPage;

interface MyPaymentsProps {
	pdf: GetObligationPdf;
}

export const MyPayments = ({pdf}: MyPaymentsProps) => {
	const [selectedTabIndex, setSelectedTabIndex] = useRecoilState(tabIndexState);
	const currentTab = useRecoilValue(tabState);
	const {isResponsive} = useWindowDimensions();
	const {beneficiary} = useRecoilValue(accountDataState);
	const warningBar = useRecoilValue(warningBarState(currentTab.slang));

	const showWarningBar = warningBar;
	const isEmpresarial = beneficiary.tipoContratacao === 'EMPRESARIAL';
	const tabs = allTabs.filter(tab => (isEmpresarial ? !tab.onlyIndividualContract : true));

	function handleChangeTab(tabIndex: number) {
		setSelectedTabIndex(tabIndex);
	}

	return (
		<>
			<MyPaymentsContainer>
				{isResponsive ? (
					<>
						<BackButtonContainer>
							<Link to={'/home'}>
								<ArrowIcon width={16} height={16} />
							</Link>
						</BackButtonContainer>
						<MobileHeader />
						<MobileTitle>{localTranslations.title}</MobileTitle>
					</>
				) : (
					<>
						{showWarningBar && <PaymentsWarningBar />}

						<Title>{localTranslations.title}</Title>
					</>
				)}

				<Content>
					<TabContainer>
						<TabNavbar
							tabNames={tabs.map(tab => tab.title)}
							callback={tabIndex => handleChangeTab(tabIndex)}
							selectedIndex={selectedTabIndex}
						/>
					</TabContainer>

					{currentTab.slang === 'openBills' && (
						<Suspense
							fallback={
								<Loading customMsg="Carregando..." style={{minHeight: 600}} />
							}>
							<OpenBillsPage pdf={pdf} />
						</Suspense>
					)}
					{currentTab.slang === 'history' && (
						<Suspense
							fallback={
								<Loading customMsg="Carregando..." style={{minHeight: 600}} />
							}>
							<HistoryPage />
						</Suspense>
					)}
					{currentTab.slang === 'incomeTax' && (
						<Suspense
							fallback={
								<Loading customMsg="Carregando..." style={{minHeight: 600}} />
							}>
							<IncomeTaxPage />
						</Suspense>
					)}
					{currentTab.slang === 'coparticipationExtract' && (
						<Suspense
							fallback={
								<Loading customMsg="Carregando..." style={{minHeight: 600}} />
							}>
							<CoparticipationPage />
						</Suspense>
					)}
				</Content>
			</MyPaymentsContainer>
		</>
	);
};
