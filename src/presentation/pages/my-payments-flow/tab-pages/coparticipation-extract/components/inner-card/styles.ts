import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

export const Container = styled.div`
	background-color: ${theme.colors.background};
	padding: 16px 24px 24px;
	border-radius: 8px;
`;

export const Title = styled.h2`
	font-size: 0.875rem;
	font-weight: 700;
	color: ${theme.colors['gray.5']};
	text-transform: uppercase;
`;
