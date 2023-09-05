import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';
import {Card} from 'presentation/components/card';

type StatusProps = {
	isLate?: boolean;
	isInNegotiation?: boolean;
};

const getColor = (isLate: boolean, isInNegotiation: boolean) => {
	if (isLate) return theme.colors.secondary;
	if (isInNegotiation) return theme.colors['orange.1000'];
	if (!isLate && !isInNegotiation) return theme.colors.primary;
	return '';
};

export const CardItemPayment = styled(Card)<StatusProps>`
	height: auto;
	width: 342px;
	padding-bottom: ${props => (props.isInNegotiation ? '40px' : '24px')};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
`;

export const ContentCard = styled.div<StatusProps>`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-bottom: ${({isInNegotiation}) => isInNegotiation && '28px'};
`;

export const BillSection = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const BillTitle = styled.h4`
	color: ${theme.colors['gray.5']};
	font-weight: bold;
	font-size: 1.125rem;
`;

export const BoldText = styled.span`
	font-weight: 700;
`;

export const BillPrice = styled.p<StatusProps>`
	font-size: 2rem;
	font-weight: 300;
	color: ${({isLate, isInNegotiation}) => getColor(isLate, isInNegotiation)};
`;

export const DueDate = styled.span`
	color: ${theme.colors['gray.4']};
	font-size: 0.875rem;
	padding-top: 5px;
`;

export const BillStatus = styled.p<StatusProps>`
	font-size: 1.125rem;
	margin: 14px 0;
	font-weight: 700;
	color: ${({isLate, isInNegotiation}) => getColor(isLate, isInNegotiation)};
`;

export const BaloonContent = styled.div`
	width: 200px;
	display: grid;
	text-align: center;

	span:not(:last-child) {
		margin-bottom: 12px;
	}
`;

export const BaloonAlert = styled.span<StatusProps>`
	font-weight: 700;
	font-size: 1rem;
	color: ${({isInNegotiation}) => theme.colors[!isInNegotiation ? 'orange.500' : 'red.500']};
`;

export const BaloonText = styled.span`
	font-size: 0.875rem;
	color: ${theme.colors['gray.5']};
`;

export const BarCode = styled(Card)`
	width: 277px;
	margin: 30px 0;
	font-size: 0.875rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	justify-content: center;
`;

export const BarCodeTitle = styled.p`
	font-weight: 700;
`;

export const BarCodeNumber = styled.span`
	color: ${theme.colors['gray.4']};
	margin: 12px 0;
`;

export const CopyButton = styled(Button)`
	min-width: 144px;
`;
