import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

type BaseTextProps = {
	fontSize?: string;
	fontWeight?: string | number;
	color?: string;
	lineHeight?: string;
	bottomSpace?: string;
	useInline?: boolean;
};

type CardStatusProps = {
	fillColor?: string;
};

export const BaseText = styled.p<BaseTextProps>`
	font-size: ${props => theme.font.size[props.fontSize || 'xs'].value};
	font-weight: ${props => theme.font.weight[props.fontWeight || 'regular'].value};
	color: ${props => theme.colors[props.color || 'gray.6']};
	line-height: ${props => props.lineHeight || '100%'};
	margin-bottom: ${props => theme.spacing.size[props.bottomSpace]?.value};
	display: ${props => (props.useInline ? 'inline' : 'block')};
`;

export const BoldText = styled.span`
	font-weight: 700;
`;

export const HistoryCardContainer = styled.div`
	background-color: ${theme.colors.white};
	border: 1px solid ${theme.colors.smooth};
	border-radius: 12px;
	overflow: hidden;
	min-width: 296px;
	height: 80px;
	display: flex;
	flex-direction: row;
`;

export const CardSideLine = styled.div`
	width: 12px;
	height: 100%;
	background-color: ${theme.colors.success};
`;

export const InfoHeader = styled.div`
	display: flex;
	justify-content: end;
	margin-bottom: 8px;
`;

export const InfoContent = styled.div`
	width: 100%;
	padding: 12px;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
`;

export const InfoMonthStatus = styled.div``;

export const InfoPriceStatus = styled.div`
	text-align: right;
`;

export const CardStatus = styled(BaseText)<CardStatusProps>`
	background-color: ${({fillColor}) => (fillColor ? theme.colors[fillColor] : 'none')};
	border-radius: 24px;
	padding: 2px 20px;
	width: fit-content;
	text-align: center;
`;
