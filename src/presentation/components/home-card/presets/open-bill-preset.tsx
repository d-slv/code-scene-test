/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, {useState} from 'react';
import {DollarIcon} from 'presentation/components/icons';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {BillData, GetObligationPdf} from 'domain/usecases';
import {MdDownload} from 'react-icons/md';
import {convertToReal} from 'presentation/utils';
import moment from 'moment';
import {HomeCard} from '..';
import {BoldText, Container, StyledText} from './open-bill-preset.styles';

const localTranslations = translations['pt-br'].homePage;

type PresetProps = {
	cardData: BillData;
	pdf: GetObligationPdf;
};

interface OpenBillCardProps {
	dueValue: string;
	expireDate: string;
}

function OpenBillCard({dueValue, expireDate}: OpenBillCardProps) {
	return (
		<Container>
			<StyledText>
				{`${localTranslations.totalValue}`}&nbsp;
				<BoldText>R${convertToReal(parseFloat(dueValue))}</BoldText>
			</StyledText>

			<StyledText>
				{localTranslations.dueDate} <BoldText>{expireDate}</BoldText>
			</StyledText>
		</Container>
	);
}

export const OpenBillPreset = (props: PresetProps) => {
	const {cardData, pdf} = props;

	const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false);

	const downloadBill = () => {
		setIsDownloadLoading(true);
		if (!isDownloadLoading) {
			pdf.get({obrigacao: cardData.cdObrigacao})
				.then(response => {
					const file = new Blob([response], {type: 'application/pdf'});
					const fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				})
				.catch(error => {
					console.log('MyPaments Error:', error);
					window.alert(translations['pt-br'].myPaymentsPage.downloadError);
					setIsDownloadLoading(false);
				})
				.finally(() => setIsDownloadLoading(false));
		}
	};

	const formatedDate = moment(cardData.linhaDigitavel.dtVencimento, 'DD-MM-YYYY').format(
		'MMM/YY',
	);

	return (
		<HomeCard
			textColor="#666666"
			title={`${localTranslations.openBillTitle} | ${
				formatedDate[0].toUpperCase() + formatedDate.slice(1)
			}`}
			content={
				<OpenBillCard
					dueValue={cardData.linhaDigitavel.vlObrigacao}
					expireDate={cardData.linhaDigitavel.dtVencimento}
				/>
			}
			rightIcon={<DollarIcon width={65} height={101} />}
			footer={
				<Button
					fontSize="xxs"
					rightIcon={<MdDownload />}
					spacingInsetX="sm"
					isLoading={isDownloadLoading}
					onClick={() => downloadBill()}>
					{localTranslations.downloadBill}
				</Button>
			}
		/>
	);
};
