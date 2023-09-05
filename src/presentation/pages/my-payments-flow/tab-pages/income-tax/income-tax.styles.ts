import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

type StatusProps = {
	isResponsive: boolean;
};

type BaseTextProps = {
	fontSize?: string;
	fontWeight?: string | number;
	color?: string;
	lineHeight?: string;
	bottomSpace?: string;
	useInline?: boolean;
};

type SectionDivisorProps = {
	backgroundColor?: string;
	bottomSpace: string;
};

export const IncomeTaxContainer = styled.div<StatusProps>`
	background-color: ${theme.colors.white};
	border-radius: ${theme.border.radius.md.value};
	box-sizing: border-box;
	padding: ${props => (props.isResponsive ? '0rem' : '2rem 2.5rem')};
	width: 100%;
	margin-bottom: 30px;
`;

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

export const SectionDivisor = styled.div<SectionDivisorProps>`
	height: 0.0625rem;
	width: 100%;
	background-color: ${props => props.backgroundColor || '#E8E8E8'};
	margin-bottom: ${props => theme.spacing.size[props.bottomSpace].value};
`;

export const PriceLine = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: ${theme.spacing.size.xxs.value};
	&:last-child {
		margin-bottom: ${theme.spacing.size.lg.value};
	}
`;

export const PriceNumber = styled(BaseText)`
	font-weight: ${theme.font.weight.bold.value};
	text-align: right;
	min-width: 5.5rem;
`;

export const ButtonContainer = styled.div<StatusProps>`
	width: 100%;
	display: flex;
	justify-content: ${props => (props.isResponsive ? 'center' : 'right')};
`;

export const IncomeTaxMobileDivisor = styled.div`
	height: 3px;
	width: 100%;
	background-color: ${theme.colors['gray.2']};
	border-radius: ${theme.border.radius.nano.value};
	margin-bottom: 30px;
`;
