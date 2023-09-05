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

type StatusProps = {
	isLate?: boolean;
	isInNegotiation?: boolean;
	statusColor?: string;
};

export const BaseText = styled.p<BaseTextProps>`
	font-size: ${props => theme.font.size[props.fontSize || 'xs'].value};
	font-weight: ${props => theme.font.weight[props.fontWeight || 'regular'].value};
	color: ${props => theme.colors[props.color || 'gray.6']};
	line-height: ${props => props.lineHeight || '100%'};
	margin-bottom: ${props => theme.spacing.size[props.bottomSpace]?.value};
	display: ${props => (props.useInline ? 'inline' : 'block')};

	b {
		font-weight: ${theme.font.weight.bold.value};
	}
`;

export const CardItemPayment = styled.div<StatusProps>`
	background-color: ${theme.colors.white};
	border: ${theme.border.width.hairline.value} solid ${theme.colors.smooth};
	border-top: 0.75rem solid ${props => theme.colors[props.statusColor]};
	border-radius: 0.75rem;
	overflow: hidden;
	min-width: 19.375rem;
	padding: 0px 0px ${props => (props.isInNegotiation ? '16px' : '0px')};
	box-shadow: none;
	position: relative;
`;

export const CardLineHeader = styled.div`
	width: 100%;
	height: 0.75rem;
	background-color: ${theme.colors['primaryBlue.500']};
`;

export const CardButtonsContainer = styled.div`
	width: 100%;
	padding: 1rem 1.25rem;
	background-color: ${theme.colors['gray.8']};
	display: flex;
	justify-content: space-between;
	flex-direction: row;
`;

export const InfoContainer = styled.div`
	width: 100%;
	padding: 0.625rem 1rem 0;
	margin-bottom: 0.625rem;
`;

export const InfoHeader = styled.div`
	display: flex;
	justify-content: end;
	margin-bottom: ${theme.spacing.size.nano.value};
`;

export const InfoContent = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
`;

export const InfoPriceStatus = styled.div`
	text-align: center;
`;

export const CardStatus = styled(BaseText)`
	border: ${theme.border.width.hairline.value} solid ${theme.colors.smooth};
	border-radius: ${theme.border.radius.lg.value};
	padding: ${theme.spacing.size.quarck.value} ${theme.spacing.size.nano.value};
`;

export const InfoBox = styled.div<StatusProps>`
	position: absolute;
	display: grid;
	text-align: center;
	left: 0;
	right: 0;
	margin: 3px auto 0px;
	width: 90%;
	border: 1px solid gray;
	border-radius: ${theme.border.radius.nano.value};
	background-color: white;
	padding: 5px;
	font-size: ${theme.font.size.xxxs.value};

	.baloon-text:not(:last-of-type) {
		margin-bottom: ${theme.spacing.size.quarck.value};
	}

	.baloon-bold {
		font-weight: ${theme.font.weight.bold.value};
		font-size: ${theme.font.size.xxs.value};
		color: ${props => theme.colors[props.isLate ? 'red.500' : 'orange.500']};
	}
`;
