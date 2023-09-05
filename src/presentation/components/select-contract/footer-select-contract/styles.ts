import styled from 'styled-components';

import theme from '../../../styles/theme.styles';
import ansLogo from '../../../assets/images/ans-logo.jpg';
import ansRegister from '../../../assets/images/ans-selo.jpg';

export const Footer = styled.div`
	width: 100%;
	min-height: 75px;
	padding: 18.5px 32px;
	display: flex;
	align-items: center;
	justify-content: end;
	background: ${theme.colors.footerBg};

	@media (max-width: 640px) {
		display: none;
	}
`;

export const DivLogo = styled.div`
	width: 340px;
	border-radius: 8px;
	height: 38px;
	display: flex;
	align-items: center;
	background: ${theme.colors.white};
`;

export const AnsLogo = styled.img.attrs({
	src: `${ansLogo}`,
})`
	width: 110px;
	height: 22px;
	object-fit: cover;
	margin-left: 12px;
`;

export const AnsRegisterCode = styled.img.attrs({
	src: `${ansRegister}`,
})`
	width: 94px;
	max-width: 100%;
	height: 16px;
	margin-left: 24px;
`;
