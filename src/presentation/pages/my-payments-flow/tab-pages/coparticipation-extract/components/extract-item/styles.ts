import styled from 'styled-components';

interface IconContainerProps {
	iconBg: string;
}

export const Container = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 0px;

	&:last-child {
		padding-bottom: 0px;
	}
`;

export const IconContainer = styled.div<IconContainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	padding: 10px;
	background-color: ${({iconBg}) => iconBg};
`;

export const DescriptionWrapper = styled.div``;

export const ContentWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const Title = styled.h3`
	font-size: 1rem;
	font-weight: 600;
	color: ${({theme}) => theme.colors.dark};
`;

export const Date = styled.span`
	display: block;
	font-size: 0.875rem;
	font-weight: 600;
	color: ${({theme}) => theme.colors['gray.5']};
`;

export const PriceValue = styled.span`
	display: block;
	font-size: 1.125rem;
	font-weight: 600;
	color: ${({theme}) => theme.colors['gray.5']};
`;
