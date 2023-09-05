import React from 'react';

import {translations} from 'presentation/translations';
import {HistoryCardProps} from 'domain/usecases';
import {
	BaseText,
	BoldText,
	CardSideLine,
	CardStatus,
	HistoryCardContainer,
	InfoContent,
	InfoMonthStatus,
	InfoPriceStatus,
} from './history-card-mobile.styles';

const localTranslations = translations['pt-br'].myPaymentsPage;

export function HistoryCardMobile(props: HistoryCardProps) {
	return (
		<HistoryCardContainer>
			<CardSideLine />
			<InfoContent>
				<InfoMonthStatus>
					<BaseText color="gray.5" bottomSpace="micro">
						<BoldText>{props.mes}</BoldText>
					</BaseText>
					<CardStatus color="white" lineHeight="16px" fillColor="success" fontSize="xxs">
						{localTranslations.historyStatus}
					</CardStatus>
				</InfoMonthStatus>

				<InfoPriceStatus>
					<BaseText color="success" bottomSpace="micro">
						<BoldText>
							{localTranslations.currencySymbol} {props.vlObrigacao}
						</BoldText>
					</BaseText>
					<BaseText color="gray.5" fontSize="xxs">
						{localTranslations.paidIn}&nbsp;<BoldText>{props.dtPagamento}</BoldText>
					</BaseText>
				</InfoPriceStatus>
			</InfoContent>
		</HistoryCardContainer>
	);
}
