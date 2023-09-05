import theme from 'presentation/styles/theme.styles';
import styled from 'styled-components';
import {Card} from '../card';

export const ContainerCardsService = styled.div`
	display: flex;
	padding: 0;
	cursor: pointer;

	@media (max-width: 768px) {
		margin-bottom: 10px;
	}
`;

export const CardListCategories = styled(Card)`
	min-width: 100%;
	max-width: 15.563rem;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1rem;
	margin-right: 1.875rem;
	text-align: left;

	display: flex;
	flex-direction: column;
	justify-content: start;

	@media (max-width: 768px) {
		padding: 15px 13px 10px 15px;
		margin: 0;
	}

	svg {
		align-self: center;
		margin-right: 0.625rem;
	}
`;

export const Title = styled.h1`
	font-weight: 500;
	font-size: 24px;
	line-height: 1.75rem;
	color: ${theme.colors.black};
	margin-bottom: 0.313rem;

	@media (max-width: 768px) {
		font-size: 16px;
		line-height: 19px;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;

		svg {
			justify-content: center;
		}
	}
`;

export const ContentItem = styled.ul`
	align-items: center;
	align-content: center;
	list-style: none;
	font-size: 1rem;
	font-weight: 500;
	line-height: 1rem;
	color: #575757;
`;

export const Item = styled.li`
	display: flex;
	align-items: center;
	align-self: center;
	color: #575757;
	margin-bottom: 0.5rem;

	:first-child {
		margin-top: 0.5rem;
	}

	:hover {
		h1 {
			color: ${theme.colors.black};
		}

		svg path {
			fill: ${theme.colors.primary};
		}
	}
`;

export const Link = styled.a`
	display: flex;
	text-decoration: none;
	align-items: center;
	cursor: pointer;

	font-size: 1rem;
	line-height: 1rem;
	color: inherit;

	@media (max-width: 768px) {
		font-size: 14px;
		color: #4b4b4b;

		svg {
			width: 21px;
			height: 21px;
		}
	}

	:hover {
		color: #0054b8;
	}
`;
