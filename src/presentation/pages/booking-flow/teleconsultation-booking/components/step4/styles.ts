import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';

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
	margin-top: 16px;
	padding: 2.188rem 0 1rem 0;
	color: ${theme.colors['gray.4']};

	@media (max-width: 640px) {
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

export const ButtonScheduleHealth = styled(Button)`
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
