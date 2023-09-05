import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';
import {weatherSunny} from 'presentation/components/icons/weather-sunny';
import {weatherNight} from 'presentation/components/icons/weather-night';
import {weatherSunset} from 'presentation/components/icons/weather-sunset';

export const MainTitle = styled.h2`
	font-weight: 600;
	font-size: 1.75rem;
	line-height: 2.2rem;
	margin-bottom: 1rem;
`;

export const CardStepPageTile = styled.h3`
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 1.875rem;
	margin-bottom: 0.5rem;

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const CardStepPageDescription = styled.p`
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 1.1rem;
	margin-bottom: 1.875rem;
	color: ${theme.colors['gray.4']};

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;

	@media (max-width: 1024px) {
		flex-direction: column;
		justify-content: center;
	}
`;

export const ContainerInfo = styled.div`
	@media (max-width: 640px) {
		padding-bottom: 1.125rem;
	}

	@media screen and (min-width: 641px) and (max-width: 964px) {
		padding-right: 3.125rem;
	}
`;

export const ContentInfoTitle = styled.h4`
	font-weight: 700;
	font-size: 1.125rem;
	line-height: 1.438rem;

	@media (max-width: 640px) {
		font-size: 1rem;
		line-height: 1.25rem;
	}
`;

export const ContentInfo = styled.p`
	font-size: 0.875rem;
	line-height: 1.125rem;
	color: ${theme.colors['gray.4']};

	span {
		color: ${theme.colors['primaryBlue.500']};

		@media screen and (min-width: 641px) and (max-width: 964px) {
			display: flex;
			flex-direction: column;
		}
	}

	@media (max-width: 640px) {
		font-size: 0.75rem;
		line-height: 0.938rem;
	}
`;

export const SearchBar = styled.div`
	width: 20.5rem;
	height: 3.125rem;
	font-size: 0.938rem;
	line-height: 1.188rem;
	padding-left: 1.25rem;
	border-radius: 0.625rem;
	border: 1px solid #0054b8;
	color: ${theme.colors['gray.4']};

	display: flex;
	align-items: center;
	justify-content: space-between;

	i {
		padding: 0.5rem;
		border: 1px solid;
		font-size: 1.563rem;
		margin-right: 0.313rem;
		border-radius: 3.125rem;
		color: ${theme.colors.white};
		background: ${theme.colors['primaryBlue.500']};

		display: flex;
		align-self: center;

		@media (max-width: 640px) {
			font-size: 0.938rem;
			border-radius: 1.25rem;
		}

		@media screen and (min-width: 641px) and (max-width: 1024px) {
			font-size: 1.125rem;
			border-radius: 1.438rem;
		}
	}

	@media (max-width: 640px) {
		width: 100%;
		height: 2.375rem;
		font-size: 0.75rem;
		line-height: 0.938rem;
		margin-bottom: 0.938rem;
	}

	@media screen and (min-width: 641px) and (max-width: 1024px) {
		margin-bottom: 1.25rem;
	}

	@media screen and (min-width: 641px) and (max-width: 1024px) {
		height: 2.5rem;
		align-self: center;
	}
`;

export const ContainerCommon = styled.div`
	display: flex;

	@media (max-width: 640px) {
		justify-content: center;
	}
`;

export const ContainerCalendar = styled.div`
	width: 100%;
	height: 21.25rem;
	text-align: center;
	background: seashell;
`;

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

	@media (max-width: 700px) {
		justify-content: center;
	}
`;

export const PeriodCard = styled.div`
	width: 7.375rem;
	height: 3.125rem;
	line-height: 1rem;
	font-size: 0.875rem;
	padding-left: 1.625rem;
	padding-right: 1.375rem;
	background: ${theme.colors['gray.1']};
	cursor: pointer;

	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 640px) {
		width: 5.875rem;
		height: 2.938rem;
		font-size: 0.75rem;
		line-height: 0.875rem;
		padding-left: 1.125rem;
		padding-right: 0.938rem;

		svg {
			height: 1rem;
			width: 0.875rem;
			margin-right: 0.5rem;
		}
	}

	:first-child {
		padding-left: 1rem;
		margin-right: 0.094rem;
		border-top-left-radius: 0.625rem;
		border-bottom-left-radius: 0.625rem;

		@media (max-width: 640px) {
			padding-left: 0.75rem;
			padding-right: 1.125rem;

			svg {
				width: 1.25rem;
				height: 0.75rem;
			}
		}
	}

	:last-child {
		margin-left: 0.094rem;
		padding-left: 1.688rem;
		border-top-right-radius: 0.625rem;
		border-bottom-right-radius: 0.625rem;

		@media (max-width: 640px) {
			padding-left: 1.25rem;
			padding-right: 1.125rem;

			svg {
				width: 0.875rem;
				height: 0.938rem;
			}
		}
	}
`;

export const DoubleButtons = styled.div`
	display: flex;

	@media (max-width: 640px) {
		flex-direction: column;
	}
`;

export const ButtonScheduleOdonto = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		svg {
			display: none;
		}
	}
`;

export const ButtonNavigationScheduleOdonto = styled(ButtonScheduleOdonto)`
	margin-left: 1.125rem;

	@media (max-width: 640px) {
		display: none;
	}
`;

export const FooterCard = styled.div`
	display: flex;
	justify-content: space-between;

	margin-top: 2.375rem;
	padding: 3rem 0 1.25rem;

	border-top: 1px solid #bebebe;

	@media (max-width: 640px) {
		text-align: center;
		flex-direction: column;
		padding: 1.438rem 0 0 0;

		button {
			margin-left: auto;
			margin-right: auto;
		}
	}
`;

export const FooterCardButtons = styled(FooterCard)`
	@media (max-width: 640px) {
		flex-direction: column-reverse;

		button:nth-of-type(1) {
			margin-top: 15px;
		}
	}
`;
