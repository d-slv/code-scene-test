import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

type DropdownProps = {
	isVisible: boolean;
	isTabInDropdownSelected?: boolean;
};

type TabStatusProps = {
	isSelected: boolean;
	isVisible?: boolean;
};

export const Container = styled.div`
	width: 100%;
	position: relative;
`;

export const TabsContainer = styled.div`
	width: 100%;
	height: 2.25rem;
	border-bottom: 1px solid ${theme.colors['gray.9']};
	white-space: nowrap;
	overflow-x: hidden;
	position: relative;
`;

export const ArrowCheckbox = styled.input.attrs({
	type: 'checkbox',
	name: 'arrow',
	id: 'arrow',
})`
	display: none;
`;

export const ArrowIconContainer = styled.div<DropdownProps>`
	display: ${props => (props.isVisible ? 'block' : 'none')};
	position: absolute;
	top: 50%;
	right: 16px;
	translate: 0 -50%;

	label {
		cursor: pointer;
	}

	svg {
		transition: rotate 0.4s;
		box-sizing: content-box;
		padding: 2px;
		margin-top: -2px;
		${props =>
			props.isTabInDropdownSelected &&
			`
			background-color: ${theme.colors.primary};
			border-radius: 50%;
			color: white;
		`}
	}

	${ArrowCheckbox}:checked~label svg {
		rotate: 180deg;
	}
`;

export const DropdownContainer = styled.div<DropdownProps>`
	display: ${props => (props.isVisible ? 'flex' : 'none')};
	background-color: white;
	width: fit-content;
	flex-direction: column;
	border: 1px solid #dde2e5;
	position: absolute;
	right: 0;
	top: 100%;
	z-index: 10;
`;

export const DropdownTabBlock = styled.div<TabStatusProps>`
	padding: 12px;
	padding-left: 10px;
	display: ${props => (props.isVisible ? 'inline-block' : 'none')};
	border-left: 4px solid ${props => (props.isSelected ? theme.colors.primary : 'transparent')};
	cursor: pointer;

	&:active {
		opacity: 0.8;
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

export const TabBlock = styled.div<TabStatusProps>`
	display: ${props => (props.isVisible ? 'inline-block' : 'none')};
	height: 100%;
	width: fit-content;
	border-bottom: 2px solid ${props => (props.isSelected ? theme.colors.primary : 'transparent')};
	justify-content: center;
	align-items: center;
	margin-right: ${theme.spacing.size.xxxs.value};
	margin-bottom: -1px;
	padding-bottom: 1px;
	cursor: pointer;
`;

export const TabText = styled.p<TabStatusProps>`
	text-align: center;
	font-size: ${theme.font.size.xs.value};
	font-weight: ${theme.font.weight.medium.value};
	color: ${props => theme.colors[props.isSelected ? 'primary' : 'gray.6']};
`;
