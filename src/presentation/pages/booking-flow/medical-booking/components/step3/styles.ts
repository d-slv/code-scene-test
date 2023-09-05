import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';
import {StethoscopeIcon} from 'presentation/components/icons';

interface SpecialtyLettersProps {
	isSelected: boolean;
}

export const SpecialtyLetters = styled.div<SpecialtyLettersProps>`
	width: 3.125rem;
	height: 3.125rem;
	font-size: 1.313rem;
	line-height: 1.563rem;
	font-weight: 700;
	margin-right: auto;
	border-radius: 3.125rem;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	:last-child {
		margin-right: 0;
	}
	${props =>
		props.isSelected &&
		`
		background-color: ${props.theme.colors.primary};
		color: ${props.theme.colors.white};
	`}

	@media (max-width: 640px) {
		width: 1.75rem;
		height: 1.75rem;
		padding: 1.25rem;
		margin-right: 1.438rem;
	}
`;

export const Scroll = styled.div`
	display: flex;
	overflow-x: auto;

	::-webkit-scrollbar {
		width: 0;
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

export const CardStepPageTile = styled.h4`
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 1.875rem;
	margin-bottom: 0.5rem;

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const CardStepPageDescription = styled.p`
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 1.1rem;
	margin-bottom: 1.875rem;
	color: ${theme.colors['gray.4']};

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const FooterCardButtons = styled.div`
	display: flex;
	justify-content: space-between;

	margin-top: 2.375rem;
	padding: 3rem 0 1.25rem;

	border-top: 1px solid #bebebe;

	@media (max-width: 640px) {
		text-align: center;
		flex-direction: column-reverse;
		padding: 1.438rem 0 0 0;

		button {
			margin-left: auto;
			margin-right: auto;

			:nth-of-type(1) {
				margin-top: 1rem;
			}
		}
	}
`;

export const ButtonScheduleHealth = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		svg {
			display: none;
		}
	}
`;

export const ModalTitleScheduled = styled.div`
	font-size: 20px;
	line-height: 33px;
	text-align: center;
	margin: -15% 0 20px 0;
`;

export const Stethoscope = styled(StethoscopeIcon).attrs({
	width: 29,
	height: 29,
})`
	margin: 15px;
	border-radius: 50%;
	border: 2px solid #ffffff;
`;

export const ModalBody = styled.div`
	border-radius: 16px;
	border: 1px solid #0054b8;

	svg path {
		fill: #ffffff;
	}
`;

export const TitleBody = styled.div`
	padding: 20px 0;
	background-color: ${theme.colors.primary};
	border: 1px solid #0054b8;
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
	font-weight: 700;
	font-size: 20px;
	line-height: 33px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	color: ${theme.colors.white};
`;

export const ContentBody = styled.div`
	font-size: 20px;
	line-height: 33px;
	padding: 20px;

	p {
		color: ${theme.colors['gray.3']};
	}

	hr {
		margin-top: 20px;
		margin-bottom: 20px;
	}
`;

export const TitleButtonReplace = styled.b`
	font-size: 20px;
	line-height: 33px;
	padding: 20px 0;
	text-align: center;
`;

export const ModalButtonReplace = styled.div`
	gap: 12px;
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

export const ModalSubtitle = styled.div`
	font-size: 20px;
	line-height: 27px;
	text-align: center;
`;

export const ModalTextRating = styled.div`
	font-weight: 700;
	font-size: 20px;
	line-height: 27px;
	text-align: center;
	color: ${theme.colors['orange.700']};
`;

export const FooterCardRating = styled.div`
	padding-top: 0.688rem;
	padding-bottom: 15px;

	display: flex;
	justify-content: space-between;

	svg {
		cursor: pointer;
		font-size: 2.5rem;
		color: ${theme.colors['yellow.700']};
	}
`;

export const ModalButtonOptions = styled.div`
	display: flex;
	flex-direction: column;

	button {
		margin-top: 15px;
	}

	button:first-of-type {
		margin-top: 0;
	}
`;
