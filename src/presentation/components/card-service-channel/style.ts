import theme from 'presentation/styles/theme.styles';
import styled from 'styled-components';
import {Button} from '../button/button';
import {Card} from '../card';

export const ContainerCardsService = styled.div`
	display: flex;
	padding: 0.125rem 0;

	@media (max-width: 820px) {
		margin-bottom: 9px;
	}
`;

export const CardServiceChannel = styled(Card)`
	width: auto;
	height: auto;
	min-width: 100%;
	max-width: 21.375rem;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1rem;
	text-align: center;

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-around;

	@media (max-width: 820px) {
		display: grid;
		align-items: flex-start;
		grid-template-columns: 0.5fr 3fr;
	}
`;

export const IconCard = styled.div`
	width: 1.625rem;
	height: 1.625rem;
	margin-bottom: 0.5rem;

	img {
		align-self: center;
		margin-bottom: 0.625rem;
	}

	@media (max-width: 820px) {
		display: grid;
		grid-column: 1;
		padding: 3px 0 0 5px;
		justify-content: flex-end;
	}
`;

export const InfoCard = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;

	@media (max-width: 820px) {
		align-items: stretch;
	}
`;

export const TitleCard = styled.h2`
	font-weight: 700;
	font-size: 16px;
	line-height: 1.188rem;
	align-items: baseline;

	@media (max-width: 820px) {
		display: grid;
		font-size: 14px;
		line-height: 18px;
		text-align: start;
	}
`;

export const ContentCard = styled.p`
	font-size: 14px;
	padding-top: 0.5rem;
	line-height: 1.125rem;
	font-weight: 300;
	color: ${theme.colors['gray.4']};
	text-align: center;
	margin-bottom: 0.625rem;

	@media (max-width: 820px) {
		display: grid;
		font-size: 12px;
		line-height: 15px;
		text-align: start;
	}
`;

export const ButtonCard = styled(Button)`
	width: 80%;
	font-weight: 600;

	@media (max-width: 820px) {
		width: 80%;
		display: grid;
		justify-self: center;
		grid-column: 1 / 4;
		align-content: center;
	}
`;
