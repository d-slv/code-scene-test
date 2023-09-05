import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import {Card} from 'presentation/components/card';

interface TextColorProps {
	primary?: boolean;
}

export const CardItemHistory = styled(Card)`
	height: 175px;
	min-width: 325px;
	position: relative;

	@media (max-width: 640px) {
		min-width: 280px;
	}
`;

export const FooterCard = styled.footer`
	width: 122px;
	height: 25px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${theme.colors.success};
	color: ${theme.colors.white};
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
	position: absolute;
	bottom: 0;
`;

export const ContentCard = styled.div<TextColorProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const CardTitle = styled.h4`
	color: ${theme.colors['gray.4']};
	font-weight: 700;
	font-size: 1.125rem;
`;

export const CardPrice = styled.p<TextColorProps>`
	font-size: 2rem;
	font-weight: 300;
	color: ${({primary}) => (primary ? '' : '#71BA3C')};
`;

export const BoldText = styled.span`
	font-size: inherit;
	color: inherit;
	font-weight: 700;
`;

export const DueDate = styled.span`
	color: ${theme.colors['gray.4']};
	font-size: 0.875rem;
	margin-top: 5px;
`;
