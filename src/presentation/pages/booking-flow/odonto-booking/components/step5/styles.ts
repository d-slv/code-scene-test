import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';

export const ContainerPlaceAppointment = styled.div`
	padding: 1.25rem 0 0.625rem 0;

	@media (max-width: 640px) {
		text-align: center;
		padding-bottom: 1.625rem;
	}
`;

export const ConsultationPlace = styled.h4`
	font-weight: 700;
	font-size: 1.25rem;
	line-height: 1.438rem;

	@media (max-width: 640px) {
		font-size: 1.125rem;
		line-height: 1.313rem;
	}
`;

export const ConsultationAddress = styled.p`
	line-height: 1rem;
	font-size: 0.875rem;
	padding-top: 0.313rem;
	color: ${theme.colors['gray.4']};

	@media (max-width: 640px) {
		font-size: 0.75rem;
		line-height: 0.875rem;
	}
`;

export const ChosenDoctor = styled.p`
	font-weight: 500;
	font-size: 1.125rem;
	line-height: 1.313rem;
	margin-top: 1rem;
	padding: 1rem 0;
	color: ${theme.colors['gray.4']};

	@media (max-width: 640px) {
		text-align: center;
	}
`;

export const ContainerAppointmentTime = styled.div`
	width: 85%;
	display: grid;
	row-gap: 1rem;
	column-gap: 0.625rem;
	grid-template-rows: auto;
	grid-template-columns: repeat(auto-fit, minmax(75px, auto));

	@media (max-width: 640px) {
		width: 100%;
		row-gap: 0.438rem;
		justify-items: center;
		grid-template-columns: repeat(auto-fit, minmax(60px, auto));
	}

	@media (max-width: 1024px) {
		width: 100%;
	}
`;

export const CardAppointmentTime = styled.div`
	width: 4.688rem;
	height: 2.625rem;
	font-weight: 700;
	font-size: 1.438rem;
	line-height: 1.688rem;
	border-radius: 0.313rem;
	color: ${theme.colors['SecondaryBlue.400']};
	border: 1px solid ${theme.colors['SecondaryBlue.400']};

	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 640px) {
		width: 3.75rem;
		height: 2.125rem;
		font-size: 1.125rem;
		line-height: 1.313rem;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;

	@media (max-width: 1024px) {
		flex-direction: column;
		justify-content: center;
	}
`;

export const CardStepPageTile = styled.h3`
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 1.875rem;
	margin-bottom: 0.5rem;

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const CardStepPageDescription = styled.p`
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 1.1rem;
	margin-bottom: 1.875rem;
	color: ${theme.colors['gray.4']};

	@media (max-width: 820px) {
		text-align: center;
	}
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

export const ButtonScheduleOdonto = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		svg {
			display: none;
		}
	}
`;

export const ContainerResult = styled.div`
	margin-bottom: 15px;
`;
