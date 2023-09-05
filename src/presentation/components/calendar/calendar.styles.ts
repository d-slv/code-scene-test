import theme from 'presentation/styles/theme.styles';
import styled, {css} from 'styled-components';

interface Dayprops {
	isToday?: boolean;
	isSelected?: boolean;
	isAvailable?: boolean;
}

export const Frame = styled.div`
	width: 100%;
	background-color: #f2f2f2;
	overflow: hidden;

	border-radius: 0.625rem 0.625rem 0 0;
`;

export const Header = styled.div`
	font-size: 1rem;
	font-family: 'Roboto';
	color: ${props => props.theme.colors.white};
	font-weight: 700;
	padding: 0.78rem 1.1875rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${props => props.theme.colors.primary};
	height: 3rem;
`;

export const SubHeader = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	background-color: #77bce0;
	height: 3rem;
`;

export const WeekDay = styled.div`
	color: ${props => props.theme.colors.white};
	width: 14.28%;
	font-family: 'Roboto';
	display: flex;
	font-size: 14px;
	align-items: center;
	justify-content: center;
`;

export const Button = styled.div`
	cursor: pointer;
	font-size: 1.7rem;
	line-height: 1rem;
`;

export const Body = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
`;

export const Day = styled.div<Dayprops>`
	width: 100%;
	height: 3rem;
	display: flex;
	align-items: flex-start;
	justify-content: center;

	${props =>
		props.isToday &&
		css`
			border: 1px solid #eee;
		`}
`;

const color = (v: boolean) => (v ? theme.colors.primary : '#00acd7');

export const dayValue = styled.span<Dayprops>`
	background-color: ${props => (props.isAvailable ? color(props.isSelected) : '#f2f2f2')};
	color: ${props => (props.isAvailable ? props.theme.colors.white : props.theme.colors.black)};
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.83rem;
	height: 2.75rem;
	border-radius: 50%;
	font-weight: 400;
	font-family: 'Roboto';
	cursor: pointer;

	${props =>
		props.isSelected &&
		`
		background-color: ${props.theme.colors.black}
	`}

	:hover {
		filter: brightness(0.95);
	}
`;
