import {DoneIcon} from 'presentation/components/icons/done-icon';
import styled from 'styled-components';

export const ContainerStar = styled.div`
	display: inline-flex;
	margin-right: 3.125rem;
	cursor: pointer;

	:nth-last-child(1) {
		margin-right: 0px;
	}

	svg {
		width: 3.9rem;
		height: 4.313rem;
	}

	@media (min-width: 320px) and (max-width: 480px) {
		display: inline-flex;
		margin-right: 1.25rem;
		cursor: pointer;

		:nth-last-child(1) {
			margin-right: 0px;
		}

		svg {
			width: 2.063rem;
			height: 1.875rem;
		}
	}

	@media (min-width: 481px) and (max-width: 767px) {
		display: inline-flex;
		margin-right: 1.25rem;
		cursor: pointer;

		:nth-last-child(1) {
			margin-right: 0px;
		}

		svg {
			width: 2.063rem;
			height: 1.875rem;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		display: inline-flex;
		margin-right: 1.5rem;
		cursor: pointer;

		:nth-last-child(1) {
			margin-right: 0px;
		}

		svg {
			width: 2.063rem;
			height: 1.875rem;
		}
	}

	@media (min-width: 1024px) and (max-width: 1520px) {
		display: inline-flex;
		margin-right: 1.1rem;
		cursor: pointer;

		:nth-last-child(1) {
			margin-right: 0px;
		}

		svg {
			width: 4.2rem;
			height: 2.8rem;
		}
	}
`;

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	button {
		margin-top: 1.5rem;
	}
`;

export const ModalTitle = styled.h1`
	font-size: 2.5rem;
	font-weight: 700;
	text-align: center;
`;

export const Info = styled.p`
	font-size: 1.25rem;
	word-break: break-word;
	text-align: center;

	margin-top: 1.5rem;
	margin-bottom: 1.688rem;
`;

export const Divider = styled.hr`
	opacity: 0.4;
`;

export const TextReview = styled.p`
	text-align: center;
	font-size: 1.5rem;
	font-weight: 700;

	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
`;

export const StarsContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-bottom: 1.5rem;

	@media (min-width: 848px) and (max-width: 1440px) {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-bottom: 0.5rem;
	}
`;

export const Text = styled.p`
	font-size: 1.5rem;
	text-align: center;
	margin-bottom: 0.5rem;
`;

export const DateDoctor = styled.p`
	text-align: center;
	font-size: 1.25rem;
	font-weight: normal;
	margin-bottom: 0.5rem;
`;

export const Comment = styled.textarea`
	width: 100%;
	margin-top: 0.625rem;

	opacity: 0.4;
	font-size: 0.75rem;

	padding: 1.25rem 1.875rem 1.875rem 1.25rem;

	resize: none;

	border-radius: 0.438rem;
	border: 0.063rem solid ${props => props.theme.colors['gray.3']};

	background-color: ${props => props.theme.colors['gray.1']};
`;

export const DoneContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-bottom: 1rem;
`;

export const IconDone = styled(DoneIcon).attrs({
	width: 180,
	height: 180,
})``;

interface ContainerButtonCheckBoxProps {
	checked: boolean;
	// checked?: boolean;
}

export const ContainerButtonCheckBox = styled.button<ContainerButtonCheckBoxProps>`
	width: 100%;
	height: auto;
	display: flex;

	margin-top: 0.188rem;
	margin-bottom: 0.188rem;

	flex-direction: row;
	justify-content: start;
	align-items: center;
	text-align: left;
	border: 0.125rem solid
		${props => (props.checked ? props.theme.colors['primaryBlue.500'] : '#EDEDED')};
	background-color: ${props =>
		props.checked ? props.theme.colors['primaryBlue.500'] : props.theme.colors.white};
	padding: 0.625rem;
	border-radius: 0.813rem;
	min-width: 6.9rem;
	color: ${props =>
		props.checked ? props.theme.colors.white : props.theme.colors['primaryBlue.500']};
	font-weight: 600;
	font-size: 0.9375rem;

	span {
		margin-left: 30px;
		text-wrap: wrap;
	}

	p {
		font-size: 0.75rem;
		font-weight: normal;
		color: ${props =>
			props.checked ? props.theme.colors.white : props.theme.colors['gray.5']};
	}
`;

export const InputCheck = styled.input.attrs<ContainerButtonCheckBoxProps>({type: 'checkbox'})`
	width: 1.25rem;
	height: 1.25rem;
	position: fixed;
	margin-right: 20px;
	accent-color: ${props =>
		props.checked ? props.theme.colors.white : props.theme.colors['primaryBlue.500']};
`;

export const ContainerInfoMotivadores = styled.div`
	width: 100%;
	display: flex;

	margin-top: 0.188rem;
	margin-bottom: 0.188rem;

	flex-direction: row;
	justify-content: start;
	align-items: center;
	text-align: left;
	border: 0.125rem solid ${props => props.theme.colors['primaryBlue.500']};
	background-color: ${props => props.theme.colors['primaryBlue.500']};
	padding: 0.625rem;
	border-radius: 0.813rem;
	min-width: 6.9rem;
	color: ${props => props.theme.colors.white};
	font-weight: 600;
	font-size: 0.9375rem;

	span {
		margin-left: 0.875rem;
	}

	p {
		font-size: 0.75rem;
		font-weight: normal;
		color: ${props => props.theme.colors.white};
	}
`;
