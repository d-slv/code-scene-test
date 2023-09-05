import styled from 'styled-components';
import {Card} from 'presentation/components/card';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';

export const QuerySummaryCard = styled(Card)`
	display: flex;
	justify-content: space-around;

	@media (max-width: 640px) {
		text-align: center;
		flex-direction: column;
	}
`;

export const ResumeContent = styled.div`
	width: 100%;
	padding: 2% 4%;

	div:last-of-type {
		padding-top: 0.938rem;
	}
`;

export const VerticalLine = styled.div`
	background: #bfbfbf;
	width: 1px;

	@media (max-width: 640px) {
		display: none;
	}
`;

export const CardAbstractTitle = styled.h4`
	font-weight: 700;
	font-size: 1.313rem;
	line-height: 1.563rem;

	@media (max-width: 640px) {
		font-size: 1.125rem;
		line-height: 1.313rem;
	}
`;

export const CardSummaryDate = styled.h4`
	font-weight: 400;
	font-size: 1.313rem;
	line-height: 1.563rem;
	padding-top: 0.313rem;

	@media (max-width: 640px) {
		font-size: 1.125rem;
		line-height: 1.313rem;
	}
`;

export const AppointmentInformation = styled.div`
	@media (max-width: 640px) {
		padding-top: 1.188rem;

		div:first-of-type {
			padding-top: 0;
		}
	}
`;

export const AbstractTitle = styled.h5`
	font-weight: 700;
	font-size: 0.875rem;
	line-height: 1rem;
`;

export const SummaryContent = styled.p`
	font-size: 1rem;
	line-height: 1.188rem;
	color: ${theme.colors['gray.4']};
`;

export const SpecialtySummary = styled.span`
	font-weight: 400;
	font-size: 0.75rem;
	line-height: 0.875rem;
	padding-left: 1.125rem;
	color: ${theme.colors.dark};
`;

export const ButtonScheduleHealth = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		svg {
			display: none;
		}
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
