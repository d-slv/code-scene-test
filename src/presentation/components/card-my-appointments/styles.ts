import styled from 'styled-components';
import {Card} from '../card';
import {TeleconsultationIcon, HealthIcon, ToothIcon, ClipboardPulseIcon} from '../icons';

interface CardAppointmentsProps {
	variantCard?: boolean;
}

interface StyledTextProps {
	weight?: number;
	size?: number;
}

export const ContainerAppointments = styled(Card)`
	padding: 0;
	position: relative;
	width: 360px;
`;

export const HeaderCardAppointments = styled.div<CardAppointmentsProps>`
	display: flex;
	padding: 16px;
	align-items: center;
	justify-content: space-between;
	background: ${({variantCard}) => (variantCard ? '#0054B8' : '#12ABD7')};
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`;

export const ContentHeaderAppointments = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CircleHeaderIcon = styled.div`
	width: 42px;
	height: 42px;
	display: flex;
	border-radius: 50%;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	border: 2px solid ${({theme}) => theme.colors.white};
`;

export const BodyCardAppointments = styled.div`
	display: flex;
	flex-direction: column;
	border-left: 1px solid #00acd7;
	border-right: 1px solid #00acd7;
	border-bottom: 1px solid #00acd7;
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
`;

export const ToastAppointmentConfirmed = styled.div`
	padding: 4px 20px 10px;
	font-weight: 500;
	font-size: 0.875rem;
	border-bottom-left-radius: 12px;
	border-bottom-right-radius: 12px;
	color: ${({theme}) => theme.colors.white};
	background: ${({theme}) => theme.colors['green.500']};
	box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.102);
`;

export const InfoBodyAppointments = styled.div`
	display: flex;
	padding: 12px 16px 24px;
	gap: 8px;
	flex-direction: column;
`;

export const StyledText = styled.p<StyledTextProps>`
	font-size: ${({size}) => size ?? 1}rem;
	font-weight: ${({weight}) => weight ?? 400};
	color: ${({color, theme}) => color ?? theme.colors.primary};
`;

export const BoldText = styled.span<StyledTextProps>`
	font-size: ${({size}) => size ?? 1}rem;
	font-weight: ${({weight}) => weight ?? 700};
	color: ${({color, theme}) => color ?? theme.colors.primary};
`;

export const Divider = styled.div`
	border-top: 1px solid ${({theme}) => theme.colors['gray.5']};
	margin-top: 8px;
	opacity: 0.2;
`;

export const ExaminationGuidelines = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const AddressBodyAppointments = styled.div`
	display: flex;
	gap: 44px;
`;

export const AddressInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	/* max-width: 160px; */ //Desabilitado enquanto não há mapa
`;

export const ButtonContainer = styled.div`
	margin-top: 16px;
`;

export const FooterCTAButtonWrapper = styled.div`
	margin-top: 12px;
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const FooterNearAppointmentContainer = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	background-color: #fff4d6;
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
`;

export const FooterNearAppointmentCTAContainer = styled.div`
	display: flex;
	gap: 12px;
`;

export const ContentModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const CardModalCancel = styled(Card)`
	padding: 0;
	box-shadow: none;
	border: 1px solid ${props => props.theme.colors['SecondaryBlue.200']};
`;

export const CardModalCancelBody = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

/* ::: Icons ::: */
export const Health = styled(HealthIcon).attrs({
	width: 20,
	height: 20,
	color: 'white',
})``;

export const Tooth = styled(ToothIcon).attrs({
	width: 20,
	height: 20,
	color: 'white',
})``;

export const Teleconsultation = styled(TeleconsultationIcon).attrs({
	width: 20,
	height: 20,
	color: 'white',
})``;

export const Exam = styled(ClipboardPulseIcon).attrs({
	width: 20,
	height: 20,
	color: 'white',
})``;
