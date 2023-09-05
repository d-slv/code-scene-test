import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import {MdOutlineLocalPhone} from 'react-icons/md';
import {CellPhoneIcon, CornerHaplogo, logoHapvida} from '../icons';

export const Logo = styled(logoHapvida).attrs({
	width: 185,
	height: 42,
	fillLogoName: '#0054B8',
})``;

export const RightCornerLogoContainer = styled.div`
	position: absolute;
	top: -1.875rem;
	right: -2.5rem;

	@media (max-width: 520px) {
		svg {
			width: 152px;
			height: 149.3px;
		}
	}
`;

export const RightCornerLogo = styled(CornerHaplogo).attrs({
	width: 169,
	height: 166,
	fillLogoName: '#0054B8',
})``;

export const PhoneIcon = styled(MdOutlineLocalPhone)`
	display: flex;
	align-self: center;
	font-size: 1.25rem;
`;

export const TicketContainer = styled.div`
	width: calc(100% - 40px);
	margin: 0 20px;
	box-shadow: 0px 0px 8px -3px #c4c4c4;
	background-color: ${theme.colors.white};
	border-radius: 17px;
	padding: 1.875rem 2.5rem;
	position: relative;

	&::before {
		content: '';
		z-index: -1;
		width: calc(100% + 40px);
		height: calc(100% + 40px);
		background-color: white;
		position: absolute;
		border-radius: 17px;
		top: -20px;
		left: -20px;
	}
`;

export const TicketHeader = styled.div`
	position: relative;
`;

export const TicketOrientation = styled.div``;

export const OrientationTitle = styled.h3`
	font-weight: 400;
	font-size: 18px;
	line-height: 23px;
	margin-bottom: 15px;

	b {
		font-weight: 700;
	}
`;

export const OrientationText = styled.p`
	font-weight: 600;
	font-size: 16px;
	line-height: 189.9%;
	color: ${theme.colors['gray.5']};
`;

export const TicketFooter = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Divisor = styled.div`
	height: 0.9375rem;
	margin: 0.9375rem -2.5rem 1.875rem -2.5rem;
	border-bottom: 2px dashed #b1b1b1;
	position: relative;

	&::before,
	&::after {
		content: '';
		width: 1.875rem;
		height: 1.875rem;
		border-radius: 50%;
		background-color: ${theme.colors.white};
		position: absolute;
		bottom: 0;
	}

	&::before {
		box-shadow: inset -4px 0px 8px -6px #c4c4c4;
		translate: -50% 50%;
		clip-path: polygon(30% 0, 100% 0, 100% 100%, 30% 100%);
		left: 0;
	}

	&::after {
		box-shadow: inset 4px 0px 8px -6px #c4c4c4;
		translate: 50% 50%;
		clip-path: polygon(0 0, 70% 0, 70% 100%, 0 100%);
		right: 0;
	}
`;

export const HeaderTopContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 2.1875rem;

	@media (max-width: 640px) {
		margin-bottom: 0px;
		flex-direction: column;
		align-items: flex-start;
		width: fit-content;
		margin-left: 10%;
	}

	@media (max-width: 400px) {
		margin-left: 2.5%;
	}

	h2 {
		font-size: 1.625rem;
		font-weight: 400;
		line-height: 2rem;
		margin-left: 1.625rem;

		@media (max-width: 640px) {
			font-size: 0.75rem;
			line-height: 0.875rem;
			font-weight: 700;
			margin: 1.125rem 0 2.1875rem;
		}
	}
`;

export const HeaderInfo = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;

	div:not(:last-child) {
		margin-bottom: 20px;
		margin-right: 20px;
	}

	@media (max-width: 640px) {
		display: block;
		margin: 0 auto;
		width: 80%;
	}

	@media (max-width: 400px) {
		width: 95%;
	}
`;

export const AppointmentDate = styled.p`
	font-size: 2rem;
	line-height: 2.3125rem;
	font-weight: 500;
	margin-bottom: 0.375rem;

	b {
		font-weight: 900;
		text-transform: capitalize;
	}

	@media (max-width: 640px) {
		font-size: 1.625rem;
		line-height: 1.875rem;
		margin-bottom: 0.9375rem;
	}
`;

export const AppointmentAddress = styled.div`
	@media (max-width: 640px) {
		margin-bottom: 1.75rem;
	}
`;

export const Address = styled.p`
	max-width: 19.5rem;
	font-size: 0.875rem;
	line-height: 1.25rem;
	text-transform: capitalize;

	b {
		font-size: 1rem;
		font-weight: 600;
	}
`;

export const PhoneContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	margin-top: 0.375rem;
	gap: 0.5rem;

	span {
		display: flex;
		margin-right: 0.5625rem;
	}

	p {
		font-weight: 700;
		font-size: 1.125rem;
		margin-left: 0.625rem;
	}

	button {
		svg {
			margin-right: 0.375rem;
		}
	}
`;

export const SummaryBlock = styled.div`
	&:not(:last-of-type) {
		margin-bottom: 0.5rem;
	}

	@media (max-width: 640px) {
		margin-bottom: 0.75rem;
	}
`;

export const SummaryTitle = styled.h6`
	font-weight: 700;
	line-height: 1.125rem;
	font-size: 0.875rem;
`;

export const SummaryContent = styled.p`
	font-size: 1rem;
	line-height: 1.25rem;
	color: ${theme.colors['gray.10']};
`;

export const WarningTitle = styled.h5`
	font-weight: 700;
	font-size: 1.125rem;
	line-height: 1.3125rem;
	margin-bottom: 0.875rem;
	color: ${theme.colors['orange.500']};

	@media (max-width: 640px) {
		text-align: center;
	}
`;

export const WarningText = styled.p`
	font-size: 0.875rem;
	line-height: 1.3125rem;
	color: ${theme.colors['orange.500']};
	max-width: 11.875rem;

	@media (max-width: 640px) {
		text-align: center;
		margin: 0 auto;
		max-width: none;
	}

	b {
		font-weight: 600;
		text-decoration: underline;
	}
`;

export const Protocol = styled.p`
	font-size: 1rem;
	line-height: 1.1875rem;
	margin-bottom: 0.25rem;

	b {
		font-weight: 700;
	}
`;

export const ProtocolInfo = styled.span`
	font-weight: 500;
	line-height: 16px;
	font-size: 14px;
	color: ${theme.colors['gray.5']};
`;

export const ModalPhonesTitle = styled.div`
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 1.75rem;
	padding-bottom: 1rem;
`;

export const ModalPhonesBody = styled.div`
	gap: 0.75rem;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const IconPhone = styled(MdOutlineLocalPhone).attrs({
	width: 18,
	height: 18,
	fill: '#fff',
})``;

export const IconCellPhone = styled(CellPhoneIcon).attrs({
	width: 10,
	height: 15,
	fill: '#fff',
})``;
