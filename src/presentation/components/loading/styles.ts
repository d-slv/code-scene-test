import styled, {css} from 'styled-components';

interface LoadingProps {
	fullscreen: boolean;
}

export const LoadingContainer = styled.div<LoadingProps>`
	justify-content: center;
	flex-direction: column;
	align-items: center;
	display: flex;
	height: 100%;
	width: 100%;

	${({fullscreen}) =>
		fullscreen &&
		css`
			background-color: ${({theme}) => theme.colors.white};
			position: fixed;
			height: 100vh;
			width: 100vw;
			z-index: 2;
			left: 0;
			top: 0;
		`}
`;

export const LoadingLogo = styled.svg`
	path {
		animation: blinker ease-in 1s infinite;

		@keyframes blinker {
			0% {
				opacity: 1;
			}

			50% {
				opacity: 0.1;
			}

			100% {
				opacity: 1;
			}
		}
	}
`;

export const LoadingText = styled.p`
	color: ${props => props.theme.colors['gray.4']};
	animation: blinker ease-in 1s infinite;
	font-size: 1.125rem;
	margin-top: 16px;

	@keyframes blinker {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.1;
		}

		100% {
			opacity: 1;
		}
	}
`;
