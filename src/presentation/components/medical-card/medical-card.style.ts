import theme from 'presentation/styles/theme.styles';
import styled from 'styled-components';
import {BackArrowIcon} from '../icons/back-arrow-icon';
import {NextArrowIcon} from '../icons/next-arrow-icon';

type StatusProps = {
	isSelected: boolean;
};

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	min-height: 56px;
	position: relative;
`;

export const NavigationButton = styled.button`
	display: flex;
	min-width: 20px;
	max-width: 20px;
	height: 40px;
	border: none;
	background-color: transparent;
	cursor: pointer;

	&:first-of-type {
		margin-right: 10px;
	}

	&:last-of-type {
		margin-left: 10px;
	}
`;

export const LeftArrowButton = styled(BackArrowIcon).attrs({
	width: 20,
	height: 40,
	color: theme.colors.primary,
})``;

export const RightArrowButton = styled(NextArrowIcon).attrs({
	width: 20,
	height: 40,
	color: theme.colors.primary,
})``;

export const ContentBody = styled.div`
	padding: 10px 30px;

	@media (max-width: 640px) {
		padding: 30px 0px;
	}
`;

export const Footer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Title = styled.p`
	font-style: normal;
	font-weight: 400;
	font-size: 32px;
	line-height: 40px;
	text-align: left;
	width: 400px;
`;

export const Subtitle = styled.h3`
	width: 100%;
	margin-left: 30px;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	text-align: left;
	position: absolute;
	bottom: 100%;
	left: 50%;
	translate: -50%;
`;

export const NavigationIndicator = styled.div<StatusProps>`
	width: 14px;
	height: 14px;
	background-color: ${props => theme.colors[props.isSelected ? 'primary' : 'disabled']};
	border-radius: 50%;
	margin-right: 5px;
	box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
`;

export const ContentLogo = styled.div`
	top: 0px;
	left: -25px;
	position: absolute;
	z-index: -1;
`;

export const NamePlan = styled.p`
	font-size: 20px;
	line-height: 25.14px;
`;

export const NameBeneficiary = styled.h1`
	font-size: 32px;
	font-weight: 400;
	line-height: 40.22px;
`;

export const Divider = styled.hr`
	border: 1px solid rgba(0, 0, 0, 0.12);
	margin-top: 5px;
	margin-bottom: 5px;
`;

export const TitleItem = styled.p`
	font-size: 14px;
	line-height: 18px;
	margin-top: 5px;
	margin-bottom: 5px;
`;

export const NrPlan = styled.p`
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;
`;

export const NmPlan = styled.p`
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;
	text-transform: uppercase;
`;

export const ContainerColumn = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;

	div:first-child {
		margin-right: 70px;
	}
`;

export const DataBeneficiary = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;
	color: #707070;
	margin-bottom: 5px;
`;

export const DataCompany = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;
	color: #707070;
	margin-bottom: 5px;
	text-transform: uppercase;
`;

export const ContainerButton = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding-top: 10px;
	padding-bottom: 10px;
`;

export const ContainerLogos = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

export const HapvidaLogoContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding-top: 10px;
`;

export const MultiLogo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

export const ButtonSlideContainer = styled.div`
	cursor: pointer;
	width: 100%;
	margin-top: 25px;
	left: 10px;
	position: absolute;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const ContentShared = styled.div`
	padding: 20px;
`;

export const HeaderContentShared = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 40px;
	background: #f2f2f2;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
`;

export const FooterContentShared = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 50px;
	margin-top: 10px;
`;

export const TitleShared = styled.p`
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	text-align: left;
	word-wrap: break-word;
	margin-top: 25px;
`;

export const SubtitleShare = styled.h3`
	font-weight: 400;
	font-size: 24px;
	line-height: 30px;
	text-align: left;
	margin-top: 10px;
`;
