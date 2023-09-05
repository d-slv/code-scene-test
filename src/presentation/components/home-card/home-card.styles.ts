import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import {Card} from '../card';

type DetailsProps = {
	spaceLeft?: boolean;
};

type TextProps = {
	textColor?: string;
};

type RightContentProps = {
	cutIcon?: boolean;
};

export const CardContainer = styled(Card)`
	height: 160px;
	padding: 16px 0px 0px 16px;
	width: 352px;
	display: flex;
	justify-content: space-between;
	position: relative;
	overflow: hidden;

	@media (max-width: 640px) {
		width: 336px;
	}

	@media (max-width: 1100px) {
		min-height: 160px;
		height: auto;
	}
`;

export const TitleCard = styled.h2`
	font-weight: 900;
	font-size: 1.125rem;
`;

export const LeftContent = styled.div`
	height: 100%;
`;

export const RightContent = styled.div<RightContentProps>`
	margin-right: ${props => props.cutIcon && '-20px'};
	padding-left: 10px;
	display: flex;
	align-items: center;
`;

export const ConfirmedSpan = styled.span`
	background-color: #f3ffea;
	color: ${theme.colors.success};
	font-weight: 700;
	padding: 8px 12px;
	border-radius: 500px;
	display: flex;
	align-items: center;

	p {
		margin: 0px;
		margin-right: 8px;
	}
`;

export const ContentCard = styled.div<TextProps>`
	font-size: 0.8125rem;
	color: ${props => props.textColor || theme.colors.primary};

	b {
		font-weight: 700;
		font-size: 0.875rem;
	}
`;

export const FooterCard = styled.div`
	position: absolute;
	bottom: 16px;
	left: 16px;
	padding-top: 10px;
	display: flex;
	align-items: center;
`;

export const Link = styled.p<DetailsProps>`
	cursor: pointer;
	font-size: 0.875rem;
	margin-left: ${props => (props.spaceLeft ? theme.spacing.size.xxxs.value : '0rem')};
	display: flex;
	align-items: center;

	svg {
		font-size: 1.125rem;
	}
`;
