import styled from 'styled-components';
import {Card} from 'presentation/components/card';
import theme from 'presentation/styles/theme.styles';
import img from 'presentation/assets/images/overbooking.png';
import {TeleconsultationIcon} from 'presentation/components/icons/teleconsultation-icon';

export const MainTitle = styled.h2`
	font-weight: 600;
	font-size: 1.75rem;
	line-height: 2.2rem;
	margin-bottom: 1rem;
`;

export const OverBookingCard = styled(Card)`
	gap: 3.125rem;
	display: grid;
	padding: 0 3.125rem 0 0;
	background: ${theme.colors.primary};
	grid-template-columns: 40% 55% 5%;

	@media (max-width: 640px) {
		padding: 0 1rem;
		grid-template-columns: 1fr;
	}
`;

export const ImageCard = styled.div`
	width: auto;
	height: 100%;
	background-repeat: no-repeat;
	background-image: url(${img});

	@media (max-width: 640px) {
		background-image: none;
	}
`;

export const ContentCard = styled.div`
	padding-top: 5.625rem;
	padding-bottom: 3.75rem;
	color: ${theme.colors.white};

	h1 {
		font-size: 4rem;
		font-weight: 900;
		line-height: 4rem;
		text-transform: uppercase;

		@media (max-width: 640px) {
			font-size: 2.5rem;
			text-align: center;
			line-height: 2.5rem;
			padding: 0.625rem 0;
		}
	}

	p {
		font-weight: 500;
		line-height: 2rem;
		font-size: 1.375rem;
		padding-top: 0.625rem;

		@media (max-width: 640px) {
			text-align: center;
			font-size: 1.125rem;
			line-height: 1.125rem;
		}
	}
`;

export const RoundedIcon = styled.div`
	width: 3.875rem;
	height: 3.875rem;
	border-radius: 50%;
	background: ${theme.colors.white};

	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 640px) {
		margin-left: auto;
		margin-right: auto;
	}
`;

export const ConsultationOnline = styled(TeleconsultationIcon).attrs({
	width: 33,
	height: 22,
})``;

export const FooterButtons = styled.div`
	display: flex;
	padding-top: 2.75rem;
	justify-content: space-between;

	button {
		text-transform: uppercase;

		:first-of-type {
			background: white;
			color: ${theme.colors.primary};
		}
	}
`;
