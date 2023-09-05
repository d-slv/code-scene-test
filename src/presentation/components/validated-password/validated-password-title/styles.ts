import styled from 'styled-components';
import theme from '../../../styles/theme.styles';

export const ContainerInfo = styled.div`
	display: grid;
	grid-area: 2 / 2;

	@media (max-width: 640px) {
		padding-bottom: 0.938rem;
	}
`;

export const Title = styled.span`
	font-weight: 900;
	font-size: 2.688rem;
	line-height: 2.419rem;
	color: ${theme.colors.dark};

	@media (max-width: 640px) {
		font-size: 1.875rem;
	}

	@media (min-width: 641px) and (max-width: 1023px) {
		font-size: 2.313rem;
	}
`;

export const Subtitle = styled.p`
	font-weight: 600;
	font-size: 1.313rem;
	line-height: 1.625rem;
	padding-top: 0.813rem;
	color: ${theme.colors.black};

	p {
		width: 91%;
		padding-top: 0.813rem;
		font-weight: 400;
		font-size: 1.125rem;
		line-height: 1.438rem;

		@media (max-width: 640px) {
			width: 93%;
			padding-bottom: 0.313rem;
			font-size: 0.875rem;
			line-height: 1.125rem;
		}

		@media (min-width: 641px) and (max-width: 1023px) {
			font-size: 1rem;
		}
	}

	@media (max-width: 640px) {
		font-size: 1rem;
		line-height: 1.438rem;
	}

	@media (min-width: 640px) and (max-width: 1023px) {
		font-size: 1.125rem;
	}
`;
