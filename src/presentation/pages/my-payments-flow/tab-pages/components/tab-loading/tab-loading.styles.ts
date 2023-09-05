import styled, {keyframes} from 'styled-components';

const FadeAnimation = keyframes`
  50% {
    opacity: 0.5
  }

  100% {
    opacity: 1
  }
`;

export const LogoContainer = styled.div`
	text-align: center;
	padding-top: 60px;
	animation-name: ${FadeAnimation};
	animation-duration: 1s;
	animation-iteration-count: infinite;
`;
