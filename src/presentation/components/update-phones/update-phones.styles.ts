import {AlertIcon} from 'presentation/components/icons/alert-icon';
import {Line} from 'presentation/components/icons/line';
import {PhoneIcon} from 'presentation/components/icons/phone-icon';
import {PlusCircleIcon} from 'presentation/components/icons/plus-circle-icon';
import styled from 'styled-components';
import {CellPhoneIcon} from '../icons/cell-phone-icon';

export const Component = styled.div`
	padding-top: 2.5rem;
	display: flex;
	flex-direction: column;

	width: 100%
	height: auto;

	background-color: #fff;

	 hr {
		opacity: 0.4;
		margin-top: 0.625rem;
	 }

	 @media (min-width: 320px) and (max-width: 480px) {		
		display: flex;
		flex-direction: column;
		align-items: center;

		h2 {
			text-align: center;
			font-size: 1.375rem;
		}

		p {
			text-align: center;
			font-size: 0.875rem;
			margin-top: 10px;
			margin-bottom: 30px;
		}

	 }

`;

export const Title = styled.h2`
	font-size: 1.5rem;
	color: ${props => props.theme.colors.primary};
	margin-bottom: 0.375rem;
`;

export const Message = styled.p`
	font-size: 0.875rem;
	color: ${props => props.theme.colors['gray.4']};
	margin-bottom: 1.875rem;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;

	@media (min-width: 320px) and (max-width: 480px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
`;

export const ListPhones = styled.div`
	height: 12.5rem;
	overflow-y: auto;
	overflow-x: hidden;

	@media (min-width: 320px) and (max-width: 480px) {
		height: 100%;
		max-height: 200px;
	}
`;

export const ContainerButtonNavigation = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	margin-top: 1.438rem;
`;

export const ContainerModal = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	button {
		margin-top: 0.75rem;
	}
`;

export const Separador = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: 1.25rem;
	margin-right: 1.25rem;

	p {
		margin-top: 0.438rem;
		margin-bottom: 0.438rem;
		font-weight: bold;
	}

	@media (min-width: 320px) and (max-width: 480px) {
		display: none;
	}
`;

export const Text = styled.p`
	font-size: 1.313rem;
	line-height: 1.813rem;
	margin-top: 1.25;
	margin-bottom: 0.313rem;
`;

export const NumberContainerModal = styled.div`
	display: flex;
	flex-direction: row;
	align-content: center;
	margin-bottom: 2.313rem;

	p {
		margin-top: -0.188rem;
		margin-left: 0.313rem;
	}
`;

export const NumberReview = styled.p`
	font-size: 1.313rem;
	line-height: 1.813rem;
	font-weight: 700;
`;

export const LineSeparator = styled(Line).attrs({
	width: 1,
	height: 61,
})``;

export const FormContainer = styled.div`
	p {
		font-size: 0.875rem;
	}

	/* @media (min-width: 320px) and (max-width: 480px) {
	} */
`;

export const IconCellPhone = styled(CellPhoneIcon).attrs({
	width: 15,
	height: 22,
})``;

export const IconPlusCircle = styled(PlusCircleIcon).attrs({
	width: 18,
	height: 18,
})``;

export const IconAlert = styled(AlertIcon).attrs({
	width: 64,
	height: 64,
})``;

// RadioButton
export const ContainerRadio = styled.label`
	display: flex;

	align-items: center;
	width: 17.188rem;

	border: 0.063rem solid ${props => props.theme.colors['gray.3']};
	background-color: ${props => props.theme.colors['gray.1']};

	border-radius: 0.7rem;
	color: ${props => props.theme.colors.black};
	padding-top: 0.563rem;
	padding-bottom: 0.563rem;

	margin-bottom: 0.438rem;
	margin-right: 0.625rem;

	cursor: pointer;

	svg {
		margin-right: 0.5rem;
	}

	@media (min-width: 320px) and (max-width: 480px) {
		display: flex;
		flex-direction: row;
		justify-content: center;

		margin-top: 9px;
		width: 15.5rem;
	}
`;

export const InputRadio = styled.input.attrs({type: 'radio'})`
	background-color: ${props => props.theme.colors['gray.2']};
	appearance: none;
	margin-left: 0.688rem;
	margin-right: 1.938rem;

	width: 1.5rem;
	height: 1.5rem;
	border: none; /*1px solid ${props => props.theme.colors['gray.3']};*/
	border-radius: 50%;
	transform: translateY(-0.075em);

	display: grid;
	place-content: center;

	:before {
		content: '';
		width: 0.95em;
		height: 0.95em;
		border-radius: 50%;
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		box-shadow: inset 1em 1em var(--form-control-color);
		background-color: ${props => props.theme.colors.secondary};
	}

	:checked::before {
		transform: scale(1);
	}
`;

export const IconPhone = styled(PhoneIcon).attrs({
	width: 16,
	height: 17,
})``;
