import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

export const Container = styled.div<{fullWidth: boolean}>`
	display: flex;
	align-items: center;
	position: relative;
	width: ${props => (props.fullWidth ? '100%' : 'fit-content')};
`;

export const InputContainer = styled.button`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid ${theme.colors['primaryBlue.500']};
	padding: 0.5rem 1.2rem;
	border-radius: 2rem;
	background: ${theme.colors.white};
	width: fit-content;
	min-width: 9.9rem;

	@media (max-width: 640px) {
		min-width: 7.5rem;
	}
`;

export const SelectOptions = styled.ul<{isOpen: boolean}>`
	position: absolute;
	top: 100%;
	margin-top: 0.5rem;
	z-index: 2;
	display: ${props => (props.isOpen ? 'flex' : 'none')};
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid ${theme.colors['primaryBlue.500']};
	padding: 0rem 1.2rem;
	border-radius: 0.75rem;
	background: ${theme.colors.white};
	width: 100%;
`;

export const OptionItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
	cursor: pointer;
	-webkit-user-select: none; /* Safari */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
	width: 100%;

	transition: 0.3s;

	:hover {
		filter: opacity(0.8);
	}
`;

export const InputValue = styled.span`
	display: flex;
	color: ${theme.colors['primaryBlue.500']};
	font-family: Roboto;
	font-style: normal;
	font-weight: 500;
	font-size: 1rem;
	text-align: center;
	margin: 0 auto;
`;

export const InputIcon = styled.i<{isOpen: boolean}>`
	height: 0.5rem;
	width: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.4s;
	color: ${theme.colors['primaryBlue.500']};

	svg {
		transform: ${props => (props.isOpen ? 'rotate(90deg)' : 'rotate(-90deg)')};
		transition: all 0.3s ease;
	}
`;

const size = {
	lg: '0.875rem 2.625rem 0.875rem 1.625rem',
	sm: '0.5rem 2rem 0.45rem 1rem',
};
const sizeW = {
	sm: '10.9rem',
	lg: '16.5rem',
};
const mw = {
	sm: '10.9rem',
	lg: '30rem',
};

export const SelectContainer = styled.select<{sizeI: 'sm' | 'lg'; fullWidth: boolean}>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border: 1px solid ${theme.colors.primary};
	padding: ${props => size[props.sizeI]};
	border-radius: 0.5625rem;
	background: ${theme.colors.white};
	width: ${props => (props.fullWidth ? '100%' : 'fit-content')};
	min-width: ${props => sizeW[props.sizeI]};
	max-width: ${props => (props.fullWidth ? '100%' : mw[props.sizeI])};
	text-overflow: ellipsis;
	-webkit-appearance: none;

	color: ${theme.colors.primary};
	font-family: Roboto;
	font-style: normal;
	font-weight: 400;
	font-size: 0.875rem;
	margin: 0 auto;

	::placeholder {
		color: ${theme.colors['gray.4']};
	}

	:disabled {
		opacity: 0.5;
		cursor: not-allowed;

		i {
			opacity: 0.5;
		}
	}
`;

export const InputSelectIcon = styled.i`
	position: absolute;
	right: 0.5rem;
	height: 0.5rem;
	width: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.4s;
	color: ${theme.colors.primary};
	pointer-events: none;
	svg {
		transform: rotate(-90deg);
		transition: all 0.3s ease;
	}
`;
