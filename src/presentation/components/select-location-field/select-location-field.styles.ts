import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;
	position: relative;
`;

export const InputContainer = styled.button`
	position: relative;
	display: flex;
	align-items: center;
	border: 1px solid ${props => props.theme.colors['primaryBlue.500']};
	padding: 0.8125rem 0.875rem;
	border-radius: 0.563rem;
	background: ${props => props.theme.colors.white};
	width: fit-content;
	min-width: 16.25rem;

	@media (max-width: 640px) {
		width: 100%;
	}
`;

export const SelectOptions = styled.ul<{isOpen: boolean}>`
	position: absolute;
	top: 100%;
	margin-top: 1rem;
	z-index: 99999999;
	display: ${props => (props.isOpen ? 'flex' : 'none')};
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid ${props => props.theme.colors['primaryBlue.500']};
	padding: 0.8125rem 1.2rem;
	border-radius: 0.563rem;
	background: ${props => props.theme.colors.white};
	width: fit-content;
	min-width: 16.25rem;

	@media (max-width: 640px) {
		width: 100%;
	}
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
	color: ${props => props.theme.colors['gray.4']};
	font-size: 0.875rem;
	line-height: 1.125rem;
	margin: 0 auto 0 0;
`;

export const InputIcon = styled.i<{isOpen: boolean}>`
	font-size: 1.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.4s;
	color: ${props => props.theme.colors['primaryBlue.500']};

	svg {
		transform: ${props => (props.isOpen ? 'rotate(90deg)' : 'rotate(-90deg)')};
		transition: all 0.3s ease;
	}
`;
