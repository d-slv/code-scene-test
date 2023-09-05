import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import {Button} from 'presentation/components/button/button';

export const HeaderContainer = styled.div`
	display: flex;
	text-align: left;
	flex-direction: column;

	@media (max-width: 1024px) {
		justify-content: center;
	}
`;

export const CardStepPageTile = styled.h3`
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

export const ContainerSelect = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 640px) {
		justify-content: center;
	}
`;

export const ContentSelect = styled.div`
	display: flex;
	flex-direction: column;

	div:first-of-type {
		padding-right: 0.625rem;
	}

	@media (max-width: 640px) {
		justify-content: center;

		div:first-of-type {
			padding-right: 0;
			padding-bottom: 0.938rem;
		}
	}
`;

export const LabelSelect = styled.label`
	font-weight: 700;
	font-size: 1rem;
	line-height: 1.125rem;
	margin-bottom: 0.625rem;
`;

export const ContainerToggles = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ContentToggles = styled.div`
	display: flex;
	align-items: center;
	padding-top: 0.5rem;
	gap: 60px;
`;

export const Toggle = styled.div`
	display: flex;
	align-items: center;
`;

export const IncludeToogles = styled.h5`
	font-size: 1rem;
	font-weight: 700;
	line-height: 1.25rem;
	margin-right: 1rem;
`;

export const CardLocation = styled.div`
	display: flex;
	align-items: center;
`;

export const CardLocationContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const CardLocationIconContainer = styled.div`
	margin-right: 1.5rem;
`;

export const CardLocationTitle = styled.h6`
	font-family: 'Roboto';
	font-weight: 700;
	font-style: normal;
	text-transform: uppercase;
	font-size: 1rem;
	margin-bottom: 0.3rem;
	text-align: initial;
`;

export const CardLocationAddress = styled.p`
	font-family: 'Roboto';
	font-style: normal;
	font-weight: 400;
	font-size: 0.8rem;
	color: #707070;
	text-align: initial;
	text-transform: capitalize;
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

export const DoubleButtons = styled.div`
	display: flex;

	@media (max-width: 640px) {
		flex-direction: column;
	}
`;

export const ButtonScheduleOdonto = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		svg {
			display: none;
		}
	}
`;

export const CardContainerRender = styled.div`
	margin-top: 1.875rem;
`;

export const CardHeader = styled.div`
	margin-top: 1.875rem;
`;

export const CardHeaderTitle = styled.div`
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 1.875rem;
	margin-bottom: 0.5rem;

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const CardHeaderDescription = styled.p`
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 1.1rem;
	margin-bottom: 1.875rem;
	color: ${theme.colors['gray.4']};

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const CardContainer = styled.div``;

export const CardSwitchNetwork = styled.div`
	margin-top: 1.875rem;
`;

export const CardOptionsTitleFooter = styled.h3`
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 1.875rem;
	margin-bottom: 0.5rem;

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const CardOptionsDescriptionFooter = styled.p`
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 1.1rem;
	margin-bottom: 1.875rem;
	color: ${theme.colors['gray.4']};

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const ModalTitleAccredited = styled.div`
	font-size: 24px;
	font-weight: 700;
	line-height: 28px;
	margin-bottom: 20px;
`;

export const ModalBody = styled.div``;
export const AddressTitle = styled.div`
	font-weight: 700;
	font-size: 16px;
	line-height: 19px;
	margin-bottom: 0.625rem;
`;

export const TitleButtonReplace = styled.b`
	font-weight: 700;
	font-size: 16px;
	line-height: 19px;
	padding: 20px 0;
`;

export const ModalButtonReplace = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	flex-direction: column;
`;
