import styled from 'styled-components';
import {Card} from 'presentation/components/card';
import theme from 'presentation/styles/theme.styles';

export const MainContainer = styled(Card)`
	width: 100%;
	height: 100%;
	background: ${theme.colors.white};
	display: grid;
	grid-template-columns: 2% 96% 2%;

	@media (max-width: 820px) {
		grid-template-columns: 1fr;
	}
`;

export const TitlePage = styled.h2`
	text-align: center;
	font-weight: 500;
	font-size: 28px;
	line-height: 33px;
	padding: 1rem 0 1.125rem 0;
	color: ${theme.colors.black};
	grid-column: 1 / 4;

	@media (max-width: 820px) {
		grid-column: 1;
		font-size: 24px;
	}
`;

export const ContentContainer = styled.div`
	gap: 40px;
	display: flex;
	grid-column: 2;

	@media (max-width: 820px) {
		grid-column: 1;
		flex-direction: column;
	}
`;

export const CardContentPhones = styled(Card)`
	width: 100%;
	height: 100%;
	border-radius: 15px;
	border: 1px solid #00acd7;
	display: flex;
	flex-direction: column;
	padding-bottom: 40px;
`;

export const TitlePhoneCard = styled.h4`
	font-weight: 700;
	font-size: 18px;
	line-height: 23px;
	padding: 23px 30px 0 45px;
	color: ${theme.colors.primary};
`;

export const ContentPhoneCard = styled.p`
	font-size: 16px;
	line-height: 20px;
	margin-bottom: 12px;
	padding: 13px 0;
	margin: 0 30px 0 45px;
	border-bottom: 1px solid ${theme.colors['gray.2']};
	color: ${theme.colors['gray.4']};
`;
