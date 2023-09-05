import theme from 'presentation/styles/theme.styles';
import styled from 'styled-components';
import {Card} from '../card';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

export const ContentInfo = styled.div`
	min-width: 21.25rem;
	max-width: 21.25rem;

	margin-bottom: 19px;

	display: flex;
	flex-direction: row;
	align-items: center;

	p {
		color: #000;
		font-size: 1rem;
	}

	span {
		width: 34px;
		padding: 3px;
		font-size: 0.75rem;
		margin-left: 9px;
		text-align: center;
		border-radius: 10px;
		color: #fff;
		background-color: #c93600;
	}
`;

export const CardContainer = styled(Card)`
	height: 9.063rem;
	min-width: 21.25rem;
	max-width: 21.25rem;
	/* margin: 0.125rem 0 0.125rem 1.875rem; */

	display: flex;

	:first-of-type {
		margin: 0.125rem 0;
	}

	@media (max-width: 640px) {
		min-width: 19.375rem;
		max-width: 19.375rem;
	}
	overflow: hidden;
`;

export const TitleCard = styled.h3`
	width: 16rem;
	font-weight: 900;
	font-size: 0.938rem;
	line-height: 1.313rem;
`;

export const ContentCard = styled.p`
	width: 15rem;
	text-align: justify;
	font-size: 0.75rem;
	padding-top: 0.5rem;
	line-height: 0.938rem;
	color: ${theme.colors['gray.4']};
`;

export const FooterCard = styled.div`
	padding-top: 0.875rem;

	display: flex;
	align-items: center;

	button {
		padding: 0.375rem 0.438rem 0.375rem 0.438rem;
		width: 8.125rem;
		font-size: 0.75rem;
	}
`;

export const LeftContent = styled.div`
	width: 80%;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

export const RightContent = styled.div`
	width: 20%;

	display: flex;
	align-items: center;
	justify-content: flex-end;

	svg {
		font-size: 5rem;
		margin-right: -1.9rem;
	}
`;

export const Details = styled.p`
	cursor: pointer;
	font-size: 0.875rem;
	line-height: 1rem;
	padding-left: 1rem;

	display: flex;
	align-items: center;

	svg {
		font-size: 1.125rem;
	}
`;
