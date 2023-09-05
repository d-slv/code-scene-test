import React from 'react';
import {MdDownload} from 'react-icons/md';

import {translations} from 'presentation/translations';
import {BalloonUtil} from 'presentation/components/balloon-util/balloon-util';
import {Button} from 'presentation/components/button/button';
import {formatDate} from 'presentation/utils/formatDate';
import {convertToReal} from 'presentation/utils';
import useBillCard from '../useBillCard';
import {BillCardProps} from '../bill-card.types';
import {
	BaloonAlert,
	BaloonContent,
	BaloonText,
	BarCode,
	BarCodeNumber,
	BarCodeTitle,
	BillPrice,
	BillSection,
	BillStatus,
	BillTitle,
	BoldText,
	CardItemPayment,
	ContentCard,
	CopyButton,
	DueDate,
} from './bill-card-desktop.styles';

const localTranslations = translations['pt-br'].myPaymentsPage;

const colors = {
	Aberto: 'primary',
	Vencido: 'orange',
	'Em Negociação': 'darkOrange',
};

export const BillCardDesktop = (props: BillCardProps) => {
	const {bill, pdf} = props;

	const {wasCopyButtonPressed, isDownloadLoading, copyBarCode, downloadBill} = useBillCard();

	const isLate: boolean = bill.status === 'Vencido';
	const isInNegotiation: boolean = bill.status === 'Em Negociação';
	const statusColor = colors[bill.status];

	const billData = bill.linhaDigitavel;

	return (
		<CardItemPayment
			data-testid="bill-card"
			isLate={isLate}
			topAccentcolor={statusColor}
			variant={'top-accent'}>
			<BillSection>
				<ContentCard isInNegotiation={isInNegotiation}>
					<BillTitle>{formatDate('M/yyyy', billData.dtVencimento)}</BillTitle>
					<BillPrice isLate={isLate} isInNegotiation={isInNegotiation}>
						{localTranslations.currencySymbol}&nbsp;
						<BoldText>{convertToReal(parseFloat(billData.vlObrigacao))}</BoldText>
					</BillPrice>
					<DueDate>
						{localTranslations.dueDate}&nbsp;
						{formatDate('dd/mm/yyyy', billData.dtVencimento)}
					</DueDate>
					{bill.status !== 'Em Negociação' && (
						<BillStatus isLate={isLate} isInNegotiation={isInNegotiation}>
							{bill.status}
						</BillStatus>
					)}
				</ContentCard>
				<BalloonUtil color={isInNegotiation ? '#F0402E' : '#F5821E'}>
					{!isInNegotiation && !isLate && (
						<BaloonContent>
							<BaloonAlert isInNegotiation={false}>
								{localTranslations.titleTicketPaid}
							</BaloonAlert>
							<BaloonText>{localTranslations.textTicketPaid}</BaloonText>
						</BaloonContent>
					)}

					{isInNegotiation && (
						<BaloonContent>
							<BaloonAlert isInNegotiation={true}>
								{localTranslations.titleTicketInNegotiation}
							</BaloonAlert>
							<BaloonText>
								{localTranslations.textTicketInNegotiation}&nbsp;
								{localTranslations.textTicketInNegotiationContinue}
							</BaloonText>
							<BaloonAlert isInNegotiation={true}>
								{localTranslations.footerTicketInNegotiation}
							</BaloonAlert>
						</BaloonContent>
					)}

					{isLate && (
						<BaloonContent>
							<BaloonAlert isInNegotiation={false}>
								{localTranslations.titleTicketLate}
							</BaloonAlert>
							<BaloonText>{localTranslations.textTicketLate}</BaloonText>
						</BaloonContent>
					)}
				</BalloonUtil>
			</BillSection>
			{!isInNegotiation && (
				<BillSection>
					<BarCode>
						<BarCodeTitle>{localTranslations.barCode}</BarCodeTitle>
						<BarCodeNumber> {billData.cdBarra}</BarCodeNumber>
						<CopyButton
							onClick={() => copyBarCode(billData.cdBarra)}
							color={wasCopyButtonPressed ? 'success' : 'primary'}>
							{wasCopyButtonPressed
								? localTranslations.barCodeButtonCopied
								: localTranslations.barCodeButtonCopy}
						</CopyButton>
					</BarCode>
					<Button
						rightIcon={<MdDownload />}
						isLoading={isDownloadLoading}
						onClick={() => downloadBill(pdf, bill.cdObrigacao)}>
						{localTranslations.downloadTicket}
					</Button>
				</BillSection>
			)}
		</CardItemPayment>
	);
};
