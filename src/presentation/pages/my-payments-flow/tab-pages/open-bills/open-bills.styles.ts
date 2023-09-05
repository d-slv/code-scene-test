import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

export const MobileContainer = styled.div`
	width: 100%;
	padding-bottom: 20px;
	border-radius: 12px;
	background-color: ${theme.colors.white};

	& > *:not(:last-child) {
		margin-bottom: 16px;
	}
`;

export const DesktopContainer = styled.div`
	width: 100%;
	padding-bottom: 30px;
	display: flex;
	flex-wrap: wrap;

	& > * {
		margin-right: 24px;
		margin-bottom: 24px;
	}
`;
