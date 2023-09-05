import styled from 'styled-components';
import theme from '../../../styles/theme.styles';
import {logoHapvida} from '../../icons/logo-hapvida';

export const Header = styled.header`
	height: 77px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${theme.colors['primaryBlue.500']};
`;

export const Logo = styled(logoHapvida).attrs({
	width: 160,
	height: 55,
	fillLogoName: theme.colors.white,
})``;
