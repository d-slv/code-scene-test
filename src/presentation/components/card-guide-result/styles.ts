import {PlanTypeEnum} from 'presentation/constants/bookingTypesEnum';
import styled from 'styled-components';
import {Card} from '../card';

interface CardProps {
	type?: PlanTypeEnum;
	isEmpty?: boolean;
	isFooter?: boolean;
	autoWidth?: boolean;
}

export const Container = styled.div``;

export const CardGuideContainer = styled(Card)`
	justify-content: space-between;
	flex-direction: column;
	display: flex;
	height: 100%;
`;

export const Header = styled.div`
	border-bottom: 1px solid rgba(112, 112, 112, 0.16);
	padding: 10px 8px 22px;
	flex-direction: column;
	display: flex;
	gap: 28px;
`;

export const CardTitle = styled.h4<CardProps>`
	color: ${props => (props.type === PlanTypeEnum.ODONTO ? '#F59C4E' : '#0054B8')};
	font-style: normal;
	line-height: 24px;
	font-weight: 400;
	font-size: 18px;
`;

export const AddressContainer = styled.div`
	text-transform: capitalize;
	align-items: center;
	display: flex;
	gap: 28px;
`;

export const AddressButton = styled.div<CardProps>`
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.35);
	border-radius: 20px;
	cursor: pointer;
	padding: 7.5px;
	display: flex;

	svg {
		color: ${props => (props.type === PlanTypeEnum.ODONTO ? '#F59C4E' : '#0054B8')};
	}
`;

export const AddressContent = styled.div`
	flex-direction: column;
	display: flex;
	gap: 2px;
`;

export const AddressTitle = styled.span`
	color: ${props => props.theme.colors.primary};
	text-transform: capitalize;
	font-size: 0.875rem;
	line-height: 16px;
	font-weight: 400;
`;

export const AddressText = styled.p`
	color: ${props => props.theme.colors['gray.4']};
	text-transform: capitalize;
	font-size: 0.875rem;
	font-weight: 400;
`;

export const QualificationsContainer = styled.div<CardProps>`
	border-bottom: 1px solid rgba(112, 112, 112, 0.16);
	padding: 16px 8px;
	display: flex;
	gap: 16px;

	:hover {
		cursor: pointer;
	}
`;

export const ButtonsContainer = styled.div`
	flex-direction: column;
	padding: 22px 8px 0;
	display: flex;
	gap: 10px;
`;

export const ButtonsContentCard = styled.div<CardProps>`
	justify-content: ${props => (props.isFooter ? 'center' : 'space-between')};
	display: flex;
	gap: 8px;

	button {
		width: ${props => props.autoWidth && '100%'};
		flex: 1;
	}

	@media (max-width: 350px) {
		flex-direction: column;

		button {
			width: 100%;

			+ button {
				margin-top: 10px;
			}
		}
	}
`;

export const TitleContentModal = styled.h4<CardProps>`
	font-style: normal;
	font-weight: 400;
	font-size: 1.125rem;
	color: ${props => (props.type === PlanTypeEnum.ODONTO ? '#F59C4E' : '#0054B8')};
`;

export const QualificationsContentModal = styled(QualificationsContainer)`
	border-bottom: 0;
	padding: 8px 0;

	:hover {
		cursor: pointer;
	}
`;

export const ContentDivider = styled.div`
	padding: 10px 0;

	+ div {
		border-top: 1px solid rgba(112, 112, 112, 0.16);
	}

	p {
		font-weight: 700;
		font-size: 14px;
		line-height: 16px;

		+ p {
			padding-top: 8px;
		}

		span {
			color: #707070;
			font-weight: 400;
		}
	}
`;

export const InfoContent = styled.div`
	padding: 10px;
	text-align: center;
	margin-bottom: 10px;
	border-radius: 10px;
	border: 2px solid #f3841f;

	h6 {
		color: #f5821f;
		font-size: 14px;
		line-height: 16px;
	}

	p {
		font-size: 14px;
		padding: 10px 0;
		line-height: 16px;
		color: #4a4a4a;
	}

	h5 {
		font-weight: 600;
		font-size: 16px;
		line-height: 19px;
		text-transform: uppercase;
	}
`;

export const MotivatorsModalContainer = styled.div`
	display: grid;
	gap: 0.625rem;
	margin-top: 1rem;
	grid-auto-flow: row;
	grid-template-columns: repeat(2, 1fr);
`;

export const PhonesModalContainer = styled.div`
	display: flex;
	flex-direction: column;

	button {
		margin-top: 0.625rem;
	}
`;

export const LegendContent = styled.div`
	gap: 22px;
	display: flex;
	align-items: center;
	padding-bottom: 1rem;

	div:last-of-type {
		padding-bottom: 0;
	}

	p {
		font-weight: 400;
		font-size: 14px;
		line-height: 19px;
		color: #707070;
	}

	img {
		width: 23px;
		height: 24px;
	}
`;
