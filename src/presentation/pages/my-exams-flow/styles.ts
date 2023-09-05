import styled from 'styled-components';
import {CalendarCanceledIcon} from 'presentation/components/icons/calendar-canceled-icon';

export const Content = styled.main`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	padding-bottom: 2.5rem;
	justify-content: space-between;
`;

export const Title = styled.h2`
	font-weight: 600;
	font-size: 1.75rem;
	line-height: 2.188rem;

	@media (max-width: 640px) {
		font-size: 1.25rem;
	}
`;

export const RightContent = styled.div`
	display: flex;
	align-items: center;

	div:last-of-type {
		padding-left: 1.563rem;

		@media (max-width: 640px) {
			padding-left: 0;
		}
	}
`;

export const ContainerModal = styled.div`
	display: flex;
	text-align: center;
	align-items: center;
	flex-direction: column;

	button {
		margin-bottom: 0.625rem;
	}
`;

export const TextCanceled = styled.h3`
	font-weight: 600;
	font-size: 1.313rem;
	margin-top: 1.188rem;
	line-height: 1.563rem;
`;

export const TextProtocol = styled.p`
	font-weight: 400;
	line-height: 1rem;
	font-size: 0.875rem;
	margin-bottom: 2.039rem;
	color: ${props => props.theme.colors['gray.4']};
`;

export const CalendarIcon = styled(CalendarCanceledIcon).attrs({
	width: 31,
	height: 37,
})``;
