import styled from 'styled-components';
import {AnsUnica} from 'presentation/components/icons/ans-unica';
import theme from '../../../styles/theme.styles';
import img from '../../../assets/images/family.jpg';
import {appStoreIcon} from '../../icons/app-store';
import {googlePlayIcon} from '../../icons/google-play';

export const LoginBackgroundImage = styled.img`
	width: 50vw;
	height: 100vh;
	max-width: 100%;
	max-height: 100%;
	position: absolute;
	background-size: cover;
	background-image: linear-gradient(
			to bottom,
			rgba(20, 20, 20, 0) 0%,
			rgba(20, 20, 20, 0.5699) 77.69%,
			rgba(20, 20, 20, 0.8) 98.69%
		),
		url(${img});
	background-position: center;
	background-repeat: no-repeat;
	background-origin: border-box;

	@media (max-width: 1280px) {
		background-size: cover;
	}
`;

export const FooterContainer = styled.div`
	padding: 0 27px 36px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	isolation: isolate;
	position: absolute;
	width: 50vw;
	bottom: 0;
	right: 0;

	@media (max-width: 1024px) {
		flex-direction: column;
		align-items: center;
	}
`;

export const ContainerAns = styled.div`
	position: relative;
	bottom: -20px;

	@media (max-width: 1024px) {
		order: 2;
		margin-top: 16px;
	}
`;

export const AnsLogo = styled(AnsUnica).attrs({
	width: 135,
	height: 42,
})``;

export const ContainerApps = styled.div`
	max-width: 288px;

	span {
		font-size: 1rem;
		color: ${theme.colors.white};
	}
`;

export const AppStore = styled(appStoreIcon).attrs({
	width: 135,
	height: 42,
})``;

export const GooglePlay = styled(googlePlayIcon).attrs({
	width: 135,
	height: 42,
})``;

export const ImageApps = styled.div`
	max-width: 100%;
	max-height: 100%;
	padding-top: 0.813rem;

	display: flex;
	justify-content: space-between;
`;
