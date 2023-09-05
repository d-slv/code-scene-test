import theme from 'presentation/styles/theme.styles';
import styled from 'styled-components';
import {BalloonUtilTypes} from '.';

export const Container = styled.div<BalloonUtilTypes>`
	transform: translate(0, 10px);
	background-color: ${theme.colors.white};
	padding: 1rem 1.3rem 1.3rem;
	border: 3px solid
		${props => (theme.colors[props.color] ? theme.colors[props.color] : props.color)};
	border-radius: 0.8rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: ${theme.colors['gray.4']};
	:after {
		position: absolute;
		content: '';
		right: calc(50% - 12px);
		top: -10px;
		border-style: solid;
		border-width: 0 12px 10px 12px;
		border-color: transparent transparent ${theme.colors.white} transparent;
		transition-duration: 0.3s;
		transition-property: transform;
	}
	:before {
		position: absolute;
		content: '';
		right: calc(50% - 16px);
		top: -14px;
		border-style: solid;
		border-width: 0 16px 13px 16px;
		border-color: transparent;
		border-bottom-color: ${props =>
			theme.colors[props.color] ? theme.colors[props.color] : props.color};
		transition-duration: 0.3s;
		transition-property: transform;
	}
`;
