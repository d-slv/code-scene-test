import styled from 'styled-components';
import {Button} from 'presentation/components/button/button';
import theme from 'presentation/styles/theme.styles';

export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;

	@media (max-width: 700px) {
		align-items: center;
		flex-direction: column;
	}
`;

export const FooterCard = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;

	margin-top: 2.375rem;
	padding: 3rem 0 1.25rem;

	border-top: 1px solid #bebebe;

	@media (max-width: 640px) {
		text-align: center;
		flex-direction: column;
		padding: 1.438rem 0 0 0;

		button {
			margin-left: auto;
			margin-right: auto;
		}
	}
`;

export const ContainerInfo = styled.div`
	@media (max-width: 640px) {
		padding-bottom: 1.125rem;
	}

	@media screen and (min-width: 641px) and (max-width: 964px) {
		padding-right: 3.125rem;
	}
`;

export const ContentInfoTitle = styled.h4`
	font: 700 1.125rem/1.438rem 'Source Sans Pro';

	@media (max-width: 640px) {
		font: 1rem/1.25rem 'Source Sans Pro';
	}
`;

export const ContentInfo = styled.p`
	color: ${theme.colors['gray.4']};
	font: 0.875rem/1.25rem 'Source Sans Pro';

	span {
		color: ${theme.colors['primaryBlue.500']};

		@media screen and (min-width: 641px) and (max-width: 964px) {
			display: flex;
			flex-direction: column;
		}
	}

	@media (max-width: 640px) {
		font: 0.75rem/0.938rem 'Source Sans Pro';
	}
`;

export const NextButton = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		svg {
			display: none;
		}
	}
`;

export const HeaderContainer = styled.div`
	display: flex;

	@media (max-width: 1024px) {
		flex-direction: column;
		justify-content: center;
	}
`;

export const CardStepPageTile = styled.h3`
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 1.875rem;
	margin-bottom: 0.5rem;
	display: flex;

	@media (max-width: 820px) {
		margin-bottom: 0;
	}
`;

export const CardStepPageSubtitle = styled.h3`
	font-size: 1.5rem;
	font-weight: 400;
	padding-left: 5px;

	@media (max-width: 820px) {
		font-size: 1.375rem;
		padding-left: 0;
	}
`;

export const ContentConteiner = styled.div`
	display: flex;
`;
