/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import moment from 'moment';

import {CardEmpty} from 'presentation/components/card-empty/card-empty';
import {translations} from 'presentation/translations';

import {makeGetCoparticipationPdf} from 'main/factories/usecases';
import {CoparticipationComponent} from './coparticipation-component';
import {ContentHeader} from '../components/content-header';
import {
	coParticipationExtractState,
	tabState,
	selectedYearState,
	selectedMonthState,
	warningBarState,
} from '../../atoms';

const CoparticipationPage = () => {
	const {contratos} = useRecoilValue(coParticipationExtractState);
	const currentTab = useRecoilValue(tabState);
	const currentSelectedYear = useRecoilValue(selectedYearState({tab: currentTab.slang}));
	const currentSelectedMonth = useRecoilValue(selectedMonthState);

	const setWarningBar = useSetRecoilState(warningBarState(currentTab.slang));

	const [isDownloading, setIsDownloading] = useState(false);

	const isEmpty = contratos.length === 0;
	const showWarningBar = !isEmpty;

	async function downloadPdf() {
		setIsDownloading(true);
		try {
			const response = await makeGetCoparticipationPdf().get({
				contrato: contratos[0].contrato,
				ano: currentSelectedYear,
				mes: moment(currentSelectedMonth, 'MMMM').format('MM'),
			});
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
			<ContentHeader handleDownload={downloadPdf} isDownloading={isDownloading} />

			{isEmpty ? (
				<CardEmpty>
					{translations['pt-br'].myPaymentsPage.emptyCardCoparticipation}
				</CardEmpty>
			) : (
				<CoparticipationComponent />
			)}
		</>
	);
};

export default CoparticipationPage;
