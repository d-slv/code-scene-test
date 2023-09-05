import styled from 'styled-components';
import {Card} from 'presentation/components/card';
import theme from 'presentation/styles/theme.styles';

interface LightTextProps {
	isSelected?: boolean;
}

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;
`;

export const Main = styled.main`
	display: flex;
	flex: 1;
	flex-direction: column;
	margin-top: 80px;
	margin-bottom: 80px;
	gap: 32px;
	padding: 0 32px;

	@media (max-width: 576px) {
		margin-top: 30px;
		margin-bottom: 30px;
		padding: 0 16px;
		gap: 16px;
	}
`;

export const SelectContainer = styled(Card)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 730px;
	padding: 44px 90px 75px;
	border-radius: 16px;

	@media (max-width: 768px) {
		padding: 32px;
	}

	@media (max-width: 576px) {
		padding: 24px;
	}
`;

export const TitleSelect = styled.h2`
	font-weight: 400;
	text-align: center;
	font-size: 1.25rem;
	margin-bottom: 24px;

	@media (max-width: 576px) {
		margin-bottom: 16px;
	}
`;

export const BoldText = styled.b`
	text-align: initial;
`;

export const Scroll = styled.div`
	max-height: 25vh;
	overflow-y: auto;

	@media (max-width: 576px) {
		max-height: 29vh;
	}

	::-webkit-scrollbar {
		width: 0;
	}
`;

export const BeneficiaryContent = styled.div`
	gap: 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ContentCardOptionDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const PlanName = styled.h3`
	text-align: left;
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 4px;
	color: ${theme.colors.primary};
`;

export const LightText = styled.p<LightTextProps>`
	font-size: 0.875rem;
	font-weight: 400;
	text-align: left;
	color: ${({isSelected}) => (isSelected ? theme.colors.white : theme.colors['gray.5'])};
`;

export const TitleContractSelected = styled.h2`
	font-weight: 700;
	text-align: center;
	font-size: 1.25rem;
	margin-bottom: 16px;
`;

export const CardOptionSelected = styled(Card)`
	width: 100%;
	box-shadow: none;
	border-radius: 16px;
	padding: 16px 30px;
	color: ${theme.colors.white};
	background: ${theme.colors['primaryBlue.500']};
	margin-bottom: 24px;
`;

export const SelectedPlanName = styled.h3`
	font-size: 1rem;
	font-weight: 600;
	color: ${theme.colors.white};
`;

export const SelectedPlanHolder = styled.p`
	font-size: 0.875rem;
	color: ${theme.colors.white};
`;

export const SelectedContractNumber = styled.p`
	font-size: 0.875rem;
	font-weight: 700;
	color: ${theme.colors.white};
`;

export const FooterButtons = styled.div`
	display: flex;
	margin-top: 55px;
	justify-content: space-between;
	gap: 32px;
	width: 100%;

	@media (max-width: 576px) {
		button {
			width: 100%;
			font-size: 0.875rem;
			padding: 8px;
			white-space: nowrap;
		}
	}

	@media (max-width: 400px) {
		flex-direction: column;
		gap: 16px;
	}
`;
