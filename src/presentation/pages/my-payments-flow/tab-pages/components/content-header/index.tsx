import React from 'react';
import {MdDownload} from 'react-icons/md';
import {useRecoilState, useRecoilValue} from 'recoil';
import moment from 'moment';

import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {Button} from 'presentation/components/button/button';
import {translations} from 'presentation/translations';
import {SelectDropdown} from 'presentation/components/select-field';
import {formatText} from 'presentation/utils';
import {generateYearsBetween} from 'presentation/utils/generateYearsBetween';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {
	tabState,
	selectedYearState,
	selectedMonthState,
	warningBarState,
} from 'presentation/pages/my-payments-flow/atoms';
import {
	Container,
	MobileSelectDateContainer,
	MobileTabTitleHeader,
	SelectDateContainer,
} from './styles';
import {PaymentsWarningBar} from '../warning-bar';

const localTranslations = translations['pt-br'].myPaymentsPage;
moment.locale('pt-br');

interface ContentHeaderProps {
	handleDownload?: () => Promise<void>;
	isDownloading?: boolean;
}

export function ContentHeader({isDownloading, handleDownload}: ContentHeaderProps) {
	const {isResponsive} = useWindowDimensions();
	const currentTab = useRecoilValue(tabState);
	const {beneficiary} = useRecoilValue(accountDataState);
	const {dtAdesaoC} = beneficiary;
	const startYear = Number(moment(dtAdesaoC, 'DD-MM-YYYY').format('YYYY'));
	const availableYears = generateYearsBetween(startYear);

	const [currentSelectedYear, setCurrentSelectedYear] = useRecoilState(
		selectedYearState({tab: currentTab.slang}),
	);
	const [currentSelectedMonth, setCurrentSelectedMonth] = useRecoilState(selectedMonthState);
	const warningBar = useRecoilValue(warningBarState(currentTab.slang));

	const showWarningBarAndDownloadButton = warningBar;

	const MonthDropdownComponent = (
		<SelectDropdown
			key={currentTab.slang}
			options={moment.months().map(month => formatText(month))}
			onChange={selectedMonth => setCurrentSelectedMonth(selectedMonth)}
			initialValue={currentSelectedMonth}
		/>
	);

	const YearDropdownComponent = (
		<SelectDropdown
			key={currentTab.slang}
			options={availableYears}
			onChange={selectedYear => setCurrentSelectedYear(selectedYear)}
			initialValue={currentSelectedYear}
		/>
	);

	const BtnText = {
		incomeTax: localTranslations.incomeTax.downloadText,
		coparticipationExtract: localTranslations.coparticipationExtract.downloadText,
	};

	return (
		<>
			{isResponsive ? (
				<>
					<MobileSelectDateContainer
						isDoubleSelect={currentTab.slang === 'coparticipationExtract'}>
						<MobileTabTitleHeader
							isDoubleSelect={currentTab.slang === 'coparticipationExtract'}>
							{localTranslations[`mobileTitle-${currentTab.slang}`]}
						</MobileTabTitleHeader>

						<SelectDateContainer>
							{currentTab.slang === 'coparticipationExtract' && (
								<>{MonthDropdownComponent}</>
							)}
							<>{YearDropdownComponent}</>
						</SelectDateContainer>
						{showWarningBarAndDownloadButton && (
							<Button
								onClick={handleDownload}
								fontSize="xxs"
								fontWeight="regular"
								borderRadius="pill"
								rightIcon={<MdDownload />}
								isLoading={isDownloading}
								spacingInsetX="sm">
								{BtnText[currentTab.slang]}
							</Button>
						)}
					</MobileSelectDateContainer>

					{showWarningBarAndDownloadButton && <PaymentsWarningBar />}
				</>
			) : (
				<Container>
					<SelectDateContainer>
						{currentTab.slang === 'coparticipationExtract' && (
							<>{MonthDropdownComponent}</>
						)}
						<>{YearDropdownComponent}</>
					</SelectDateContainer>

					{showWarningBarAndDownloadButton && (
						<Button
							onClick={handleDownload}
							fontSize="xxs"
							fontWeight="regular"
							borderRadius="pill"
							rightIcon={<MdDownload />}
							isLoading={isDownloading}
							spacingInsetX="sm">
							{BtnText[currentTab.slang]}
						</Button>
					)}
				</Container>
			)}
		</>
	);
}
