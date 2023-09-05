import styled from 'styled-components';

interface ContainerButtonProps {
	isChecked: boolean;
}

export const ContainerButton = styled.button<ContainerButtonProps>`
	border: 1px solid
		${props =>
			props.isChecked
				? props.theme.colors['primaryBlue.500']
				: props.theme.colors['orange.500']};
	display: flex;
	background-color: ${props =>
		props.isChecked ? props.theme.colors['primaryBlue.500'] : props.theme.colors.white};
	display: flex;
	align-items: center;
	width: fit-content;
	padding: 0.875rem 1.1875rem 0.75rem;
	border-radius: 2rem;
	min-width: 6.9rem;
	color: ${props =>
		props.isChecked ? props.theme.colors.white : props.theme.colors['primaryBlue.500']};
	font-weight: 600;
	font-size: 0.9375rem;

	span {
		margin: 0 auto;
	}
`;

export const InputIcon = styled.i<ContainerButtonProps>`
	height: 1rem;
	width: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	transition: 0.4s;
	color: ${props => props.theme.colors.white};
	margin-left: 0.5rem;
`;
