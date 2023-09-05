import styled from 'styled-components';
import {MdDirections, MdOutlineLocalPhone} from 'react-icons/md';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';

export const CardLocation = styled.div`
	display: flex;
	align-items: center;
`;

export const CardLocationContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const CardLocationIconContainer = styled.div`
	margin-right: 1.5rem;
`;

export const CardLocationTitle = styled.h6`
	font-family: 'Roboto';
	font-weight: 700;
	font-style: normal;
	font-size: 1rem;
	margin-bottom: 0.3rem;
	text-align: initial;
`;

export const CardLocationAddress = styled.p`
	font-family: 'Roboto';
	font-style: normal;
	font-weight: 400;
	font-size: 0.8rem;
	color: #707070;
	text-align: initial;
	text-transform: capitalize;
`;

export const FooterCardButtons = styled.div`
	display: flex;
	justify-content: space-between;

	margin-top: 2.375rem;
	padding: 3rem 0 1.25rem;

	border-top: 1px solid #bebebe;

	@media (max-width: 640px) {
		text-align: center;
		flex-direction: column-reverse;
		padding: 1.438rem 0 0 0;

		button {
			margin-left: auto;
			margin-right: auto;

			:nth-of-type(1) {
				margin-top: 1rem;
			}
		}
	}
`;

export const DoubleButtons = styled.div`
	display: flex;

	@media (max-width: 640px) {
		flex-direction: column;
	}
`;

export const ButtonScheduleHealth = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		svg {
			display: none;
		}
	}
`;

export const ButtonNavigationScheduleHealth = styled(ButtonScheduleHealth)`
	margin-left: 1.125rem;

	@media (max-width: 640px) {
		display: none;
	}
`;

export const ModalHeaderTitle = styled.h3`
	font-size: 1.5rem;
	line-height: 1.5rem;
	font-weight: 700;
	text-align: left;
	padding-top: 1rem;
	margin: -15% 0 29px 0;
	text-transform: capitalize;
	color: ${theme.colors['orange.400']};
`;

export const ModalBody = styled.div`
	gap: 1.25rem;
	display: flex;
	margin-bottom: 2.5rem;
	justify-content: space-between;
`;

export const ContentAddress = styled.div`
	display: flex;
	font-size: 1rem;
	line-height: 1.188rem;
	flex-direction: column;

	b {
		color: ${theme.colors['orange.400']};
	}

	p {
		text-transform: capitalize;
		color: ${theme.colors['gray.3']};
	}
`;

export const CardDirection = styled.div`
	display: flex;
	padding: 10px;
	cursor: pointer;
	max-height: 50px;
	align-self: center;
	border-radius: 10px;
	border: 1px solid #dddddd;
	box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
`;

export const TitleFooterContent = styled.b`
	font-size: 1rem;
	padding-bottom: 9px;
	line-height: 1.188rem;
	color: ${theme.colors['orange.400']};
`;

export const FooterButton = styled.div`
	button {
		width: 100%;
		font-size: 20px;
	}
`;

export const PhoneRightIcon = styled(MdOutlineLocalPhone)`
	display: flex;
	align-self: center;
	font-size: 1.5rem;
`;

export const DirectiontIcon = styled(MdDirections)`
	display: flex;
	align-self: center;
	font-size: 1.875rem;
	color: ${theme.colors['orange.400']};
`;
