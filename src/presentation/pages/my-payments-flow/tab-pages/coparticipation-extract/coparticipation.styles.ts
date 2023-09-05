import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

interface SectionContainerProps {
	customMarginBottom?: number;
}

interface StyledTextProps {
	size?: number;
	weight?: number;
	color?: string;
}

export const Divider = styled.div`
	height: 1px;
	background-color: ${theme.colors.divider};
`;

export const Container = styled.div`
	background-color: ${theme.colors.white};
	border-radius: 16px;
	padding: 32px 40px;
	box-shadow: 0px 1px 8px 0 rgba(0, 0, 0, 0.15);
`;

export const CardTitle = styled.h1`
	font-size: 1.25rem;
	font-weight: 700;
	color: ${theme.colors.primary};
`;

export const SectionContainer = styled.section<SectionContainerProps>`
	margin-bottom: ${({customMarginBottom}) => customMarginBottom || 0}px;
`;

export const SectionDivisor = styled.div`
	height: 1px;
	background-color: ${theme.colors.divider};
	margin-bottom: 16px;
`;

export const DataWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 0px;

	&:last-child {
		padding-bottom: 0px;
	}
`;

export const DataText = styled.p<StyledTextProps>`
	font-size: ${({size}) => size || 1}rem;
	font-weight: ${({weight}) => weight || 400};
	color: ${({color}) => color || 'inherit'};
`;
