import React from 'react';

import {CoparticipationExtract} from 'domain/usecases';
import {
	ClipboardPulseIcon,
	StethoscopeIcon,
	TeleconsultationIcon,
	ToothIcon,
} from 'presentation/components/icons';
import theme from 'presentation/styles/theme.styles';
import {ServiceTypesEnum} from 'presentation/constants/serviceTypesEnum';
import {
	Container,
	ContentWrapper,
	DescriptionWrapper,
	IconContainer,
	PriceValue,
	Title,
	Date,
} from './styles';

interface ExtractItemProps {
	item: CoparticipationExtract;
}

const iconVariants = {
	[ServiceTypesEnum.SAUDE]: {
		icon: <StethoscopeIcon width={24} height={24} fill={theme.colors.white} />,
		bgColor: '#002D87',
	},
	[ServiceTypesEnum.ODONTO]: {
		icon: <ToothIcon width={24} height={24} color={theme.colors.white} />,
		bgColor: theme.colors.primary,
	},
	[ServiceTypesEnum.EXAME]: {
		icon: <ClipboardPulseIcon width={24} height={24} color={theme.colors.white} />,
		bgColor: '#0093C4',
	},
	[ServiceTypesEnum.TELECONSULTA]: {
		icon: <TeleconsultationIcon width={24} height={24} color={theme.colors.white} />,
		bgColor: '#F5821F',
	},
};

export function ExtractItem({item}: ExtractItemProps) {
	return (
		<Container>
			<ContentWrapper>
				<IconContainer iconBg={iconVariants[item.servico].bgColor}>
					{iconVariants[item.servico].icon}
				</IconContainer>
				<DescriptionWrapper>
					<Title>{item.procedimentoRealizado}</Title>
					<Date>{item.dataEvento}</Date>
				</DescriptionWrapper>
			</ContentWrapper>
			<PriceValue>{item.valorParticipacao}</PriceValue>
		</Container>
	);
}
