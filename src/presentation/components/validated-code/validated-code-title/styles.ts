import styled from 'styled-components';
import theme from '../../../styles/theme.styles';

export const ContainerInfo = styled.div`
	display: grid;
	grid-area: 2 / 2;
`;

export const Title = styled.h2`
	font-weight: 900;
	font-size: 2.625rem;
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
	width: 85%;
	font-weight: 600;
	font-size: 1.313rem;
	line-height: 1.625rem;
	padding-top: 0.813rem;
	color: ${theme.colors.black};

	@media (max-width: 640px) {
		width: 76%;
		font-size: 1rem;
	}
`;

export const ContactsList = styled.ul`
	list-style: none;
	padding-bottom: 0.813rem;
	color: ${theme.colors.black};

	display: grid;

	li {
		font-weight: 400;
		line-height: 1.625rem;
	}

	@media (max-width: 640px) {
		font-size: 1rem;
		padding-top: 0.625rem;
	}

	@media (min-width: 1024px) {
		font-size: 1.313rem;
		line-height: 2.063rem;
	}
`;
