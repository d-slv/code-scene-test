import styled from 'styled-components';
import {
	TeleconsultationIcon,
	HealthIcon,
	ToothIcon,
	IconCalendarClock,
} from 'presentation/components/icons';
import {MdKeyboardArrowDown} from 'react-icons/md';

interface ListItemProps {
	isInverted?: boolean;
}

export const DropDownContainer = styled.div`
	height: 3rem;
	width: 12.5rem;
	border-radius: 1.563rem;
	color: ${props => props.theme.colors.white};
	background: ${props => props.theme.colors.primary};
	cursor: pointer;
`;

export const DropDownHeader = styled.div`
	height: 3rem;
	font-size: 1rem;
	margin-bottom: 0.4rem;
	border-radius: 1.563rem;
	color: ${props => props.theme.colors.white};

	display: flex;
	align-items: center;
	justify-content: space-around;
`;

export const DropDownHeaderContent = styled.div`
	gap: 0.625rem;
	display: flex;
	align-items: center;
`;

export const DropDownListContainer = styled.div`
	z-index: 2;
	width: 12.5rem;
	position: absolute;
`;

export const DropDownList = styled.ul`
	margin: 0;
	padding: 0;
	width: 12.5rem;
	font-size: 1rem;
	box-sizing: border-box;
	border-bottom-left-radius: 0.5rem;
	border-bottom-right-radius: 0.5rem;
	color: ${props => props.theme.colors.primary};
	background: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.primary};

	&:first-child {
		padding-top: 0.5rem;
	}
`;

export const ListItem = styled.li<ListItemProps>`
	display: flex;
	list-style: none;
	align-items: center;
	margin-bottom: 0.8rem;
	cursor: pointer;
	padding: 0.375rem;

	:first-of-type {
		text-align: center;
	}

	svg {
		margin: 0 0.625rem 0 1.75rem;
	}

	&:hover {
		color: ${props => props.theme.colors.white};
		background: ${props => props.theme.colors.primary};

		svg path {
			fill: ${props => !props.isInverted && props.theme.colors.white};
			stroke: ${props => props.isInverted && props.theme.colors.white};
		}
	}
`;

export const Health = styled(HealthIcon).attrs({
	width: 21,
	height: 20,
	color: '#0054B8',
})``;

export const Tooth = styled(ToothIcon).attrs({
	width: 21,
	height: 20,
	color: '#0054B8',
})``;

export const Teleconsultion = styled(TeleconsultationIcon).attrs({
	width: 21,
	height: 20,
	color: '#0054B8',
})``;

export const CalendarClock = styled(IconCalendarClock).attrs({
	width: 21,
	height: 20,
	color: '#0054B8',
})``;

export const CalendarClockInverted = styled(IconCalendarClock).attrs({
	width: 21,
	height: 20,
	color: '#ffff',
})``;

export const HealthInverted = styled(HealthIcon).attrs({
	width: 21,
	height: 20,
	color: '#ffff',
})``;

export const ToothInverted = styled(ToothIcon).attrs({
	width: 21,
	height: 20,
	color: '#ffff',
})``;

export const TeleconsultionInverted = styled(TeleconsultationIcon).attrs({
	width: 21,
	height: 20,
	color: '#ffff',
})``;

export const Flag = styled(MdKeyboardArrowDown).attrs({
	width: 50,
	height: 50,
	color: '#ffffff',
})`
	font-size: 1.563rem;
`;
