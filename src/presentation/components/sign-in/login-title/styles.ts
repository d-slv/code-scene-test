import styled from 'styled-components';
import theme from '../../../styles/theme.styles';

export const Title = styled.h1`
	font-weight: 900;
	line-height: 2.419rem;
	display: grid;
	grid-area: 2 / 2;
	color: ${theme.colors.dark};

	@media (max-width: 640px) {
		font-size: 1.875rem;
		line-height: 2.688rem;
		padding-bottom: 1rem;
	}

	@media (min-width: 641px) and (max-width: 1023px) {
		font-size: 2.313rem;
	}

	@media (min-width: 1024px) {
		font-size: 2.688rem;
	}
`;
