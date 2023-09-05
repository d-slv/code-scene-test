import styled from 'styled-components';

import {Card} from 'presentation/components/card';
import theme from 'presentation/styles/theme.styles';

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
