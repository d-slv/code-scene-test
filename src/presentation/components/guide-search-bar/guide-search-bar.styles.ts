import {PlanTypeEnum} from 'presentation/constants/bookingTypesEnum';
import styled from 'styled-components';

interface SeachBarProps {
	type?: PlanTypeEnum;
}

interface ButtonProps {
	variant?: PlanTypeEnum;
}

export const SearchBar = styled.div<SeachBarProps>`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	border-radius: 15px;
	transition: all 0.3s ease-out;
	color: ${props => props.theme.colors.white};
	background: ${props =>
		props.type === PlanTypeEnum.HEALTH
			? props.theme.colors.primary
			: props.theme.colors['orange.400']};

	@media (max-width: 870px) {
		align-items: center;
	}
`;

export const Header = styled.h3`
	font-weight: 400;
	font-style: normal;
	font-size: 1.875rem;

	@media (max-width: 870px) {
		text-align: center;
	}
`;

export const Subtitle = styled.p`
	font-weight: 400;
	font-size: 0.875rem;
	font-style: normal;
	margin-bottom: 16px;
	margin-top: 8px;
	color: rgba(255, 255, 255, 1);
`;

export const SubHeader = styled.h4`
	font-weight: 400;
	font-size: 1.25rem;
	font-style: normal;
	padding-bottom: 0.625rem;
`;

export const SearchQueries = styled.p`
	font-weight: 400;
	font-size: 1rem;
	font-style: normal;
	margin-bottom: 16px;
	text-align: center;
`;

export const ContentSelects = styled.div<SeachBarProps>`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	width: 100%;
	gap: 16px;
	align-items: flex-end;

	div {
		select {
			border: none;
			font-size: 0.813rem;
			color: ${props => props.theme.colors['gray.5']};
		}

		i {
			color: ${props => props.theme.colors.primary};
		}
	}

	@media (min-width: ${({type}) => (type === PlanTypeEnum.ODONTO ? '1500px' : '1388px')}) {
		grid-auto-flow: column;
	}

	@media (max-width: 870px) {
		display: flex;
		flex-direction: column;
		max-width: 70%;
	}
`;

export const Button = styled.button<ButtonProps>`
	justify-self: start;
	border: none;
	color: #fff;
	display: flex;
	min-width: 30px;
	min-height: 30px;
	border-radius: 50%;
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.colors.white};
	background-color: ${props =>
		props.variant === PlanTypeEnum.HEALTH
			? props.theme.colors['green.500']
			: props.theme.colors.primary};

	@media (max-width: 870px) {
		width: 100%;
		border-radius: 16px;
	}
`;

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const SearchByProviderInput = styled.input`
	font-style: normal;
	font-weight: 400;
	font-size: 0.875rem;

	background-color: ${({theme}) => theme.colors.white};
	padding: 6px 16px;
	border-radius: 8px;
	border: none;
	width: 100%;

	::placeholder {
		font-family: Roboto;
		color: ${({theme}) => theme.colors['gray.4']};
		font-style: normal;
		font-weight: 400;
		font-size: 0.8125rem;
	}

	:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;
