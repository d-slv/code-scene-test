/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {CardEmpty} from 'presentation/components/card-empty/card-empty';
import {translations} from 'presentation/translations';
import {makeGetIncomeTaxPDF} from 'main/factories/usecases';
import {IncomeTaxComponent} from './income-tax-component';
import {ContentHeader} from '../components/content-header';
import {
	tabState,
	selectedYearState,
	incomeTaxState,
	availableYearsState,
	warningBarState,
} from '../../atoms';

const IncomeTaxPage = () => {
	const currentTab = useRecoilValue(tabState);
	const currentSelectedYear = useRecoilValue(selectedYearState({tab: currentTab.slang}));
	const {impostoDeRenda} = useRecoilValue(incomeTaxState);
	const [isDownloading, setIsDownloading] = useState(false);
	const availableYears = useRecoilValue(availableYearsState);
	const setWarningBar = useSetRecoilState(warningBarState(currentTab.slang));

	const showHeader = availableYears.length !== 0;
	const isEmpty = impostoDeRenda.length === 0;
	const showWarningBar = !isEmpty;

	async function downloadPdf() {
		setIsDownloading(true);
		try {
			const response = await makeGetIncomeTaxPDF().get({dtExercicio: currentSelectedYear});
			window.open(URL.createObjectURL(response));
		} catch (error) {
			console.log('MyPayments Error:', error);
			window.alert(translations['pt-br'].myPaymentsPage.downloadError);
		} finally {
			setIsDownloading(false);
		}
	}

	useEffect(() => {
		if (showWarningBar) {
			setWarningBar(true);
		} else {
			setWarningBar(false);
		}
	}, [showWarningBar]);

	return (
		<>
			{showHeader && (
				<ContentHeader handleDownload={downloadPdf} isDownloading={isDownloading} />
			)}
			{isEmpty ? (
				<CardEmpty>{translations['pt-br'].myPaymentsPage.emptyCardIncomeTax}</CardEmpty>
			) : (
				<IncomeTaxComponent />
			)}
		</>
	);
};

export default IncomeTaxPage;
