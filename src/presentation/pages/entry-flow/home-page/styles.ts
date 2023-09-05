import styled from 'styled-components';

import {Card} from 'presentation/components/card';
import {Container as CardEmptyContainer} from 'presentation/components/card-empty/card-empty.styles';
import theme from 'presentation/styles/theme.styles';
import {
	ToothIcon,
	StethoscopeIcon,
	ClipboardTextIcon,
	ClipboardCheckIcon,
	ClipboardPulseIcon,
	TeleconsultationIcon,
	AmbulanceIcon,
} from 'presentation/components/icons';
import {TextField} from 'presentation/components/text-field';
import {MedicalCardIcon} from 'presentation/components/icons/medical-card-icon';

interface CardServiceProps {
	color?: string;
}

export const HeaderContainer = styled.header`
	display: flex;
	flex-direction: column;
	margin-bottom: 32px;
`;

export const ContentContainer = styled.div`
	${CardEmptyContainer} {
		max-width: 650px;
		justify-content: center;

		&:first-child {
			flex: 0 1 auto;
		}

		&:last-child {
			flex: 1 1 auto;
		}
	}
`;

export const Section = styled.section`
	margin-bottom: 26px;
	display: flex;
	flex-direction: column;
`;

export const RatingEmptyCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 160px;

	@media (min-width: 640px) {
		div {
			padding: 16px 24px;
			width: 336px;
		}
	}
`;

export const TitleHeader = styled.div`
	font-size: 1.25rem;
	margin-right: 13px;
`;

export const ContainerCardsService = styled.div`
	margin-top: 8px;
	padding: 16px 0px;
	overflow-x: hidden;
	width: 100%;
`;

export const Link = styled.a``;

export const CardService = styled(Card)<CardServiceProps>`
	color: ${({color}) => theme.colors[color || 'primary']};
	height: 122px;
	width: 110px;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1.2;
	margin: 6px 0px;
	text-align: center;
	cursor: pointer;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	svg {
		align-self: center;
		margin-bottom: 10px;
	}
`;

export const ExternalLinkCardService = styled.a<CardServiceProps>`
	background-color: ${theme.colors.white};
	border-radius: 8px;
	box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.15);
	padding: 20px 14px;
	color: ${theme.colors.primary};
	height: 122px;
	width: 110px;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1.2;
	margin: 6px 0px;
	text-align: center;
	cursor: pointer;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	svg {
		align-self: center;
		margin-bottom: 10px;
	}
`;

export const SectionCombiner = styled.div`
	@media (min-width: 640px) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		section:not(:last-child) {
			margin-right: 25px;
		}
	}
`;

export const SectionTitle = styled.div`
	font-size: 1rem;
	font-weight: 600;
	line-height: 1.25rem;
	color: ${theme.colors.black};
	margin-bottom: 1.375rem;
`;

export const GenericContainer = styled.div`
	display: flex;
`;

export const ContainerUtilities = styled.div`
	padding-top: 1.563rem;
	display: flex;
`;

export const Stethoscope = styled(StethoscopeIcon).attrs({
	width: 31,
	height: 29,
})``;

export const Teleconsultation = styled(TeleconsultationIcon).attrs({
	width: 37,
	height: 25,
})``;

export const Tooth = styled(ToothIcon).attrs({
	width: 27,
	height: 27,
})``;

export const ClipboardPulse = styled(ClipboardPulseIcon).attrs({
	width: 27,
	height: 30,
})``;

export const ClipboardText = styled(ClipboardTextIcon).attrs({
	width: 27,
	height: 30,
})``;

export const ClipboardCheck = styled(ClipboardCheckIcon).attrs({
	width: 27,
	height: 30,
})``;

export const Ambulance = styled(AmbulanceIcon).attrs({
	width: 34,
	height: 28,
})``;

export const MedicalCard = styled(MedicalCardIcon).attrs({
	width: 36,
	height: 25,
})``;

export const ModalContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;

	button {
		margin: 0 auto;
	}
`;

export const ModalHeaderPendency = styled.div`
	display: flex;
	justify-content: center;

	svg {
		path {
			fill: #f05a22;
		}

		align-self: center;
		width: 95px;
		height: 95px;
	}
`;

export const ModalContent = styled.p`
	font-weight: 500;
	font-size: 1rem;
	line-height: 22px;
	text-align: center;
	padding: 23px 0 15px 0;
`;

export const ModalOperationalHeader = styled.div`
	display: flex;
	justify-content: center;

	svg {
		path {
			stroke: #c93600;
		}

		width: 62px;
		height: 62px;
		align-self: center;
	}
`;

export const ModalOperationalContent = styled(ModalContent)`
	font-weight: 600;
`;

export const InputCode = styled(TextField)`
	width: 50%;
	margin: 0 auto;
	text-align: center;
	color: ${props => props.theme.colors.primary};
	border: 1px solid ${props => props.theme.colors['SecondaryBlue.200']};

	::placeholder {
		color: ${props => props.theme.colors['SecondaryBlue.200']};
	}
`;

export const ModalContentOperacionalPass = styled(ModalContent)`
	padding: 0 0 15px;
`;

export const ModalContainerOperacionalPass = styled(ModalContainer)`
	display: flex;
	justify-content: center;
	flex-direction: column;

	button {
		margin: 0 auto;
	}

	a {
		font-weight: 600;
		font-size: 14px;
		line-height: 23px;
		align-self: center;
		padding-top: 1rem;
		color: ${props => props.theme.colors.primary};
	}
`;
