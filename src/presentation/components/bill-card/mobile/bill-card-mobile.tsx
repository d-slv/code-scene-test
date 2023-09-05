import React, {useState} from 'react';
import {translations} from 'presentation/translations';
import {InfoIcon} from 'presentation/components/icons';
import {formatDate} from 'presentation/utils/formatDate';
import {Button} from 'presentation/components/button/button';
import {convertToReal} from 'presentation/utils';
import {MdDownload} from 'react-icons/md';
import useBillCard from '../useBillCard';
import {BillCardProps} from '../bill-card.types';
import {
	BaseText,
	CardButtonsContainer,
	CardItemPayment,
	CardStatus,
	InfoBox,
	InfoContainer,
	InfoContent,
	InfoHeader,
	InfoPriceStatus,
} from './bill-card-mobile.styles';

const localTranslations = translations['pt-br'].myPaymentsPage;

const colors = {
	Aberto: 'primary',
	Vencido: 'secondary',
	'Em Negociação': 'orange.1000',
};

export const BillCardMobile = (props: BillCardProps) => {
	const {bill, pdf} = props;
	const {wasCopyButtonPressed, isDownloadLoading, copyBarCode, downloadBill} = useBillCard();

	const [isInfoBoxActive, setIsInfoBoxActive] = useState(false);

	const isLate: boolean = bill.status === 'Vencido';
	const isInNegotiation: boolean = bill.status === 'Em Negociação';
	const statusColor = colors[bill.status];

	const billData = bill.linhaDigitavel;

	const handleOpenInfoBox = () => {
		setIsInfoBoxActive(true);
		setTimeout(() => setIsInfoBoxActive(false), 4000);
	};

	return (
		<CardItemPayment
			data-testid="bill-card"
			isLate={isLate}
			isInNegotiation={isInNegotiation}
			statusColor={statusColor}>
			{isInfoBoxActive && (
				<InfoBox>
					{!isLate && !isInNegotiation && (
						<>
							<span className="baloon-text baloon-bold">
								{localTranslations.titleTicketPaid}
							</span>
							<span className="baloon-text">{localTranslations.textTicketPaid}</span>
						</>
					)}

					{isInNegotiation && (
						<>
							<span className="baloon-text baloon-bold">
								{localTranslations.titleTicketInNegotiation}
							</span>
							<span className="baloon-text">
								{localTranslations.textTicketInNegotiation}
							</span>
						</>
					)}

					{isLate && (
						<>
							<span className="baloon-text baloon-bold">
								{localTranslations.titleTicketLate}
							</span>
							<span className="baloon-text">{localTranslations.textTicketLate}</span>
						</>
					)}
				</InfoBox>
			)}

			<InfoContainer>
				<InfoHeader onClick={handleOpenInfoBox}>
					<InfoIcon width={13.13} height={13.13} />
				</InfoHeader>

				<InfoContent>
					<div>
						<BaseText fontWeight="bold" color="gray.5" bottomSpace="micro">
							{formatDate('M/yyyy', billData.dtVencimento)}
						</BaseText>
						<BaseText color="gray.5" fontSize="xxxs">
							{localTranslations.dueDate}&nbsp;
							{formatDate('dd/mm/yyyy', billData.dtVencimento)}
						</BaseText>
					</div>
					<InfoPriceStatus>
						<BaseText fontWeight="bold" color={statusColor} bottomSpace="nano">
							{localTranslations.currencySymbol}&nbsp;
							{convertToReal(billData.vlObrigacao)}
						</BaseText>
						<CardStatus color={statusColor} fontSize="xxxs">
							{bill.status}
						</CardStatus>
					</InfoPriceStatus>
				</InfoContent>
			</InfoContainer>

			{!isInNegotiation && (
				<CardButtonsContainer>
					<Button
						spacingInsetX={wasCopyButtonPressed ? 'xs' : 'nano'}
						fontSize="xxs"
						fontWeight="regular"
						transition={false}
						onClick={() => copyBarCode(billData.cdBarra)}
						color={wasCopyButtonPressed ? 'success' : 'primary'}>
						{wasCopyButtonPressed
							? `${localTranslations.barCodeButtonCopied}!`
							: localTranslations.barCodeButtonCopy}
					</Button>
					<Button
						spacingInsetX="nano"
						fontSize="xxs"
						fontWeight="regular"
						variant="outlined"
						rightIcon={<MdDownload />}
						isLoading={isDownloadLoading}
						onClick={() => downloadBill(pdf, bill.cdObrigacao)}>
						{localTranslations.downloadTicketAlternative}
					</Button>
				</CardButtonsContainer>
			)}
		</CardItemPayment>
	);
};
