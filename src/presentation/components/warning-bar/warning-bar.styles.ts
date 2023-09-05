import styled from 'styled-components';

type BarProps = {
	showBar?: boolean;
	textColor?: string;
	bgColor?: string;
};

export const BarContainer = styled.div<BarProps>`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	min-height: 2.625rem;
	background-color: ${props => props.bgColor};
	color: ${props => props.textColor};
	padding: 1rem 2.5rem;
	position: relative;
`;

export const BarContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

export const LeftIcon = styled.div`
	margin-right: 10px;
`;

export const BarText = styled.p`
	font-size: 0.875rem;

	b {
		font-weight: 700;
	}
`;

export const CloseButton = styled.button<BarProps>`
	width: 1.5rem;
	height: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	position: absolute;
	right: 1.25rem;
	top: 50%;
	translate: 0 -50%;
	background-color: transparent;
	border: none;
	font-size: 1.5rem;
	color: ${props => props.textColor};

	&:active {
		opacity: 0.8;
	}
`;
