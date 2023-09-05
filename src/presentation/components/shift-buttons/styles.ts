import styled, {css} from 'styled-components';

import {weatherSunny} from '../icons/weather-sunny';
import {weatherNight} from '../icons/weather-night';
import {weatherSunset} from '../icons/weather-sunset';
import theme from '../../styles/theme.styles';

export const IconMorning = styled(weatherSunset).attrs({
	width: 27,
	height: 16,
})``;

export const IconAfternoon = styled(weatherSunny).attrs({
	width: 21,
	height: 24,
})``;

export const IconNight = styled(weatherNight).attrs({
	width: 19,
	height: 21,
})``;

export const ContainerPeriod = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2px;
`;

const colorMap = {
	M: theme.colors['primaryBlue.500'],
	T: theme.colors['orange.500'],
	N: theme.colors['SecondaryBlue.500'],
};

interface PeriodCardProps {
	isSelected: boolean;
	val: string;
}

export const PeriodCard = styled.button<PeriodCardProps>`
	border: none;
	width: 120px;
	height: 60px;
	font-size: 0.875rem;
	padding: 16px;
	background: ${theme.colors['gray.1']};
	cursor: pointer;

	display: flex;
	align-items: center;
	gap: 8px;

	@media (max-width: 640px) {
		width: 96px;
		height: 48px;
		font-size: 0.75rem;

		svg {
			height: 16px;
			width: 14px;
		}
	}

	:first-child {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}

	:last-child {
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	${props =>
		props.isSelected &&
		css`
			background: ${colorMap[props.val]};
			color: ${theme.colors.white};
		`}
`;
