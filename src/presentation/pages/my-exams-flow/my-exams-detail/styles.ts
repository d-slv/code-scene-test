import styled from 'styled-components';
import {Card} from 'presentation/components/card';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';
import {ClipboardPulseIcon, logoHapvida, CalendarCanceledIcon} from 'presentation/components/icons';

interface CardAppointmentsProps {
	variantCard?: boolean;
}
interface StyledTextProps {
	weight?: number;
	size?: number;
}

export const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	padding-bottom: 40px;
	justify-content: space-between;
`;

export const Title = styled.h2`
	font-weight: 600;
	font-size: 28px;
	line-height: 35px;
	color: ${theme.colors.primary};

	@media (max-width: 640px) {
		font-size: 15px;
	}
`;

export const RightContent = styled.div`
	gap: 12px;
	display: flex;
	align-items: center;

	div:last-of-type {
		padding-left: 25px;

		@media (max-width: 640px) {
			padding-left: 0;
		}
	}

	@media (max-width: 820px) {
		font-size: 8px;
	}
`;

export const UtilButtons = styled.div`
	padding-top: 2.813rem;

	display: flex;
	justify-content: space-between;

	@media (max-width: 640px) {
		row-gap: 14px;
		grid-template-columns: 1fr;

		button {
			width: 100%;
		}
	}
`;

export const HeaderButton = styled(Button)`
	width: fit-content;

	@media (max-width: 640px) {
		width: 90px;
		height: 25px;
		font-size: 10px;
		font-weight: 400;

		svg {
			width: 10px;
			height: 10px;
		}
	}
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
	border: 2px solid ${theme.colors.white};
`;

export const StyledText = styled.p<StyledTextProps>`
	font-size: ${({size}) => size ?? 1}rem;
	font-weight: ${({weight}) => weight ?? 400};
	color: ${({color}) => color ?? theme.colors.primary};
`;

export const BoldText = styled.span<StyledTextProps>`
	font-size: ${({size}) => size ?? 1}rem;
	font-weight: ${({weight}) => weight ?? 700};
	color: ${({color}) => color ?? theme.colors.primary};
`;

export const ContainerModal = styled.div`
	height: auto;
	display: flex;
	max-width: 350px;
	margin-left: auto;
	margin-right: auto;
	flex-direction: column;
`;

export const WarningModalText = styled.div`
	max-width: 350px;
	font-size: 0.938rem;
	line-height: 0.938rem;
	padding-bottom: 0.75rem;

	p:last-of-type {
		padding-top: 0.25rem;
	}
`;

export const CardModalCancel = styled(Card)`
	padding: 0;
	box-shadow: none;
	margin-bottom: 1rem;
	border: 1px solid ${props => props.theme.colors['SecondaryBlue.200']};
`;

export const CardModalCancelBody = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const ContainerModalCanceled = styled.div`
	display: flex;
	text-align: center;
	align-items: center;
	flex-direction: column;

	button {
		margin-bottom: 0.625rem;
	}
`;

export const ContentModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const TextCanceled = styled.h3`
	font-weight: 600;
	font-size: 1.313rem;
	margin-top: 1.188rem;
	line-height: 1.563rem;
`;

export const TextProtocol = styled.p`
	font-weight: 400;
	line-height: 1rem;
	font-size: 0.875rem;
	padding-bottom: 1rem;
	margin-bottom: 2.039rem;
	color: ${props => props.theme.colors['gray.4']};
`;

export const Divider = styled.div`
	border-top: 1px solid ${theme.colors['gray.5']};
	margin-top: 8px;
	opacity: 0.2;
`;

export const Logo = styled(logoHapvida).attrs({
	width: 185,
	height: 42,
	fillLogoName: '#0054B8',
})``;

export const Exam = styled(ClipboardPulseIcon).attrs({
	width: 18,
	height: 20,
	color: '#ffffff',
})``;

export const CalendarIcon = styled(CalendarCanceledIcon).attrs({
	width: 31,
	height: 37,
})``;
