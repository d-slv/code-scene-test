import {MdKeyboardArrowRight, MdCheckCircle} from 'react-icons/md';
import styled from 'styled-components';

export const ArrowRightIcon = styled(MdKeyboardArrowRight)`
	display: flex;
	align-self: center;
	font-size: 2.188rem;
`;

export const IconContainer = styled.div`
	color: ${props => props.theme.colors.primary};
	width: fit-content;
`;

export const CardContainerList = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;
export const CheckIcon = styled(MdCheckCircle)`
	position: absolute;
	top: 7px;
	right: 7px;
	font-size: 1rem;
`;

interface CardContainerProps {
	isChecked: boolean;
	variant: 'filled' | 'outlined';
}

export const CardContainer = styled.button<CardContainerProps>`
	width: 100%;
	background-color: ${props =>
		props.variant === 'filled' && props.isChecked
			? props.theme.colors.primary
			: props.theme.colors.white};
	color: ${props =>
		props.variant === 'filled' && props.isChecked
			? props.theme.colors.white
			: props.theme.colors.primary};
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: none;
	transition: 0.3 ease-in-out;

	padding: 1rem 1.56rem 1.06rem 1.875rem;

	border: 2px solid
		${props => (props.isChecked ? props.theme.colors.primary : props.theme.colors.light)};

	box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
	border-radius: 15px;

	:hover {
		filter: brightness(0.98);
	}
`;

export const Content = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

interface CardTypeOfConsultationProps {
	selected: boolean;
}

export const CardTypeOfConsultation = styled.button<CardTypeOfConsultationProps>`
	width: fit-content;
	height: 107px;
	font-weight: 600;
	font-size: 14px;
	line-height: 15px;
	border-radius: 10px;
	border: 1px solid ${props => props.theme.colors['primaryBlue.500']};
	background-color: ${props =>
		props.selected ? props.theme.colors['primaryBlue.500'] : props.theme.colors.white};
	color: ${props =>
		props.selected ? props.theme.colors.white : props.theme.colors['primaryBlue.500']};
	display: flex;
	align-content: center;
	align-items: center;
	flex-direction: row;

	position: relative;

	:hover {
		filter: brightness(0.97);
	}

	:last-of-type {
		margin-left: 1rem;
	}

	@media (max-width: 640px) {
		margin-top: 0.625rem;

		:last-of-type {
			margin-left: 0;
		}
	}
`;

export const ContentType = styled.div`
	display: flex;
	gap: 1rem;

	i {
		display: flex;
		padding-left: 1rem;
		align-content: center;
		align-items: center;
		width: 57px;
		height: 62px;
	}
`;

export const RightContentType = styled.div<CardTypeOfConsultationProps>`
	max-width: 240px;

	display: flex;
	flex-direction: column;
	padding-right: 8px;

	align-content: center;

	h3 {
		font-weight: 600;
		font-size: 18px;
		text-align: left;
	}

	p {
		padding-top: 6px;
		font-weight: 400;
		font-size: 12px;
		text-align: left;

		color: ${props =>
			props.selected ? props.theme.colors.white : props.theme.colors['gray.4']};
	}
`;
