import theme from 'presentation/styles/theme.styles';
import styled from 'styled-components';

export const SearchBar = styled.div`
	width: 20.5rem;
	height: 3.125rem;
	font-size: 0.938rem;
	line-height: 1.188rem;
	border-radius: 0.625rem;
	border: 1px solid #0054b8;
	color: ${theme.colors['gray.4']};

	display: flex;
	align-items: center;
	position: relative;
	overflow: hidden;

	input {
		height: 100%;
		width: 100%;
		border: none;
		border-radius: 0.625rem;
		padding-left: 1.3rem;
		padding-right: 3rem;
	}

	button {
		position: absolute;
		right: 0.5rem;
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid;
		font-size: 1.563rem;
		border-radius: 50%;
		color: ${theme.colors.white};
		background: ${theme.colors['primaryBlue.500']};

		display: flex;
		align-items: center;
		justify-content: center;
		@media (max-width: 640px) {
			font-size: 0.938rem;
			width: 1.8rem;
			height: 1.8rem;
		}

		@media screen and (min-width: 641px) and (max-width: 1024px) {
			font-size: 2rem;
		}
	}

	@media (max-width: 640px) {
		width: 100%;
		height: 2.375rem;
		font-size: 0.75rem;
		line-height: 0.938rem;
		margin-bottom: 0.938rem;
	}

	@media screen and (min-width: 641px) and (max-width: 1024px) {
		margin-bottom: 1.25rem;
	}

	@media screen and (min-width: 641px) and (max-width: 1024px) {
		height: 2.5rem;
		align-self: center;
	}
`;
