import styled from 'styled-components';
import {logoHapvida} from 'presentation/components/icons/logo-hapvida';

export const UtilButtons = styled.div`
	padding-top: 44px;

	display: flex;
	justify-content: space-between;

	@media (max-width: 640px) {
		display: flex;
		flex-direction: column;

		button {
			width: 100%;
			margin-bottom: 10px;
		}
	}

	@media screen and (min-width: 641px) and (max-width: 1439px) {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
`;

export const Logo = styled(logoHapvida).attrs({
	width: 185,
	height: 42,
	fillLogoName: '#0054B8',
})``;
