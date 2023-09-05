import styled from 'styled-components';
import {Card} from 'presentation/components/card';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';

export const MainContainer = styled(Card)`
	width: 100%;
	height: 100%;
	background: ${theme.colors.white};
	display: grid;
	grid-template-columns: 0.5fr 2fr 0.5fr;

	@media (max-width: 820px) {
		grid-template-columns: 1fr;
	}
`;

export const HeaderContainer = styled.div`
	text-align: center;
	padding: 1rem 0 36px 0;
	grid-column: 2;

	@media (max-width: 820px) {
		grid-column: 1;
	}
`;

export const TitlePage = styled.h2`
	font-weight: 500;
	font-size: 28px;
	line-height: 33px;
	color: ${theme.colors.black};

	@media (max-width: 820px) {
		font-size: 24px;
	}
`;

export const SubtitlePage = styled.p`
	font-size: 18px;
	line-height: 21px;
	padding-top: 36px;
	color: ${theme.colors.primary};

	@media (max-width: 820px) {
		font-size: 16px;
	}
`;

export const ContentContainer = styled.div`
	display: flex;
	grid-column: 2;
	flex-direction: column;

	div:first-child {
		width: 100%;

		button {
			width: 100%;
		}

		label {
			font-weight: 600;
		}
	}

	div button {
		border-color: #00acd7;
		border-radius: 1rem;
	}

	div ul {
		border-color: #00acd7;
		color: ${theme.colors.black};
	}

	div:nth-of-type(2) {
		padding: 25px 0;
	}

	@media (max-width: 820px) {
		grid-column: 1;
	}
`;

export const ContentSelect = styled.div`
	display: flex;
	flex-direction: column;

	span {
		color: ${props => props.theme.colors.black};
	}

	@media (max-width: 640px) {
		grid-column: 1;
		justify-content: center;

		div:first-of-type {
			padding-bottom: 0.938rem;
		}
	}
`;

export const LabelSelect = styled.label`
	font-size: 1rem;
	line-height: 20px;
	margin-bottom: 0.313rem;
`;

export const InputArea = styled.textarea`
	width: 100%;
	resize: vertical;
	min-height: 30%;
	outline-color: #00acd7;
	border: 1px solid #00acd7;
	border-radius: 6px;
	padding: 20px;
	color: #212429;
	font-size: 17px;
	line-height: 20px;
`;

export const FooterCard = styled.div`
	grid-column: 2;

	display: flex;
	justify-content: space-between;
	padding: 65px 0 55px 0;

	@media (max-width: 640px) {
		gap: 1rem;
		grid-column: 1;
		text-align: center;
		flex-direction: column;
		padding: 2rem 0 1rem 0;
	}
`;

export const OptionsButton = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;
	}
`;

export const ModalContent = styled.div`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;

	svg {
		align-self: center;
	}
`;

export const ModalTitleContent = styled.h3`
	font-size: 21px;
	line-height: 26px;
	padding: 17px 0;
`;

export const ModalSubtitleContent = styled.p`
	font-size: 14px;
	line-height: 18px;
	color: ${theme.colors['gray.4']};
`;

export const ProtocolNumber = styled.p`
	font-size: 16px;
	line-height: 20px;
	padding: 20px 0;
	color: ${theme.colors['gray.4']};
`;

export const ModalButton = styled.div`
	align-self: center;
`;
