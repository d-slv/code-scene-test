import styled from 'styled-components';
import theme from '../../../styles/theme.styles';

export const Footer = styled.footer`
	display: grid;
	align-self: center;
	grid-area: 4 / 2;

	a {
		font-size: 1.125rem;
		line-height: 1.25rem;
		padding-top: 2.188rem;
		text-decoration: none;
		color: ${theme.colors.black};

		b {
			font-weight: 700;
			padding-left: 0.188rem;
		}
	}

	@media (max-width: 640px) {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
`;
