import styled from 'styled-components';
import {Button} from 'presentation/components/button/button';

export const Container = styled.div`
	width: 11.625rem;
	display: flex;
	margin: 50px auto 50px auto;
	align-items: center;
	align-content: center;
	flex-direction: column;
	justify-content: center;

	svg {
		width: 55px;
		height: 55px;
		color: ${props => props.theme.colors.primary};
	}
`;

export const InfoContainer = styled.h3`
	font-weight: 600;
	font-size: 1.5rem;
	text-align: center;
	line-height: 2.125rem;
`;

export const ContainerButtons = styled.div`
	display: flex;

	@media (max-width: 640px) {
		flex-direction: column;

		button:last-of-type {
			margin-top: 1rem;
		}
	}
`;

export const ButtonFailure = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		svg {
			display: none;
		}
	}
`;

export const ModalContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;
