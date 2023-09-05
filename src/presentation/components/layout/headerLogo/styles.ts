import styled from 'styled-components';
import {logoHapvida} from '../../icons/logo-hapvida';

export const DivLogo = styled.div`
	display: grid;
	align-self: center;
	grid-area: 1 / 2;
`;

export const Logo = styled(logoHapvida).attrs({
	width: 230,
	height: 50,
	fillLogoName: '#0054B8',
})``;
