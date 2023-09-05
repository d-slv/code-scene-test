import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;

	@media (max-width: 1024px) {
		flex-direction: column;
		justify-content: center;
	}
`;

export const HeaderWrapper = styled.div``;

export const CardStepPageTitle = styled.h3`
	font-weight: 700;
	font-size: 1.5rem;
	margin-bottom: 8px;

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const CardStepPageDescription = styled.p`
	font-weight: 400;
	font-size: 0.875rem;
	margin-bottom: 30px;
	color: ${theme.colors['gray.4']};

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const ContainerPlaceAppointment = styled.div`
	margin-top: 16px;
	margin-bottom: 16px;

	@media (max-width: 640px) {
		text-align: center;
		margin-bottom: 16px;
	}
`;

export const ConsultationPlace = styled.h4`
	font-weight: 700;
	font-size: 1.25rem;

	@media (max-width: 640px) {
		font-size: 1rem;
	}
`;

export const ConsultationAddress = styled.p`
	font-size: 0.875rem;
	margin-top: 8px;
	color: ${theme.colors['gray.4']};
	text-transform: capitalize;

	@media (max-width: 640px) {
		font-size: 0.875rem;
		margin-top: 4px;
	}
`;
