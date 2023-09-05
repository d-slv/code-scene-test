import {MdKeyboardArrowRight, MdOutlineLocalPhone} from 'react-icons/md';
import styled from 'styled-components';

export const ArrowRightIcon = styled(MdKeyboardArrowRight)`
	display: flex;
	align-self: center;
	font-size: 2.188rem;
`;

export const PhoneRightIcon = styled(MdOutlineLocalPhone)`
	display: flex;
	align-self: center;
	font-size: 1.875rem;
	color: #f5821f;
`;

export const IconContainer = styled.div`
	color: ${props => props.theme.colors.primary};
	width: fit-content;
`;

interface CardContainerListProps {
	columns: number;
}

export const CardContainerList = styled.div<CardContainerListProps>`
	width: 100%;
	display: grid;
	padding: 5px;
	grid-template-columns: repeat(${props => props.columns}, 1fr);
	gap: 1.2rem;

	@media (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;

interface CardContainerProps {
	isChecked: boolean;
	variant: 'filled' | 'outlined';
	color?: string;
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
	transition: 0.3 ease-in-out;

	padding: 16px 32px;

	border: 1px solid ${props => (props.isChecked ? props.color : '#EDEDED')};

	box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
	border-radius: 16px;

	:hover {
		filter: brightness(0.98);
	}

	@media (max-width: 576px) {
		padding: 16px;
	}
`;

export const Content = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
