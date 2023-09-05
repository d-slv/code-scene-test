import styled, {css} from 'styled-components';

import theme from 'presentation/styles/theme.styles';
import {TextField} from 'presentation/components/text-field';
import {ClipboardPulseIcon} from 'presentation/components/icons';
import {Card} from 'presentation/components/card';

interface SpecialtyLettersProps {
	isSelected: boolean;
}

interface StyledTextProps {
	weight?: number;
	size?: number;
	center?: boolean;
}

export const SpecialtyLetters = styled.div<SpecialtyLettersProps>`
	width: 50px;
	min-width: 50px;
	height: 50px;
	min-height: 50px;
	font-size: 1.25rem;
	font-weight: 700;
	border-radius: 50%;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;
	padding: 4px 8px;

	${({isSelected}) =>
		isSelected &&
		css`
			background-color: ${theme.colors.primary};
			color: ${theme.colors.white};
		`}

	@media (max-width: 640px) {
		width: 28px;
		min-width: 28px;
		height: 28px;
		min-height: 28px;
		font-size: 1rem;
	}
`;

export const Scroll = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
	justify-content: space-between;
	overflow-x: auto;

	::-webkit-scrollbar {
		width: 0;
	}

	@media (max-width: 640px) {
		margin-bottom: 16px;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;

	@media (max-width: 1024px) {
		flex-direction: column;
		justify-content: center;
	}
`;

export const HeaderWrapper = styled.div``;

export const CardStepPageTitle = styled.h4`
	font-weight: 700;
	font-size: 1.5rem;
	margin-bottom: 0.5rem;

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const CardStepPageDescription = styled.p`
	font-weight: 400;
	font-size: 0.875rem;
	margin-bottom: 30px;
	color: ${theme.colors['gray.4']};

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const InputCode = styled(TextField)`
	width: 50%;
	text-align: center;
	color: ${theme.colors.primary};
	border: 1px solid ${theme.colors['SecondaryBlue.200']};

	::placeholder {
		color: ${theme.colors['SecondaryBlue.200']};
	}
`;

export const ModalText = styled.p`
	font-weight: 400;
	font-size: 1rem;
	line-height: 26px;
	text-align: center;
`;

export const AuthorizationModalFooter = styled.div`
	display: flex;
	text-align: center;
	flex-direction: column;
`;

export const PasswordHelpText = styled.p`
	font-size: 1rem;
	font-weight: 600;
	line-height: 1.438rem;
	padding: 1.688rem 0 1.563rem 0;
	text-decoration-line: underline;

	@media (max-width: 640px) {
		font-size: 0.875rem;
		line-height: 1.125rem;
	}
`;

export const FormModal = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

export const ContainerButton = styled.div`
	display: flex;
	justify-content: center;
`;

export const Exam = styled(ClipboardPulseIcon).attrs({
	width: 18,
	height: 20,
	color: '#ffffff',
})``;

export const ContentModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
`;

export const StyledText = styled.p<StyledTextProps>`
	font-size: ${({size}) => size ?? 1}rem;
	font-weight: ${({weight}) => weight ?? 400};
	color: ${({color}) => color ?? theme.colors.primary};

	${({center}) =>
		center &&
		css`
			text-align: center;
		`}
`;

export const BoldText = styled.span<StyledTextProps>`
	font-size: ${({size}) => size ?? 1}rem;
	font-weight: ${({weight}) => weight ?? 700};
	color: ${({color}) => color ?? theme.colors.primary};

	${({center}) =>
		center &&
		css`
			text-align: center;
		`}
`;

export const CardWrapper = styled(Card)`
	padding: 0;
	box-shadow: none;
	border: 1px solid ${props => props.theme.colors.primary};
`;

export const HeaderCard = styled.div`
	display: flex;
	padding: 16px;
	align-items: center;
	justify-content: space-between;
	background: ${theme.colors.primary};
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`;

export const CircleHeaderIcon = styled.div`
	width: 42px;
	height: 42px;
	display: flex;
	border-radius: 50%;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	border: 2px solid ${theme.colors.white};
`;

export const BodyCard = styled.div`
	padding: 28px;
	display: flex;
	flex-direction: column;
`;

export const Divider = styled.div`
	border-top: 1px solid ${theme.colors['gray.5']};
	margin-top: 16px;
	margin-bottom: 16px;
	opacity: 0.2;
`;

export const LastScheduledModalFooter = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	align-self: center;
	gap: 12px;
	width: 100%;
`;

export const EmptyCardContainer = styled.div`
	margin-top: 32px;
`;
