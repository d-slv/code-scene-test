import styled, {css} from 'styled-components';
import {Button} from '../button/button';

interface ButtonContainerProps {
	isChecked?: boolean;
	unselectedColor?: string;
}

export const ButtonContainer = styled(Button)<ButtonContainerProps>`
	width: 100%;
	padding: 0.5rem;
	font-size: 1rem;
	cursor: pointer;
	height: 3.438rem;
	font-weight: 700;
	border-radius: 10px;
	line-height: 1.25rem;
	border: 1px solid ${props => props.theme.colors['gray.2']};

	display: flex;
	align-items: center;
	justify-content: center;

	${props =>
		!props.isChecked &&
		css`
			color: ${props.unselectedColor};
		`}

	@media (max-width: 820px) {
		width: 100%;
		height: 2.438rem;
		font-size: 0.875rem;
		line-height: 1.125rem;
	}

	:hover {
		${props =>
			!props.isChecked &&
			css`
				background: rgba(0, 84, 184, 0.01);
			`}
	}
`;
export const ButtonContainerFlex = styled(Button)<ButtonContainerProps>`
	font-size: 1rem;
	padding: 8px;
	cursor: pointer;
	font-weight: 400;
	border-width: 1px;

	${props =>
		!props.isChecked &&
		css`
			color: ${props.unselectedColor};
		`}

	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 820px) {
		width: 100%;
		height: 40px;
		font-size: 0.875rem;
	}

	:hover {
		${props =>
			!props.isChecked &&
			css`
				background: rgba(0, 84, 184, 0.01);
			`}
	}
`;
interface ButtonContainerListProps {
	columns: number;
	display?: 'flex' | 'grid';
}
export const ButtonContainerList = styled.div<ButtonContainerListProps>`
	width: 100%;
	margin-top: 32px;

	display: ${props => props.display};
	flex-wrap: wrap;
	row-gap: 12px;
	column-gap: 24px;
	grid-template-columns: repeat(${props => props.columns}, 1fr);

	@media (max-width: 640px) {
		margin-top: 0;
		row-gap: 8px;
		justify-content: center;
		grid-template-columns: 1fr;
	}
`;
