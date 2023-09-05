import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';
import {StethoscopeIcon, DownloadIcon} from 'presentation/components/icons';

export const ContainerCardPrescription = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 0;
	min-width: 21.375rem;
	max-width: 21.375rem;
	height: 100%;
`;

interface ColorHeaderCardProps {
	background: string;
}

interface ColorBorderCardProps {
	borderColor: string;
}

const colors = {
	blue: '#12abd7',
	orange: '#F5821F',
};

export const CardPrescription = styled.div<ColorBorderCardProps>`
	background-color: ${theme.colors.white};
	border-radius: 0.6rem;

	border: 0.063rem solid;
	border-color: ${props => (props.borderColor === 'blue' ? colors.blue : colors.orange)};

	text-align: left;
	height: 26.563rem;
`;

export const CardHeader = styled.div<ColorHeaderCardProps>`
	min-width: 100%;
	max-width: 19.625rem;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	padding: 1.188rem;
	border-top-left-radius: 0.5rem;
	border-top-right-radius: 0.5rem;

	color: ${theme.colors.white};
	background: ${props => (props.background === 'blue' ? colors.blue : colors.orange)};

	box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
`;

export const InfoAppointment = styled.div``;

export const TextInfo = styled.p`
	font-size: 18px;
	font-weight: 400;
	line-height: 1.099rem;
	margin-bottom: 0.063rem;
`;

export const DateInfo = styled.p`
	font-size: 21px;
	font-weight: bold;
	line-height: 1.538rem;
`;

export const Icon = styled.div``;

export const CardBody = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	padding: 0 1.188rem 1.188rem 1.188rem;
`;

export const Info = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	height: 6rem;
	margin-bottom: 1rem;
	.divider {
		height: 1px;
		background: linear-gradient(
			270deg,
			${theme.colors['gray.1']} 0%,
			${theme.colors['gray.2']} 50%,
			${theme.colors['gray.1']} 100%
		);
		position: absolute;
		bottom: 0;
		min-width: 100%;
		max-width: 19.625rem;
	}
`;

export const ContentInfo = styled.p`
	min-width: 100%;
	max-width: 21.375rem;

	font-size: 0.938rem;

	padding-top: 0.5rem;
	padding-bottom: 0.375rem;
	color: #0857a5;
	span {
		font-weight: bold;
	}
	.doctor {
		color: #494949;
		font-weight: 400;
	}
`;

export const MedicalPrescription = styled.div`
	header {
		font-weight: bold;
		color: #0857a5;
	}

	.prescription-info {
		margin-bottom: 0.5rem;
		max-height: 7rem;
		overflow-y: scroll;
		::-webkit-scrollbar {
			width: 12px;
			height: 12px;
		}

		::-webkit-scrollbar-thumb {
			background-color: ${theme.colors['gray.3']};
			border-radius: 20px;
			border: 3px solid whitesmoke;
		}

		p {
			white-space: pre-wrap;
			color: #494949;
		}
	}
`;

export const CircleIcon = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 2.622rem;
	height: 2.622rem;
	padding: 0.5rem;

	border-radius: 50%;
	border: 0.125rem solid #ffffff;
`;

export const CardFooter = styled.div`
	.download-prescription {
		padding: 0;
		display: flex;
		justify-content: center;
	}
`;

export const ButtonCard = styled(Button)`
	display: flex;
	gap: 0.5rem;
	padding: 0;
	position: absolute;
	bottom: 1.188rem;
	border: 1px solid #0857a5;
`;

export const ButtonCardPdf = styled(Button)`
	padding: 0 5px;
	display: flex;
	gap: 0.5rem;
`;

export const ButtonCardLink = styled.a`
	position: absolute;
	bottom: 1.188rem;
	text-decoration: none;
`;

export const CloseButton = styled.div`
	width: 1.566rem;
	height: 1.566rem;
	cursor: pointer;

	color: ${theme.colors.white};

	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 50%;
	background: #00acd7;
	box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
`;

export const Stethoscope = styled(StethoscopeIcon).attrs({
	width: 25,
	height: 25,
	fill: '#ffffff',
})`
	padding: 15px;
	border-radius: 50%;
	border: 2px solid #ffffff;
	color: #ffffff;
`;

export const Download = styled(DownloadIcon).attrs({
	width: 35,
	height: 35,
	fill: '#0054B8',
})`
	padding: 0;
`;
