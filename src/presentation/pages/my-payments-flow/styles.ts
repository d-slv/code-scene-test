import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

export const MyPaymentsContainer = styled.div`
	position: relative;

	@media (max-width: 639px) {
		margin: -32px;
	}
`;

export const Title = styled.div`
	margin-bottom: 32px;
	font-size: 1.75rem;
	font-weight: 600;
	line-height: 26px;
`;

export const WarningBarContainer = styled.div`
	margin: 0 -20px 16px;

	@media (min-width: 639px) {
		margin: -32px -40px 28px;
	}
`;

export const TabContainer = styled.div`
	width: 100%;
	margin-bottom: 16px;
`;

export const MobileHeader = styled.div`
	background-color: ${theme.colors.primary};
	height: 85px;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
`;

export const BackButtonContainer = styled.div`
	position: absolute;
	left: 24px;
	top: 24px;
`;

export const MobileTitle = styled.h2`
	font-size: 1rem;
	font-weight: 600;
	color: ${theme.colors.white};
	text-align: center;
	margin-top: 20px;
`;

export const Content = styled.div`
	@media (max-width: 639px) {
		margin: 20px;
		padding: 20px;
		background-color: ${theme.colors.white};
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;
