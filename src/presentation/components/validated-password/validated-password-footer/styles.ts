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
		padding-top: 2.188rem;

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
