import styled from 'styled-components';
import theme from '../../../styles/theme.styles';

export const Footer = styled.footer`
	display: grid;
	grid-area: 4 / 2;
	align-self: center;

	a {
		font-size: 1.125rem;
		line-height: 1.25rem;
		padding-top: 2.188rem;
		text-decoration: none;
		color: ${theme.colors.black};

		b {
			font-weight: 700;
			padding-left: 3px;
		}
	}

	@media (max-width: 640px) {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
`;
