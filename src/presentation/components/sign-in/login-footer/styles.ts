import styled from 'styled-components';
import theme from '../../../styles/theme.styles';

export const Footer = styled.footer`
	display: grid;
	align-self: center;
	grid-area: 4 / 2;

	a {
		font-size: 1.125rem;
		line-height: 1.25rem;
		text-decoration: none;
		color: ${theme.colors.black};
		padding-top: 35px;

		b {
			font-weight: 700;
		}
	}

	@media (max-width: 640px) {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-around;
	}
`;

export const CreateAccount = styled.p`
	font-size: 1rem;
	line-height: 1.25rem;
	color: ${theme.colors['gray.4']};

	display: flex;
	justify-content: center;

	b {
		font-weight: 900;
		text-decoration: none;
		color: ${theme.colors['primaryBlue.500']};
		padding-left: 3px;
	}

	@media (max-width: 640px) {
	}
`;
