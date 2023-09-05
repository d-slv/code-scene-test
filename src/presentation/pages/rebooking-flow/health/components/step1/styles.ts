import styled from 'styled-components';
import {Card} from 'presentation/components/card';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';
import {MdDirections, MdOutlineLocalPhone} from 'react-icons/md';
import {iconClinicLocation} from 'presentation/components/icons/clinic-location';

export const ContainerSelect = styled.div`
	display: flex;

	@media (max-width: 640px) {
		justify-content: center;
	}
`;

export const ContentSelect = styled.div`
	display: flex;
	flex-direction: column;

	div:first-of-type {
		padding-right: 0.625rem;
	}

	@media (max-width: 640px) {
		justify-content: center;

		div:first-of-type {
			padding-right: 0;
			padding-bottom: 0.938rem;
		}
	}
`;

export const LabelSelect = styled.label`
	font-weight: 700;
	font-size: 0.875rem;
	line-height: 1.125rem;
	margin-bottom: 0.313rem;
`;

export const ContainerIncludeNeighborhoods = styled.div`
	margin-top: 1.563rem;
	border-top: 1px solid ${theme.colors['gray.3']};
`;

export const IncludeNeighborhoods = styled.h5`
	font-size: 1rem;
	font-weight: 700;
	line-height: 1.25rem;
	padding-top: 1.25rem;
`;

export const ContainerCardPlace = styled.div`
	width: 100%;

	display: grid;
	row-gap: 1.375rem;
	column-gap: 1.438rem;
	grid-template-columns: 1fr 1fr;
	justify-content: space-between;

	@media (max-width: 640px) {
		row-gap: 1rem;
		grid-template-columns: 1fr;
	}
`;

export const CardPlace = styled(Card)`
	width: 100%;
	height: 7.5rem;
	padding: 2rem 1.375rem;

	display: flex;
	align-items: center;
	justify-content: space-between;

	i {
		font-size: 1.75rem;
		align-self: center;
	}

	@media (max-width: 640px) {
		width: 100%;
		height: 5.625rem;
		padding: 0 0.625rem;
	}
`;

export const CardPlaceContent = styled.div`
	display: flex;
	align-items: center;
`;

export const ClinicResultContent = styled.div`
	padding-left: 1.563rem;

	@media (max-width: 640px) {
		padding-left: 0.75rem;
	}
`;

export const TitlePlaceAppointment = styled.h2`
	font-weight: 700;
	font-size: 1.125rem;

	@media (max-width: 640px) {
		line-height: 1rem;
		font-size: 0.875rem;
		padding-bottom: 0.313rem;
	}
`;

export const AddressPlaceAppointment = styled.p`
	width: 70%;
	font-size: 0.75rem;
	line-height: 0.875rem;
	color: ${theme.colors['gray.4']};

	@media (max-width: 640px) {
		width: 100%;
	}
`;

export const IconClinicLocation = styled(iconClinicLocation).attrs({
	width: 38,
	height: 45,
})``;

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

export const FooterCard = styled.div`
	display: flex;
	justify-content: space-between;

	margin-top: 2.375rem;
	padding: 3rem 0 1.25rem;

	border-top: 1px solid #bebebe;

	@media (max-width: 640px) {
		text-align: center;
		flex-direction: column;
		padding: 1.438rem 0 0 0;

		button {
			margin-left: auto;
			margin-right: auto;
		}
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

export const FooterCardButtons = styled(FooterCard)`
	justify-content: flex-end;

	@media (max-width: 640px) {
		flex-direction: column;
		justify-content: center;

		button:nth-of-type(1) {
			margin-top: 15px;
		}
	}
`;

export const ModalHeaderTitle = styled.h3`
	font-size: 1.5rem;
	line-height: 1.5rem;
	font-weight: 700;
	text-align: left;
	padding-top: 10px;
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
