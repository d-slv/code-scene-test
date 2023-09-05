import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

interface ModalProps {
	variant?: 'default' | 'guide' | 'other';
}

interface TitleProps {
	showTitle?: boolean;
	leftTitle?: boolean;
}

interface ModalButtonCloseProps {
	customBgColor?: string;
}

export const Content = styled.div`
	#overlay {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgb(0, 0, 0, 0.5);
		&.active {
			opacity: 1;
			pointer-events: all;
		}
	}
`;

export const Wrapper = styled.div`
	position: fixed;
	box-sizing: border-box;
	top: 50%;
	left: 50%;
	padding: 24px;
	transform: translate(-50%, -50%) scale(0);
	border-radius: 8px;
	z-index: 99999;
	background: #fff;
	transition: 200ms ease-in-out;
	min-width: 250px;
	width: 464px;
	max-height: 560px;
	overflow-y: auto;

	&.active {
		transform: translate(-50%, -50%) scale(1);
	}

	@media (max-width: 520px) {
		width: 90%;
	}
`;
export const Header = styled.div<TitleProps>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: ${props => (props.showTitle ? '0' : '20px')};
`;

export const ModalTitle = styled.h3<TitleProps>`
	font-weight: 700;
	font-size: 1.25rem;
	margin-left: ${props => (props.leftTitle ? '0' : 'auto')};
	margin-right: auto;
`;

export const ModalButtonClose = styled.button<ModalButtonCloseProps>`
	min-width: 30px;
	min-height: 30px;
	font-size: 1.125rem;
	border: none;
	cursor: pointer;
	border-radius: 50%;
	color: ${theme.colors.white};
	background-color: ${({customBgColor}) => customBgColor ?? theme.colors['SecondaryBlue.200']};
	box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalButtonShared = styled.button`
	width: 1.875rem;
	height: 1.875rem;
	font-size: 1.125rem;
	border: none;
	cursor: pointer;
	border-radius: 100%;
	color: ${theme.colors.white};
	background: ${theme.colors['SecondaryBlue.200']};

	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 390px) {
		width: 1.625rem;
		font-size: 1rem;
		height: 1.563rem;
		margin-left: 0.625rem;
	}

	@media (min-width: 391px) and (max-width: 640px) {
		font-size: 1rem;
	}
`;

export const Body = styled.div<ModalProps>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: ${props => (props.variant === 'other' ? 'none' : '70%')};
	margin-left: ${props => (props.variant === 'other' ? 'none' : 'auto')};
	margin-right: ${props => (props.variant === 'other' ? 'none' : 'auto')};
`;
