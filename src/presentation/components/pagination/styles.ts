import styled from 'styled-components';

export const PaginationContainer = styled.nav`
	display: flex;
	padding-top: 1.25rem;
	justify-content: center;

	ul {
		display: flex;
		list-style-type: none;
	}

	li {
		width: 2.5rem;
		height: 2.5rem;
		cursor: pointer;
		border-radius: 0.5rem;
		background: ${props => props.theme.colors.white};
		border: 1px solid ${props => props.theme.colors['gray.4']};

		display: flex;
		align-items: center;
		justify-content: center;

		&.actived {
			background: ${props => props.theme.colors.primary};

			a {
				color: ${props => props.theme.colors.white};
			}
		}

		+ li {
			margin-left: 0.625rem;
		}

		a {
			font-weight: 600;
			line-height: 1rem;
			font-size: 0.875rem;
			color: ${props => props.theme.colors['gray.4']};
		}
	}
`;
