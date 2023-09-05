import styled from 'styled-components';

import theme from 'presentation/styles/theme.styles';
import {Card} from '../card';

export const ContainerCardListResult = styled.div`
	display: flex;
	padding: 0;
	grid-column: 2;

	@media (max-width: 820px) {
		grid-column: 1;
	}
`;

export const CardListResult = styled(Card)`
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
`;

export const Title = styled.h1`
	font-weight: 500;
	font-size: 24px;
	line-height: 1.75rem;
	color: ${theme.colors.black};

	@media (max-width: 768px) {
		font-size: 16px;
		line-height: 19px;
		text-align: center;
	}
`;

export const ListItem = styled.div`
	font-size: 1rem;
	font-weight: 500;
	line-height: 1rem;
	width: 90%;
	padding: 1rem 0;

	border-bottom: 1px solid #ececec;
`;

export const ContentItem = styled.div`
	min-width: 100%;
	max-width: 15.563rem;
	border-radius: 11px;
`;

export const Item = styled.div`
	cursor: pointer;

	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;

	color: #575757;
	margin-bottom: 0.5rem;
`;

export const ButtonAccordion = styled.div`
	margin-right: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Text = styled.h3`
	font-size: 16px;
`;

export const TitleITem = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;

	padding: 1rem;
	min-width: 100%;
	max-width: 15.563rem;
	color: ${theme.colors.primary};
	background: ${theme.colors.white};

	border-radius: 11px;

	:hover {
		color: ${theme.colors.white};
		background: ${theme.colors.primary};
	}
`;

export const Resume = styled.p`
	width: 100%;
	padding: 0 3rem;
	font-size: 14px;
	line-height: 18px;
	color: #575757;
`;

export const Content = styled.div`
	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #ececec;

	svg {
		color: #bdbdbd;
	}
`;

export const LeftContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 12px 0;
`;

export const ContentTitle = styled.h2`
	font-weight: 500;
	font-size: 18px;
	line-height: 21px;

	@media (max-width: 768px) {
		font-size: 14px;
		line-height: 16px;
	}
`;

export const ContentResume = styled.p`
	padding-top: 8px;
	font-weight: 400;
	font-size: 12px;
	line-height: 15px;
	color: ${theme.colors['gray.4']};
`;
