import styled from 'styled-components';
import theme from '../../../styles/theme.styles';

export const Title = styled.span`
	width: 80%;
	font-weight: 900;
	line-height: 2.419rem;
	color: ${theme.colors.dark};

	display: grid;
	grid-area: 2 / 2;

	@media (max-width: 640px) {
		width: 70%;
		font-size: 1.875rem;
	}

	@media (min-width: 640px) and (max-width: 1023px) {
		font-size: 1.875rem;
	}

	@media (min-width: 1024px) {
		font-size: 2.688rem;
	}
`;
