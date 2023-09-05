import React from 'react';

import {translations} from 'presentation/translations';
import {formatDate} from 'presentation/utils/formatDate';
import {HistoryCardProps} from 'domain/usecases';
import {
	BoldText,
	CardItemHistory,
	CardPrice,
	CardTitle,
	ContentCard,
	DueDate,
	FooterCard,
} from './history-card-desktop.styles';

const localTranslations = translations['pt-br'].myPaymentsPage;

export const HistoryCardDesktop = (props: HistoryCardProps) => (
	<CardItemHistory>
		<ContentCard>
			<CardTitle>{formatDate('M/yyyy', props.dtVencimento)}</CardTitle>
			<CardPrice>
				{localTranslations.currencySymbol} <BoldText>{props.vlObrigacao}</BoldText>
			</CardPrice>
			<DueDate>
				<BoldText>{localTranslations.dueDate} </BoldText>
				{formatDate('dd/mm/yyyy', props.dtVencimento)}
			</DueDate>
			<DueDate>
				{localTranslations.paidIn}
				{''} <BoldText>{formatDate('dd/mm/yyyy', props.dtPagamento)}</BoldText>
			</DueDate>
			<FooterCard>{localTranslations.historyStatus}</FooterCard>
		</ContentCard>
	</CardItemHistory>
);
